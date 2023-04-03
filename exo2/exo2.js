// 1

const fs = require("fs");

fs.readFile("Notes.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
}
);

//1.(bis) Pour la suite utilisez l'approche synchrone afin de récupérer les données que vous pourrez exploiter par la suite dans le script.

const data = fs.readFileSync("Notes.txt", "utf8");
console.log(data);


//2
fs.readFile('Notes.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.trim().split('\n');
    const notes = lines.map((line) => line.split(' '));
    const studentNotes = notes.filter((note) => parseInt(note[0]) > 17);
    console.log(studentNotes);
});

//3

fs.readFile('Notes.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let bestScore = 0;
    data.split('\n').forEach(line => {
        const note = parseInt(line.split(' ')[0]);
        if (note > bestScore) {
            bestScore = note;
        }
    });
    console.log(`La meilleure note est: ${bestScore}`);
});

//4

const fileData = fs.readFileSync('Notes.txt', 'utf8');
const students = [];
const lines = fileData.split('\n');
lines.forEach(line => {
    const [notes, name, address] = line.split(' ');
    const student = { notes, name, address };
    students.push(student);
});
console.log(students);

//5

const fileData7 = fs.readFileSync('Notes.txt', 'utf8');
const students7 = [];
const lines7 = fileData7.split('\n');
lines7.forEach(line => {
    const [notes, name, address] = line.split(' ');
    const student7 = { notes, name, address };
    students7.push(student7);
});
students7.sort((a, b) => {
    return a.notes - b.notes;
});
console.log(students7);

//6

/*
Ajoutez dans le fichier students.txt les étudiants suivants :

- 18 Sonia Paris

- 17 Clarisse Marseille*/

const fileData8 = fs.readFileSync('Notes.txt', 'utf8');
const students8 = [];
const lines8 = fileData8.split('\n');
lines8.forEach(line => {
    const [notes, name, address] = line.split(' ');
    const student8 = { notes, name, address };
    students8.push(student8);
}
);
students8.sort((a, b) => {
    return a.notes - b.notes;

});
console.log(students8);

