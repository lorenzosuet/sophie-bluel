// URL de l'API de connexion
const apiUrllogin = "http://localhost:5678/api/users/login";

// Fonction de connexion
async function handleLogin(event) {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

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
      localStorage.setItem('token', data.token);
      showLoginSuccess();
      setupConnectionParameters();
    } else {
      alert('Échec de la connexion : ' + data.message);
    }
  } catch (error) {
    console.error('Erreur de connexion :', error);
    alert('Une erreur s\'est produite lors de la connexion');
  }
}

// Afficher la réussite de la connexion et la section des paramètres
function showLoginSuccess() {
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('.connection-params').style.display = 'block';
}

// Configurer les paramètres de connexion
function setupConnectionParameters() {
  const token = localStorage.getItem('token');
  if (token) {
    document.getElementById('api-url').value = 'http://localhost:5678/api/works';
    document.getElementById('timeout').value = '30'; // Délai par défaut en secondes
  }
}

// Initialisation de l'écouteur d'événement pour le formulaire de connexion
document.querySelector('.login-form').addEventListener('submit', handleLogin);