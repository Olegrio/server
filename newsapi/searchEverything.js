request = require('request')
transliteration = require('transliteration')
freeKey = require("./variables")
moment = require('moment');
moment.lang('ru');

const searchEverything = (req, res) => {
    const { q, from, to, qInTitle, source, domains, language, sortBy, pageSize, page } = req.body;
    const queryString = [];

    if (from) { queryString.push(`from=${moment(from).format('YYYY-MM-DD')}`) };
    if (to) { queryString.push(`to=${moment(to).format('YYYY-MM-DD')}`) };
    if (q) { queryString.push(`q=${transliteration.slugify(q)}`) };
    if (qInTitle) { queryString.push(`qInTitle=${qInTitle}`) };
    if (source) { queryString.push(`source=${source}`) };
    if (domains) { queryString.push(`domains=${domains}`) };
    if (language) { queryString.push(`language=${language}`) };
    if (sortBy) { queryString.push(`sortBy=${sortBy}`) };
    if (pageSize) { queryString.push(`pageSize=${pageSize}`) };
    if (page) { queryString.push(`page=${page}`)};

    request(`https://newsapi.org/v2/everything?&apiKey=${freeKey}&${queryString.join('&')}`, (err, response, body) => {
        if (err) return res.status(500).send({ message: err })
        return res.send(body);
    });
}
module.exports = searchEverything;