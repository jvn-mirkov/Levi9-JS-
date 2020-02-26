const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('./controllers/UsersController');
const cors = require('cors');
const port = 2020;
const app = express();

//gde nam je fajl
app.use(express.static('front'));

//u slucaju greske pri radu da ne poplavi server
app.use(express.json({limit: '3mb'}));

app.use(cors({ origin: '*' }));
UsersController.registerRoutes(app);
app.listen(port, () => console.log('listening at port 2020'));

//???
app.post('/', (request, response) => {
    console.log('I got a request.');
    console.log(request.body);
    response.end();
});



