import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des données
    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // TODO: Appeler votre backend externe pour authentifier l'utilisateur
    // Exemple avec une API backend externe:
    // const backendResponse = await fetch('http://your-backend-url/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body),
    // });
    
    // if (!backendResponse.ok) {
    //   const error = await backendResponse.json();
    //   return NextResponse.json(error, { status: backendResponse.status });
    // }

    // const data = await backendResponse.json();
    // Ici vous pourriez sauvegarder le token en session/cookie

    // Pour l'instant, retourner un succès
    return NextResponse.json(
      { 
        message: 'Connexion réussie',
        user: {
          email: body.email,
          userType: 'buyer', // À adapter selon votre backend
        },
        token: 'fake-jwt-token', // À remplacer par le vrai token du backend
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
