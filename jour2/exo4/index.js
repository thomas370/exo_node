const readline = require("readline");

const students = ["Alan", "Sonia", "Sophie"];

function normalizer (str) {
    return str.toLowerCase().replace(/\s/g, "");
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
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