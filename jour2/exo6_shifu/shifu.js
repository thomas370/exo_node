require('dotenv').config();

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const CHOIX = ["pierre", "feuille", "ciseaux"];

// Fonction pour choisir un choix au hasard
function choixAleatoire() {
    return CHOIX[Math.floor(Math.random() * CHOIX.length)];
}

// Initialisation des scores des joueurs
let scoreJoueur1 = 0;
let scoreJoueur2 = 0;

// Fonction pour jouer un tour
function jouerTour() {
    // Demander au joueur 1 de faire un choix
    readline.question("Joueur 1, choisissez pierre, feuille ou ciseaux : ", (choixJoueur1) => {
        choixJoueur1 = choixJoueur1.toLowerCase();
        // Vérifier si le choix est valide
        if (!CHOIX.includes(choixJoueur1)) {
            console.log("Choix invalide !");
            jouerTour();
            return;
        }
        // Générer le choix du joueur 2
        const choixJoueur2 = choixAleatoire();
        console.log(`Joueur 2 choisit ${choixJoueur2}.`);
        // Déterminer le résultat du tour
        if (choixJoueur1 === choixJoueur2) {
            console.log("Égalité !");
        } else if ((choixJoueur1 === "pierre" && choixJoueur2 === "ciseaux") ||
            (choixJoueur1 === "feuille" && choixJoueur2 === "pierre") ||
            (choixJoueur1 === "ciseaux" && choixJoueur2 === "feuille")) {
            console.log("Joueur 1 gagne !");
            scoreJoueur1++;
        } else {
            console.log("Joueur 2 gagne !");
            scoreJoueur2++;
        }
        // Afficher le score actuel
        console.log(`Score : Joueur 1 /${scoreJoueur1} - ${scoreJoueur2} Joueur 2`);
        // Vérifier si la partie est terminée
        if (scoreJoueur1 === 3) {
            console.log("Joueur 1 gagne la partie !");
            readline.close();
        } else if (scoreJoueur2 === 3) {
            console.log("Joueur 2 gagne la partie !");
            readline.close();
        } else {
            jouerTour();
        }
    });
}

module.exports = { jouerTour };