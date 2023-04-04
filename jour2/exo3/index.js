require('dotenv').config();

const students = [
    { name: 'ALAN', note: '11', address: 'Paris', mention : null },
    { name: 'ALICE', note: '17', address: 'Paris', mention : null },
    { name: 'SOHPHIE', note: '20', address: 'Paris', mention : null },
    { name: 'SONIA', note: '17', address: 'Toulon', mention : null },
    { name: 'ANTOINE', note: '18', address: 'Aubenas', mention : null },
    { name: 'BERNARD', note: '19', address: 'Paris', mention : null },
    { name: 'ALAN', note: '14', address: 'Aubenas', mention : null },
    { name: 'SONIA', note: '18', address: 'Paris', mention : null },
    { name: 'CLARISSE', note: '17', address: 'Marseille', mention : null }
];

const mention = (note) => {
    note = parseInt(note);
    if(process.env.AB && process.env.B && process.env.TB) {
        switch(true) {
            case note >= 12 && note <= 14:
                return process.env.AB;
            case note <= 14 && note < 16:
                return process.env.B;
            case note >= 16:
                return process.env.TB;
            default:
                return null;
        }
    }
}

const studentsWithMention = students.map(student => {
    student.mention = mention(student.note);
    return student;
});

console.log(studentsWithMention);