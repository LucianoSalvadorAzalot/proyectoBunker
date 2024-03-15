const mysql= require ('mysql2')

const connection = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password: 'Lucho123',
        database: 'bunker'
    }
)

module.exports = {connection}