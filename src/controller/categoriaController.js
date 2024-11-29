import {
    getAllCategoriasDB,
    getCategoriaByIdDB,
    createCategoriaDB,
    updateCategoriaDB,
    deleteCategoriaByIdDB
} from '../model/categoriaModel.js';

import { CustomError } from "../others/customError.js"




// Obtener todas las categorías
export async function getAllCategorias(req, res) {
    try {
        const result = await getAllCategoriasDB();
        res.status(200).json(result);
    } catch (error) {
        // 503: Service unavailable, servicio caído temporalmente
        if (error.message = "Error al obtener las categorías") {
            res.status(503).json(error.message);
        } else {
            res.status(500).json({ Error: "error inesperado" });
        }
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
        if (error.message = "Categoría no encontrada") {
            res.status(404).json(error.message);
        } else {
            res.status(500).json({ Error: "error inesperado" });
        }
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
        res.status(500).json({ Error: "error inesperado" });
    }
}

// Actualizar una categoría
export async function updateCategoria(req, res) {
    try {
        // Leer `ID_Categoria` desde los query params ej: actualizar?ID_Categoria=1
        const ID_Categoria = req.params.id;
        // Leer el resto de los campos desde el body
        const data = req.body;
        // Llamo al Model para manejar la DB
        const result = await updateCategoriaDB(ID_Categoria, data);
        res.status(201).json(result);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.errorCode).json({ "Error": error.message });
        } else {
            res.status(500).json({ "Error": "error inesperado" });
        }
    }
}

// Eliminar una categoría
export async function deleteCategoriaById(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        const result = await deleteCategoriaByIdDB(id);
        res.status(200).json(result);
    } catch (error) {
        // 404 not found
        if (error.message = "La categoría no existe") {
            res.status(404).json({ Error: error.message });
        } else {
            res.status(500).json({ Error: "error inesperado" });
        }
    }
}
