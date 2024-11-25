import {
    getAllVentasDB,
    getVentaByIdDB,
    createVentaDB,
    updateVentaDB,
    deleteVentaByIdDB,
    getVentasEntreFechasDB
} from '../model/ventaModel.js';
import { errorsUpdateVenta } from '../others/errorsUpdateVenta.js';

// Obtener todas las ventas
export async function getAllVentas(req, res) {
    try {
        const result = await getAllVentasDB();
        res.status(200).json(result);
    } catch (error) {
        res.status(503).json({ Error: "Error al obtener las ventas" });
    }
}

// Obtener una venta por ID
export async function getVentaById(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ Error: "El ID debe ser un número válido" });
            return;
        }
        const result = await getVentaByIdDB(id);
        res.status(200).json(result);
    } catch (error) {
        const message = error.message === "Venta no encontrada" ? 404 : 500;
        res.status(message).json({ Error: error.message });
    }
}

export async function getVentasEntreFechas(req, res) {
    try {
        const startDate = req.query.startDate
        const endDate = req.query.endDate

        const result = await getVentasEntreFechasDB(startDate, endDate);
        res.status(200).json(result);
    } catch (error) {
        const message = error.message === "No se encontraron ventas en este rango de fechas" ? 404 : 500;
        res.status(message).json({ Error: error.message });
    }
}


// Crear una nueva venta
export async function createVenta(req, res) {
    try {
        const data = req.body;
        const result = await createVentaDB(data);
        res.status(201).json(result);
    } catch (error) {
        const message = error.message === "El cliente especificado no existe" ? 409 : 500;
        res.status(message).json({ Error: error.message });
    }
}

// Actualizar una venta
export async function updateVenta(req, res) {
    try {
        const id_venta = parseInt(req.params.id, 10);
        if (isNaN(id_venta)) {
            res.status(400).json({ Error: "El ID debe ser un número válido" });
            return;
        }
        const data = req.body;
        const result = await updateVentaDB(id_venta, data);
        res.status(201).json(result);
    } catch (error) {
        const errorMsg = error.message;
        errorsUpdateVenta(errorMsg, res);
    }
}

// Eliminar una venta
export async function deleteVentaById(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ Error: "El ID debe ser un número válido" });
            return;
        }
        const result = await deleteVentaByIdDB(id);
        res.status(200).json(result);
    } catch (error) {
        const message = error.message === "La venta no existe" ? 404 : 500;
        res.status(message).json({ Error: error.message });
    }
}
