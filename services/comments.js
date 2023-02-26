const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function insertComment(info) {
    const existing = await db.query(
        `SELECT id FROM users WHERE username = ${info.username};`
    );

    const existingUser = helper.emptyOrRows(existing);

    let returnValue = {
        success: false,
        message: 'Error creating new comment'
    };

    if (existingUser) {
        const result = await db.query(
            `INSERT INTO comment (slug, content, user_id) VALUES (${info.slug}, ${info.content}, ${existingUser[0].id});`
        );

        if (result.affectedRows) {
            returnValue.success = true;
            returnValue.message = 'Comment successfully created';
        }
    }

    return returnValue;
}

async function loadComments(slug) {
    const rows = await db.query(
        `SELECT u.username, c.content FROM comment AS c 
        JOIN users AS u ON c.user_id = u.id 
        WHERE c.slug = '${slug}';`
    );

    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

module.exports = {
    insertComment,
    loadComments
}