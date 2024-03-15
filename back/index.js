const express = require ('express')
const cors = require ('cors')

const {connection} = require('./database/config')


const Productos =require('./routes/Producto')
const Categoria = require('./routes/Categoria')
const Cliente = require('./routes/Cliente')
const detalleVenta = require('./routes/DetalleVenta');
const venta = require('./routes/Venta');
const MetodoPago = require('./routes/MetodoPago')


const app=express()
app.use(express.json())
app.use(cors())


app.use('/',Productos)
app.use('/',Categoria)
app.use('/',Cliente)
app.use('/', detalleVenta);
app.use('/', venta);
app.use('/',MetodoPago)


app.listen(3001)


connection.connect((error)=>{
    if(error) throw error
    console.log('bd conectada')
})


app.get("/", (req,res)=>{
    console.log('servidor activo')
})