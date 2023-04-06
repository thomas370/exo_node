1. Installez le nouveau projet discovery_env. Pensez à utiliser une commande du cours.

2. Installez maintenant la dépendance dotenv dans votre projet.

3. Utilisez la documentation https://www.npmjs.com/package/dotenv et définissez la variable de production/developpement suivant :

if(procecc.env.APP_EN){
console.log("Je suis en production");
}else{
console.log("Je suis en développement");
}


*Remarque si vous changez de dossier pour définir vos variables d'environnement utilisez la syntaxe suivante pour indiquer à dotenv où se trouve vos données 😗

require('dotenv').config({ path: '/custom/path/to/.env' })