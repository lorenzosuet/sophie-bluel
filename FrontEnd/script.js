           /* <figure>
				<img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
				<figcaption>Abajour Tahina</figcaption>
			</figure>*/

// URL de ton API (ici un exemple)
const apiUrlWorks = "http://localhost:5678/api/works";

fetchProjects() ;
           
// URL de ton API (ici un exemple)
const apiUrlCategories = "http://localhost:5678/api/categories";

async function fetchCategories() {
  try {
    const response = await fetch(apiUrlCategories);
    const categories = await response.json();
    console.log(categories); // Appelle la fonction pour afficher les boutons
    displayCategories(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}
// Fonction pour créer les boutons et les injecter dans le HTML
function displayCategories(buttons) {
  const container = document.querySelector(".categories");
  container.innerHTML = ""; // On vide le conteneur avant d'ajouter les boutons

  buttons.forEach(button => {
    const btn = document.createElement("button");
    btn.textContent = button.name; // Assure-toi que l'API renvoie bien un champ 'name'
    container.appendChild(btn);
  });
}

// Appel de la fonction pour récupérer les données
fetchCategories();

// Appel de la fonction avec les données statiques
displayCategories(categories);
// Fonction pour récupérer les données
async function fetchProjects(buttons) {
    try {
        const response = await fetch(apiUrlWorks);
        const projects = await response.json();
        displayCards(projects); // Appelle la fonction pour afficher les cartes
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}


// Appel de la fonction avec les données statiques
displayCategories(categories);

// Fonction pour créer les cartes et les injecter dans le HTML
function displayCards(items) {
    const container = document.querySelector(".gallery");
    container.innerHTML = ""; // On vide le container avant d'ajouter les cartes

    items.forEach(item => {
        const card = document.createElement("figure");
        card.classList.add("card");

        // Image
        const img = document.createElement("img");
        img.src = item.imageUrl; 
        card.appendChild(img);

        // Nom
        const name = document.createElement("figcaption");
        name.textContent = item.title; // Assure-toi que l'API renvoie bien un champ 'name'
        card.appendChild(name);

        container.appendChild(card);
    });
}