const sourcesNews = require("../newsapi/sourcesNews");
const searchTopHeadlines = require("../newsapi/searchTopHeadlines");
const searchEverything = require('../newsapi/searchEverything')
const pool = require('../data/config');


module.exports = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Node.js and Express REST API'
        });
    });

    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    app.put('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('Данные пользователя изменены');
        });
    });

    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(`Пользователь ${id} удален`)
        })
    })

    app.post('/users', (request, response) => {
        pool.query('SELECT * FROM users WHERE email = ?', request.query.email, (error, result) => {
            if (error) { throw error }
            result[0] 
                ? response.send("Пользователь с таким email уже существует")
                : pool.query('INSERT INTO users SET ?', request.query, (error, result) => {
                    if (error) throw error;
                    response.status(201).send(`User added with ID: ${result.insertId}`);
                })
            });
    });
    // newsApi
    app.get('/news/sources', sourcesNews);
    
    app.post('/news/search', searchTopHeadlines);
    
    app.post('/news/search-e', searchEverything);



}

