const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM users LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function createNew(newUser) {
    const result = await db.query(
        `INSERT INTO users (username, password_hash)
        VALUES
        (${newUser.username}, ${newUser.passwordHash})`
    );

    let message = 'Error creating new user';

    if (result.affectedRows) {
        message = 'User created successfully';
    }

    return message;
}

module.exports = {
    getAll,
    createNew
}