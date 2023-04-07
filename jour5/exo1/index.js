const menuItems = [
    { path: '/', title: 'Home', isActive: true },
    { path: '/about-me', title: 'About', isActive: false },
    { path: '/references', title: 'References', isActive: false },
    { path: '/contact-me', title: 'Contact', isActive: false },
];


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Accueil',
        menuItems: menuItems,
    });
});

app.get('/about-me', (req, res) => {
    res.render('about-me', {
        title: 'À propos de moi',
        menuItems: menuItems,
    });
});

app.get('/references', (req, res) => {
    res.render('references', {
        title: 'Références',
        menuItems: menuItems,
    });
});

app.get('/contact-me', (req, res) => {
    res.render('contact-me', {
        title: 'Contactez-moi',
        menuItems: menuItems,
    });
});

