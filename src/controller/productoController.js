import { getAllProductosDB, getProductoByIdDB, createProductoDB, updateProductoDB, deleteProductoByIdDB } from '../model/productoModel.js'


// obtener todos los productos
export async function getAllProductos(req, res) {
    // Obtener todos los productos de la base de datos
    try {
        const result = await getAllProductosDB();
        res.status(200).json(result);
    } catch (error) {
        // 503: service unavailable, servicio caído temporalmente
        res.status(503).json(error.message);
    }
}

// obtener un producto por id
export async function getProductoById(req, res) {
    // Obtener todos los productos de la base de datos
    try {
        const id = req.params.id
        if (isNaN(id)) {
            res.status(400).json({ Error: "El ID debe ser un número válido" });
            return;
        }
        const result = await getProductoByIdDB(id);
        res.status(200).json(result);
    } catch (error) {
        // 404 not found
        const message = error.message == "Producto no encontrado" ? 404 : 500
        res.status(message).json(error.message);
    }
}

// crear un producto
export async function createProducto(req, res) {
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
export async function updateProducto(req, res) {
    try {
        // Leer `id_producto` desde los params
        const id_producto = req.params.id;
        // Leer el resto de los campos desde el body
        const data = req.body;
        // llamo al Model para manejar la DB apartir de aquí 
        const result = await updateProductoDB(id_producto, data);
        res.status(201).json(result);
    } catch (error) {
        if (error.message != "Categoría no existe") {
            res.status(409).json(error.message);
        } else if (error.message != "El producto con el ID especificado no existe") {
            res.status(400).json(error.message);
        } else {
            res.status(500).json(error.message);
        }

    }
}


// Eliminar Producto
export async function deleteProductoById(req, res) {
    // Obtener todos los productos de la base de datos
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ Error: "El ID debe ser un número válido" });
            return;
        }
        const result = await deleteProductoByIdDB(id);
        res.status(200).json(result);
    } catch (error) {
        // 404 not found
        if (error.message != "El Producto no existe" && error.message != "Producto no encontrado") {
            res.status(404).json(error.message);
        } else {
            res.status(500).json(error.message);
        }
    }
}