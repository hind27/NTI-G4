  
const express = require('express')
require('./dbConnection/mongoose')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/products')
const users = require('./models/user')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(userRoutes)
app.use(productRoutes)

/* GET home page. */
// app.get('/', (req, res, next) => {
//     users.find((err, users) => {
//       //console.log(personas);
//       if (err) throw err;
//       res.render('index', { users: users });
//     });
//   });
port = process.env.PORT || 3000

app.listen(port)

