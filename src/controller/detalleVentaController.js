import {
    getAllDetallesVentaDB,
    getDetalleVentaByIdDB,
    createDetalleVentaDB,
    updateDetalleVentaDB,
    deleteDetalleVentaDB,
  } from "../model/detalleVentaModel.js";
  import { errorsUpdate } from "../others/errorsUpdateDetalleVenta.js";
  
  export async function getAllDetallesVenta(req, res) {
    try {
      const result = await getAllDetallesVentaDB();
      res.status(200).json(result);
    } catch (error) {
      res.status(503).json({ error: error.message });
    }
  }
  
  export async function getDetalleVentaById(req, res) {
    try {
      const { ID_Venta, ID_Producto } = req.params;
      const result = await getDetalleVentaByIdDB(ID_Venta, ID_Producto);
      res.status(200).json(result);
    } catch (error) {
      const message = error.message === "Detalle de venta no encontrado" ? 404 : 500;
      res.status(message).json({ error: error.message });
    }
  }
  
  export async function createDetalleVenta(req, res) {
    try {
      const data = req.body;
      const result = await createDetalleVentaDB(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(409).json({ error: error.message });
    }
  }
  
  export async function updateDetalleVenta(req, res) {
    try {
      const { ID_Venta, ID_Producto } = req.params;
      const data = req.body;
      const result = await updateDetalleVentaDB(ID_Venta, ID_Producto, data);
      res.status(200).json(result);
    } catch (error) {
      errorsUpdate(error.message, res);
    }
  }
  
  export async function deleteDetalleVenta(req, res) {
    try {
      const { ID_Venta, ID_Producto } = req.params;
      const result = await deleteDetalleVentaDB(ID_Venta, ID_Producto);
      res.status(200).json(result);
    } catch (error) {
      const message = error.message === "Detalle de venta no encontrado" ? 404 : 500;
      res.status(message).json({ error: error.message });
    }
  }
  