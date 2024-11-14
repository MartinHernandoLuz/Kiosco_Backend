import {getAllProductosDB,getProductoByIdDB,createProductoDB, updateProductoDB} from '../model/productoModel.js'
import { errorsUpdate } from '../others/errorsUpdateProducto.js';

// obtener todos los productos
export async function getAllProductos(req,res){
    // Obtener todos los productos de la base de datos
    try {
        const result = await getAllProductosDB();
        res.status(200).json(result);
    } catch (error) {
        // 503: service unavailable, servicio caído temporalmente
        const message = error.message == "Error al obtener los productos" ? 503 : 500
        res.status(message).json(error.message);
    }
}

// obtener un producto por id
export async function getProductoById(req,res){
    // Obtener todos los productos de la base de datos
    try {
        const id = req.params.id
        const result = await getProductoByIdDB(id);
        res.status(200).json(result);
    } catch (error) {
        // 404 not found
        const message = error.message == "Producto no encontrado" ? 404 : 500
        res.status(message).json(error.message);
    }
}

// crear un producto
export async function createProducto(req,res){
    // crearProducto
    try {
        const data = req.body
        const result = await createProductoDB(data);
        res.status(201).json(result);
    } catch (error) {
        // 409: hay conflicto con la foreign key
        const message = error.message == "La categoría no existe" ? 409 : 500
        res.status(message).json(error.message);
    }
}

// actualizar un producto (lean línea a línea y entren en las funciones o no entenderán nada)
export async function updateProducto(req,res){
    try {
        // Leer `id_producto` desde los query params ej: actualizar?id_producto=1
        const { id_producto } = req.query; 
        // Leer el resto de los campos desde el body
        const data = req.body;
        // llamo al Model para manejar la DB apartir de aquí 
        const result = await updateProductoDB(id_producto,data);
        res.status(201).json(result);
    } catch(error){
        const errorMsg = error.message;
        // hay demaciados errores posibles, así que lo envié a la carpeta others
        // envio res para que pueda disparar la función allí
        errorsUpdate(errorMsg,res);
    }
}