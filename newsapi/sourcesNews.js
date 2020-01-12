request = require('request')
const freeKey = require("./variables")
// interface SourceResponse {
//     id: string,
//     name: string,
//     description: string,
//     url: string,
//     category: string,
//     language: string,
//     country: string
// }

const sourcesNews = (req, res) => {
    request(`https://newsapi.org/v2/sources?apiKey=${freeKey}`, (err, response, body) => {
        if (err) return res.status(500).send({ message: err });
        return res.send(body);
    })
}

module.exports = sourcesNews;