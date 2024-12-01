import {
    getAllClientesDB,
    getClienteByIdDB,
    createClienteDB,
    updateClienteDB, deleteClienteByIdDB
} from '../model/clienteModel.js'
import { errorsUpdate } from '../others/errorsUpdateCliente.js';



// obtener todos los Clientes
export async function getAllClientes(req, res) {
    // Obtener todos los Clientes de la base de datos
    try {
        const result = await getAllClientesDB();
        res.status(200).json(result);
    } catch (error) {
        // 503: service unavailable, servicio caído temporalmente
        res.status(500).json(error.message);
    }
}

// obtener un Cliente por id
export async function getClienteById(req, res) {
    // Obtener todos los Clientes de la base de datos
    try {
        const id = req.params.id
        if (isNaN(id)) {
            res.status(400).json({ Error: "El ID debe ser un número válido" });
            return;
        }
        const result = await getClienteByIdDB(id);
        res.status(200).json(result);
    } catch (error) {
        // 404 not found
        const message = error.message == "Cliente no encontrado" ? 404 : 500
        res.status(message).json({ Error: error.message });
    }
}

// crear un Cliente
export async function createCliente(req, res) {
    // crearCliente
    try {
        const data = req.body
        const result = await createClienteDB(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// actualizar un Cliente (lean línea a línea y entren en las funciones o no entenderán nada)
export async function updateCliente(req, res) {
    try {
        // Leer `id_Cliente` desde los query params ej: actualizar?id_Cliente=1
        const id_Cliente = req.params.id;
        // Leer el resto de los campos desde el body
        const data = req.body;
        // llamo al Model para manejar la DB apartir de aquí 
        const result = await updateClienteDB(id_Cliente, data);
        res.status(201).json(result);
    } catch (error) {
        const message = error.message == "El cliente con el ID especificado no existe" ? 400 : 500
        res.status(message).json({ Error: error.message })
    }
}


// Eliminar Cliente
export async function deleteClienteById(req, res) {
    // Obtener todos los Clientes de la base de datos
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ Error: "El ID debe ser un número válido" });
            return;
        }
        const result = await deleteClienteByIdDB(id);
        res.status(200).json(result);
    } catch (error) {
        // 404 not found
        const message = error.message != "Ocurrió un error inesperado al eliminar el Cliente" ? 404 : 500
        res.status(message).json(error.message);
    }
}