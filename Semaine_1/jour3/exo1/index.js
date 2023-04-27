const http = require("http");
const hostname = "localhost";
const port = "8000";
const { users, shuffle } = require('./utils');

const server = http.createServer((req, res) => {

    const url = req.url.replace('/','');

    if (url === '') {
        // Utiliser forEach() pour parcourir le tableau et générer des éléments <li>
        const userListItems = users.map(user => `<li>${user}</li>`).join('')
        // Envoyer la réponse HTML avec la liste des utilisateurs
        res.end(`<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Liste des utilisateurs</title>
                </head>
                <body>
                    <section>
                        <article>
                            <ul>
                                ${userListItems}
                            </ul>
                        </article>
                    </section>
                </body>
            </html>`
        );

    }

    if (url === 'shuffle') {
        // Mélanger le tableau des utilisateurs
        shuffle(users);
        // Utiliser forEach() pour parcourir le tableau et générer des éléments <li>
        const userListItems = users.map(user => `<li>${user}</li>`).join('')
        // Envoyer la réponse HTML avec la liste mélangée des utilisateurs
        res.end(`<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Liste des utilisateurs (mélangée)</title>
                </head>
                <body>
                    <section> 
                        <article>
                            <h1>Liste des utilisateurs (mélangée)</h1>
                            <ul>
                                ${userListItems}
                            </ul>
                        </article>
                    </section>
                </body>
            </html>`
        );

    }


});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
