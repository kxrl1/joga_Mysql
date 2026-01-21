const con = require('../utils/db');

const getAllArtticles = (req, res) => {
    let query = "SELECT * FROM articles";
    let articles = [];
    con.query(query, (err, result) => {
        if(err) throw err;
        articles = result;
        res.render('index',{
            articles: articles
        })
    })
};

const getArticleBySlug = (req, res) => {
    let query = `SELECT *, article.name as article_name, author.name as author_name FROM articles INNER JOIN author ON author_id = author.id WHERE slug='${req.params.slug}'`;
    let article
    con.query(query, (err, result) => {
        if(err) throw err;
        article = result;
        console.log(article)
        res.render('article',{
            article: article
        })
    })
};

module.exports = {
    getAllArtticles,
    getArticleBySlug
};