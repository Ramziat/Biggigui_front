import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des données
    if (!body.name || !body.email || !body.password || !body.phone) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { message: 'Email invalide' },
        { status: 400 }
      );
    }

    // Validation de la longueur du mot de passe
    if (body.password.length < 6) {
      return NextResponse.json(
        { message: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    // TODO: Appeler votre backend externe pour enregistrer l'utilisateur
    // Exemple avec une API backend externe:
    // const backendResponse = await fetch('http://your-backend-url/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body),
    // });
    
    // if (!backendResponse.ok) {
    //   const error = await backendResponse.json();
    //   return NextResponse.json(error, { status: backendResponse.status });
    // }

    // Pour l'instant, retourner un succès
    return NextResponse.json(
      { 
        message: 'Inscription réussie',
        user: {
          name: body.name,
          email: body.email,
          userType: body.userType,
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}
