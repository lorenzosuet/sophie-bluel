           /* <figure>
				<img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
				<figcaption>Abajour Tahina</figcaption>
			</figure>*/

// URL de ton API (ici un exemple)
const apiUrlWorks = "http://localhost:5678/api/works";
const apiUrlCategories = "http://localhost:5678/api/categories";

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
      setupConnectionParameters(); // Afficher les paramètres après une connexion réussie
    } else {
      alert('Échec de la connexion : ' + data.message);
    }
  } catch (error) {
    console.error('Erreur de connexion :', error);
    alert('Une erreur s\'est produite lors de la connexion');
  }
}

async function fetchCategories() {
  try {
    const response = await fetch(apiUrlCategories);
    const categories = await response.json();
    console.log(categories);
    displayCategories(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

// Fonction pour créer les boutons et les injecter dans le HTML
function displayCategories(categories) {
  const container = document.querySelector(".categories");
  container.innerHTML = ""; // On vide le conteneur avant d'ajouter les boutons

  // Ajout de l'option "Tous" en premier
  const allBtn = document.createElement("button");
  allBtn.classList.add("category-item");
  allBtn.textContent = "Tous";
  allBtn.dataset.category = "all"; // Ajouter un attribut pour identifier "Tous"
  container.appendChild(allBtn);

  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.dataset.category = category.id; // Assumer que l'API renvoie un ID pour chaque catégorie
    container.appendChild(btn);
  });

  // Ajouter les écouteurs d'événements après la création des boutons
  container.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      filterProjects(button.dataset.category);
    }
  });
}

// Fonction pour récupérer et filtrer les projets
async function filterProjects(categoryId) {
  try {
    const response = await fetch(apiUrlWorks);
    const projects = await response.json();
    let filteredProjects = projects;

    if (categoryId !== "all") {
      filteredProjects = projects.filter(project => project.categoryId == categoryId);
    }

    displayCards(filteredProjects);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

// Fonction pour créer les cartes et les injecter dans le HTML
function displayCards(items) {
  const container = document.querySelector(".gallery");
  container.innerHTML = ""; // On vide le container avant d'ajouter les cartes

  items.forEach(item => {
    const card = document.createElement("figure");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = item.imageUrl;
    card.appendChild(img);

    const name = document.createElement("figcaption");
    name.textContent = item.title;
    card.appendChild(name);

    container.appendChild(card);
  });
}

// Initialisation
fetchCategories();
filterProjects("all"); // Charger tous les projets au démarrage
