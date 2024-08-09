import conn from '../config/db.js'

//Check existing user by email

const findByEmail = async (email) => {
    const rows = conn.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

//insert a new user

const create = async (name,email,password) => {
   conn.query(' INSERT INTO Users (name, email, password) VALUES (?, ?, ?) ', [name, email, password])
}

export {findByEmail,create}