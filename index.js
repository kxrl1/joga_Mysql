const express = require('express');
const app = express();

const path = require('path');

const hbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/' }));

app.use(express.static('public'));

const mysql = require('mysql2');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));



const articleRoutes = require('./routes/article');

app.use('/', articleRoutes);
app.use('/article', articleRoutes);

con.connect((err) => {
    if(err) throw err;
    console.log("Connected to MySQL database!");
})

app.get('/author/:author_id', (req, res) => {
    let query = `SELECT *, article.name as article_name, author.name as author_name FROM articles INNER JOIN author ON author_id = author.id WHERE author_id='${req.params.author_id}'`;
    let article
    con.query(query, (err, result) => {
        if(err) throw err;
        article = result;
        console.log(article)
        query = `SELECT * FROM author WHERE id='${req.params.author_id}'`;
        let author
        con.query(query, (err, result) => {
            if(err) throw err;
            author = result
            console.log(author)
            res.render('author',{
                author: author,
                article: article,
            })
        })
    })
});

app.listen(3003, () => {
    console.log("Server is running on port http://localhost:3003");
});