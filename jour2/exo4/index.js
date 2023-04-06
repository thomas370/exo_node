const readline = require("readline");

const students = ["Alan", "Sonia", "Sophie"];

function normalizer (str) { // On normalise la chaîne de caractères
    return str.toLowerCase().replace(/\s/g, ""); // On enlève les espaces
}

const rl = readline.createInterface({
    input: process.stdin, // process.stdin est un flux en lecture
    output: process.stdout // process.stdout est un flux en écriture
});

rl.question("Entrez le nom d'un étudiant : ", (userInput) => {
    for (let i = 0; i < students.length; i++) {
        const normalizedStudentName = normalizer(students[i]);
        const normalizedUserInput = normalizer(userInput);
        if (normalizedStudentName === normalizedUserInput) {
            console.log(`L'étudiant ${students[i]} a été trouvé dans la liste.`);
            rl.close();
            break;
        }
        else if (i === students.length - 1) {
            console.log("L'étudiant n'a pas été trouvé dans la liste.");
            rl.close();
        }
    }
});