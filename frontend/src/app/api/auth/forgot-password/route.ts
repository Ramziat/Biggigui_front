import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email) {
      return NextResponse.json(
        { message: 'Email requis' },
        { status: 400 }
      );
    }

    // TODO: Backend doit:
    // 1. Vérifier si l'email existe dans la base de données
    // 2. Si oui: générer un token de réinitialisation (JWT avec expiration 1h)
    // 3. Envoyer un email avec le lien: https://votre-frontend.com/reset-password?token=...
    // 4. Retourner un succès
    // 5. Si non: retourner une erreur 404 ou un message générique pour la sécurité

    // Exemple de réponse backend:
    // const backendResponse = await fetch('http://your-backend-url/api/auth/forgot-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: body.email }),
    // });

    return NextResponse.json(
      { 
        message: 'Lien de réinitialisation envoyé',
        email: body.email,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'Erreur lors de l\'envoi du lien' },
      { status: 500 }
    );
  }
}
