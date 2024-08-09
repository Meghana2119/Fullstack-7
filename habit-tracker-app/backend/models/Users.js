import conn from '../config/db.js'

//Check existing user by email

const findUserByEmail = async (email) => {
    const rows = conn.query('SELECT * FROM users WHERE email = ?', [email], (err, rows, fields) => {

        return rows[0]
    }
    )
}
//insert a new user

const createNewUser = async (name, email, password) => {
    conn.query(' INSERT INTO Users (name, email, password) VALUES (?, ?, ?) ', [name, email, password])
}

export { findUserByEmail, createNewUser }