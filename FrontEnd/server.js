// server.js
const express = require('express');
const app = express();

// TRÈS IMPORTANT : pour lire le JSON du frontend
app.use(express.json());

// Simuler une base de données
const USERS = [
  { email: 'admin@example.com', password: '123456' },
  { email: 'user@test.com', password: 'string' }
];

// Route de login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Tentative de connexion :', { email, password });

  // Vérifier si l'utilisateur existe
  const user = USERS.find(u => u.email === email && u.password === password);

  if (user) {
    console.log('Connexion réussie !');
    res.json({ 
      token: 'fake-jwt-token-' + Date.now(),
      message: 'Connexion réussie'
    });
  } else {
    console.log('Échec : identifiants incorrects');
    res.status(401).json({ 
      message: 'Email ou mot de passe incorrect' 
    });
  }
});

// Démarrer le serveur
const PORT = 5678;
app.listen(PORT, () => {
  console.log(`Serveur de test démarré sur http://localhost:${PORT}`);
  console.log(`Endpoint login : POST http://localhost:${PORT}/api/login`);
});