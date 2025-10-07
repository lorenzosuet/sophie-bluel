           /* <figure>
				<img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
				<figcaption>Abajour Tahina</figcaption>
			</figure>*/

// URL de ton API (ici un exemple)
const apiUrl = "http://localhost:5678/api/works";

fetchData() ;



// Fonction pour récupérer les données
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayCards(data); // Appelle la fonction pour afficher les cartes
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