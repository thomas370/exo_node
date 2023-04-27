const pug = require('pug');
const path = require('path');

const templatePath = path.join(__dirname, 'template.pug');

const user = { isAdmin: true };

const html = pug.renderFile(templatePath, { user });
console.log(html);