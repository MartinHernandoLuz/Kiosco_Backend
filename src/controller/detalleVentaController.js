import {
  getAllDetallesVentaDB,
  getDetalleVentaByIdDB,
  createDetalleVentaDB,
  updateDetalleVentaDB,
  deleteDetalleVentaDB,
  getFullDetalleByIdDB,
} from "../model/detalleVentaModel.js";

export async function getAllDetallesVenta(req, res) {
  try {
    const result = await getAllDetallesVentaDB();
    res.status(200).json(result);
  } catch (error) {
    res.status(503).json({ Error: error.message });
  }
}

export async function getDetalleVentaById(req, res) {
  try {
    const id = req.params.id;
    const result = await getDetalleVentaByIdDB(id);
    res.status(200).json(result);
  } catch (error) {
    const message = error.message === "Detalle de venta no encontrado" ? 404 : 500;
    res.status(message).json({ error: error.message });
  }
}

export async function getFullDetalleById(req, res) {
  try {
    const id = req.params.id;
    const result = await getFullDetalleByIdDB(id);
    res.status(200).json(result);
  } catch (error) {
    const message = error.message === "Detalle de venta no encontrado" ? 404 : 500;
    res.status(message).json({ Error: error.message });
  }
}


export async function createDetalleVenta(req, res) {
  try {
    const data = req.body;
    const result = await createDetalleVentaDB(data);
    res.status(201).json(result);
  } catch (error) {
    if (error.message == "Venta no existe" || error.message == "Producto no existe") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

export async function updateDetalleVenta(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await updateDetalleVentaDB(id, data);
    res.status(200).json(result);
  } catch (error) {
    if (error.message != "El detalle de venta con el ID especificado no existe") {
      res.status(400).json({ Error: error.message });
    } else if (error.message != "Venta no existe" && error.message != "Producto no existe") {
      res.status(409).json({ Error: error.message });
    } else {
      res.status(500).json({ Error: error.message });
    }
  }
}

export async function deleteDetalleVenta(req, res) {
  try {
    const id = req.params.id;
    const result = await deleteDetalleVentaDB(id);
    res.status(200).json(result);
  } catch (error) {
    const message = error.message === "Detalle de venta no encontrado" ? 404 : 500;
    res.status(message).json({ error: error.message });
  }
}
