const pug = require('pug');
const path = require('path');

const templatePath = path.join(__dirname, 'template.pug');
const compiledTemplate = pug.compileFile(templatePath);

const user = { isAdmin: true };

const html = compiledTemplate({ user });
console.log(html);