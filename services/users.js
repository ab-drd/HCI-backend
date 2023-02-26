const crypto = require('crypto');
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM users LIMIT ${offset}, ${config.listPerPage};`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function createNew(newUser) {
    const existing = await db.query(
        `SELECT * FROM users WHERE username = ${newUser.username};`
    );

    const existingUser = helper.emptyOrRows(existing);

    if (existingUser) {
        return {
            success: false,
            message: 'Username already taken!'
        }
    }

    const result = await db.query(
        `INSERT INTO users (username, password_hash)
        VALUES
        (${newUser.username}, ${newUser.passwordHash});`
    );

    let returnValue = {
        success: false,
        message: 'Error creating new user'
    };

    if (result.affectedRows) {
        returnValue.success = true;
        returnValue.message = 'User created successfully! You may now log in.';
    }

    return returnValue;
}

async function logIn(userInfo) {
    const result = await db.query(
        `SELECT * FROM users WHERE username = '${userInfo.username}';`
    );

    const foundUser = helper.emptyOrRows(result);
        
    if (!foundUser.length) {
        return {
            success: false,
            message: 'Incorrect username or password'
        }
    }

    if (foundUser[0].password_hash.trim() == userInfo.passwordHash) {
        return {
            success: true,
            message: 'Successfully logged in!'
        };
    }
    else {
        return {
            success: false,
            message: 'Incorrect username or password'
        };
    }
}

module.exports = {
    getAll,
    createNew,
    logIn
}