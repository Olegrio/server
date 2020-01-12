request = require('request')
transliteration = require('transliteration')
freeKey = require("./variables")

const searchTopHeadlines = (req, res) => {
    const { country, category, q } = req.body;
    request(`https://newsapi.org/v2/top-headlines?q=${transliteration.slugify(q)}&country=${country}&category=${category}&apiKey=${freeKey}&pageSize=100`, (err, response, body) => {
        if (err) return res.status(500).send({ message: err })
        return res.send(body);
    });
}
module.exports = searchTopHeadlines;