require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3030;
const students = require('./data/data.js');
app.use(cors());
app.use(express.json());
app.get('/users', (req, res) => {
    res.json(students);
});

app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    const index = students.findIndex(student => student.id === id); // Trouver l'index de l'étudiant avec l'ID donné
    if (index !== -1) { // Si l'étudiant existe dans le tableau
        students.splice(index, 1); // Supprimer l'étudiant à l'index trouvé
        res.json("Etudiant supprimé");
    } else {
        res.status(404).json("Etudiant non trouvé");
    }
});

app.post('/user', (req, res) => {
    const { name, date } = req.body;
    const id = students.length + 1;
    const newStudent = { id, name, date };
    students.push(newStudent);
    res.json("Etudiant ajouté");
});

app.listen(port, () => {
    console.log(`App running on port :${port}`);
});