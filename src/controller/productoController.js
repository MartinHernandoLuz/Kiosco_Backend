import {getAllProductosDB,getProductoByIdDB} from '../model/productoModel.js'


export async function getAllProductos(req,res){
    // Obtener todos los productos de la base de datos
    try {
        const result = await getAllProductosDB();
        res.status(200).json(result);
    } catch (error) {
        const message = error.message == "Error al obtener los productos" ? 503 : 500
        res.status(message).json(error.message);
    }
}

export async function getProductoById(req,res){
    // Obtener todos los productos de la base de datos
    try {
        const id = req.params.id
        const result = await getProductoByIdDB(id);
        res.status(200).json(result);
    } catch (error) {
        const message = error.message == "Producto no encontrado" ? 404 : 500
        res.status(message).json(error.message);
    }
}