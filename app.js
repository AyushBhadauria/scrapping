const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const routes = require('./routes');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', routes.getHomeData);
app.post('/', routes.createPDF);
app.get('/getPDF', routes.getDatafromPDF);

app.listen(port, () => console.log(`Scrapping app listening at http://localhost:${port}`));
