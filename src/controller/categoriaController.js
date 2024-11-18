import { 
    getAllCategoriasDB, 
    getCategoriaByIdDB, 
    createCategoriaDB, 
    updateCategoriaDB, 
    deleteCategoriaByIdDB 
} from '../model/categoriaModel.js';
import { errorsUpdate } from '../others/errorsUpdateCategoria.js'; // Adaptar esta función si es necesaria

// Obtener todas las categorías
export async function getAllCategorias(req, res) {
    try {
        const result = await getAllCategoriasDB();
        res.status(200).json(result);
    } catch (error) {
        // 503: Service unavailable, servicio caído temporalmente
        const message = error.message == "Error al obtener las categorías" ? 503 : 500;
        res.status(message).json(error.message);
    }
}

// Obtener una categoría por ID
export async function getCategoriaById(req, res) {
    try {
        const id = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ Error: "El ID debe ser un número válido" });
            return;
        }
        const result = await getCategoriaByIdDB(id);
        res.status(200).json(result);
    } catch (error) {
        // 404 not found
        const message = error.message == "Categoría no encontrada" ? 404 : 500;
        res.status(message).json(error.message);
    }
}

// Crear una categoría
export async function createCategoria(req, res) {
    try {
        const data = req.body;
        const result = await createCategoriaDB(data);
        res.status(201).json(result);
    } catch (error) {
        // En este caso no hay conflictos de foreign key, pero manejo genérico de errores
        res.status(500).json(error.message);
    }
}

// Actualizar una categoría
export async function updateCategoria(req, res) {
    try {
        // Leer `ID_Categoria` desde los query params ej: actualizar?ID_Categoria=1
        const  ID_Categoria  = req.params.id; 
        // Leer el resto de los campos desde el body
        const data = req.body;
        // Llamo al Model para manejar la DB
        const result = await updateCategoriaDB(ID_Categoria, data);
        res.status(201).json(result);
    } catch (error) {
        const errorMsg = error.message;
        // Manejo de errores específicos
        errorsUpdate(errorMsg, res);
    }
}

// Eliminar una categoría
export async function deleteCategoriaById(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ Error: "El ID debe ser un número válido" });
            return;
        }
        const result = await deleteCategoriaByIdDB(id);
        res.status(200).json(result);
    } catch (error) {
        // 404 not found
        const message = error.message == "La categoría no existe" ? 404 : 500;
        res.status(message).json(error.message);
    }
}
