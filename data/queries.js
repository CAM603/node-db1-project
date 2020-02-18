const knex = require('knex');

module.exports = {
    getAll(query) {
        const knexQuery = knex('accounts');

        return knexQuery;
    }
}