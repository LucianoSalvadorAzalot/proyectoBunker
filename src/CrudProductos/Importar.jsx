
import { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import Productos from '../components/Productos';
import { MDBFile } from 'mdb-react-ui-kit';


const Importar = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError('Por favor selecciona un archivo.');
      return;
    }
    if (!file.name.endsWith('.xlsx')) {
      setError('El archivo seleccionado no es un archivo Excel válido.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Verifica la estructura de los datos
        console.log(data);

        // Procesamiento específico para la plantilla de Excel
        const productsData = [];
        for (let i = 1; i < data.length; i++) { // Empezamos desde la segunda fila para evitar la fila de encabezados
          const product = {
            nombre: data[i][0], // Columna A: Nombre del producto
            descripcion: data[i][1], // Columna B: Descripción
            precio: data[i][2], // Columna C: Precio
            stock: data[i][3], // Columna D: Stock
          };
          productsData.push(product);
        }

        setProducts(productsData);
        setError('');
      } catch (error) {
        setError('Error al procesar el archivo. Por favor, verifica que el archivo esté en el formato correcto.');
        console.error(error); // Muestra el error en la consola para diagnosticar problemas
      }
    };
    reader.readAsBinaryString(file);
  };


  const cargarProductos = () => {
    products.forEach((producto) => {
        axios.post("http://localhost:3001/productos/post", {
        nombre_producto: producto.nombre,
        descripcion_producto: producto.descripcion,
        precio_producto: producto.precio,
        cantidad_producto: 1,
        Id_categoria: 1,
      }).then(response => {
        console.log("Producto cargado exitosamente:", response.data);
      }).catch(error => {
        console.error("Error al cargar producto:", error);
      });
    });
  };

  return (
    <div>
    
      <Productos/>
      <br /><br /><br /><br />
      <div>
        <h4>Importar excel con productos:</h4>
        <MDBFile  type="file" id='customFile' onChange={handleFileUpload} />
      </div>
      
      <br /><br />

      <button onClick={cargarProductos}>Cargar Productos</button>
      
      <br /><br /><br /><br />
      {error && <p>{error}</p>} 
      <ul>
        {products.map((product, index) => (
            <li key={index}>
            <strong>Nombre:</strong> {product.descripcion}, <strong>Precio:</strong>{product.precio}
            </li>
        ))}
        </ul>
    </div>
  );
};

export default Importar;
