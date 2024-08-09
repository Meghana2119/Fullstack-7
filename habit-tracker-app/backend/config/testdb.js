require('dotenv').config({ path: '../.env' })

const mysql = require('mysql2')

// create a connection

const connection = mysql.createConnection({
    host:process.env.DB_HOST, 
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})
connection.connect()
connection.query('SELECT * FROM Users', (err, rows, fields) => {
    if (err) throw err
  
    console.log('The solution is: ', fields)
  })
  const result = connection.execute("SELECT * FROM Users")
  console.log(result[0])
  connection.end()