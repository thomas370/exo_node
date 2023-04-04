const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const nombreSecret = Math.floor(Math.random() * 100) + 1;
let tentative = 10;

console.log("Bienvenue dans le jeu de devinette de nombres !\n");
console.log("Vous devez trouver un nombre compris entre 1 et 100. Vous avez 10 tentatives.\n");

rl.on('line', (input) => {
    const nombrePropose = parseInt(input);

    if (isNaN(nombrePropose)) {
        console.log("Veuillez entrer un nombre valide.");
    } else if (nombrePropose < 1 || nombrePropose > 100) {
        console.log("Le nombre doit être compris entre 1 et 100.");
    } else {
        tentative--;

        if (nombrePropose === nombreSecret) {
            console.log(`Bravo, vous avez trouvé le nombre secret en ${10 - tentative} tentatives !`);
            rl.close();
        } else if (tentative === 0) {
            console.log(`Désolé, vous avez épuisé toutes vos tentatives. Le nombre secret était ${nombreSecret}.`);
            rl.close();
        } else if (nombrePropose < nombreSecret) {
            console.log("Le nombre proposé est trop petit. Essayez encore.");
        } else if (nombrePropose > nombreSecret) {
            console.log("Le nombre proposé est trop grand. Essayez encore.");
        }
    }
});