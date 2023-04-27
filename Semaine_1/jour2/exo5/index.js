const fs = require("fs");
const readline = require("readline");
const json = JSON.parse(fs.readFileSync("./students.json"));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.setPrompt("Entrez le nom d'un étudiant (ou 'exit' pour quitter) : ");
rl.prompt();

rl.on("line", (line) => {
    if (line.toLowerCase() === "exit") {
        rl.close();
    } else {
        const student = json.students.find((s) => s.name.toLowerCase() === line.toLowerCase());
        if (student) {
            const average = student.notes.reduce((acc, n) => acc + n) / student.notes.length;
            console.log(`La moyenne de ${student.name} est de ${average.toFixed(2)}.`);
        } else {
            console.log(`Aucun étudiant ne correspond au nom "${line}".`);
        }
        rl.prompt();
    }
}).on("close", () => {
    console.log("Au revoir !");
    process.exit(0);
});