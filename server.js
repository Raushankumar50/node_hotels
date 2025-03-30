const express = require('express');
const app = express();
const db = require('./db');


const passport = require('./auth');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// Middleware Function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); // Move on to the next phase
}

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/', (req, res)=> {
  res.send("Welcome to our Hotel");
})

// app.get('/dal', (req, res)=> {
//   res.send("Dal are here");
// })

// app.get('/hello', (req, res) => {
//   res.send("Say Hello");
// })

// app.get('/bhojan', (req,res)=> {
//   let khana = {
//     bhat: "bhat",
//     dal: "dal",
//     chokha: "chokha",
//     chatney: "chatney"
//   }
//   res.send(khana);
// })





// Import the router file


const personRouters = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person', localAuthMiddleware, personRouters);
app.use('/menu',menuItemRoutes);






app.listen(3000, ()=> {
  console.log('Listening on port 3000');
});


// {
//   "name": "Alice",
//   "age": 28,
//   "work": "chef",
//   "mobile": "1234567890",
//   "email": "alice@example.com",
//   "address": "123 Main St, City",
//   "salary": 600000
// }