const express = require ('express')
const cors = require ('cors')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Sequelize } = require('sequelize');
const {connection} = require('./database/config')
const bodyParser = require('body-parser');



const app = express();
const port = 3000;


app.use(express.json())
app.use(cors())
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));
const sequelize = new Sequelize('bunker', 'root', 'Lucho123', {
    host: 'localhost',
    dialect: 'mysql'
});

const store = new SequelizeStore({
    db: sequelize
});

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: store
}));

const Productos =require('./routes/Producto')
const Categoria = require('./routes/Categoria')
const Cliente = require('./routes/Cliente')
const detalleVenta = require('./routes/DetalleVenta');
const venta = require('./routes/Venta');
const MetodoPago = require('./routes/MetodoPago')
const Login = require('./routes/Login')
const Proveedor = require('./routes/Proveedores')
const Compra = require('./routes/Compra')
const Sucursales = require('./routes/Sucursales')
const Usuarios = require('./routes/Usuarios')
const Stock = require('./routes/Stock')
const Creditos = require('./routes/Credito')
const plataEnCaja = require('./routes/plataEnCaja')
const PlataLogin = require('./routes/PlataLogin')
const Movimientos = require('./routes/Movimientos')
const Caja = require('./routes/Caja')




app.use('/',Productos)
app.use('/',Categoria)
app.use('/',Cliente)
app.use('/', detalleVenta);
app.use('/', venta);
app.use('/',MetodoPago)
app.use('/',Login)
app.use('/',Proveedor)
app.use('/',Compra)
app.use('/',Sucursales)
app.use('/',Usuarios)
app.use ('/', Stock)
app.use('/', Creditos)
app.use('/', plataEnCaja)
app.use('/', PlataLogin)
app.use('/', Movimientos)
app.use('/',Caja)




app.listen(3001)

connection.connect((error) => {
    if (error) throw error;
    console.log('bd conectada');
});

store.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
});

app.get("/", (req,res)=>{
    console.log('servidor activo')
})