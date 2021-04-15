const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db
let dbConnectionStr = process.env.DB_STRING
let dbName = 'theblog'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})
.catch(error => console.log('There is an error with Mongo Client.'))

app.set('view engine', 'ejs')


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, response) => {
    const blogItem = await db.collection('jimmyblog').find().toArray()
    response.render('index.ejs', {blogs: blogItem})
})

app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Server is running on port ${PORT}.`)
})