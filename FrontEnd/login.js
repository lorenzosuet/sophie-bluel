// URL de l'API de connexion
const apiUrllogin = "http://localhost:5678/api/users/login";

// Fonction de connexion
async function handleLogin(event) {
  event.preventDefault(); // Un seul appel suffit

  // Récupération des valeurs (une seule fois)
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Validation basique
  if (!email || !password) {
    alert('Veuillez remplir l\'email et le mot de passe.');
    return;
  }

  try {
    const response = await fetch(apiUrllogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Connexion réussie
      localStorage.setItem('token', data.token);
      showLoginSuccess();
      setupConnectionParameters();
    } else {
      // Erreur renvoyée par le serveur
      alert('Échec de la connexion : ' + (data.message || 'Identifiants incorrects'));
    }
  } catch (error) {
    console.error('Erreur de connexion :', error);
    alert('Une erreur réseau est survenue. Vérifie que le serveur est lancé.');
  }
}

// Afficher la section des paramètres après connexion
function showLoginSuccess() {
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('.connection-params').style.display = 'block';
}

// Pré-remplir les paramètres par défaut
function setupConnectionParameters() {
  const token = localStorage.getItem('token');
  if (token) {
    document.getElementById('api-url').value = 'http://localhost:5678/api/works';
    document.getElementById('timeout').value = '30';
  }
}

// === IMPORTANT : Lier le formulaire à la fonction ===
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
});