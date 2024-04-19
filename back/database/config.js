const mysql= require ('mysql2')

const connection = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password: 'Lola2201',
        database: 'bunker3',
    }
)

module.exports = {connection}