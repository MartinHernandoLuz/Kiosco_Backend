export function errorsUpdateVenta(errorMsg, res) {
    if (errorMsg.includes("El campo 'id_venta' es obligatorio")) {
        res.status(400).json({ Error: "El campo 'id_venta' es obligatorio" });
        return;
    } else if (errorMsg.includes("Debe proporcionar al menos uno de los siguientes campos")) {
        res.status(400).json({ Error: "Debe proporcionar al menos uno de los siguientes campos: ID_Cliente, total, fecha" });
        return;
    } else if (errorMsg.includes("La venta con el ID especificado no existe")) {
        res.status(404).json({ Error: "Venta no encontrada" });
        return;
    } else if (errorMsg.includes("No se ha proporcionado ningún dato para actualizar")) {
        res.status(400).json({ Error: "No se ha proporcionado ningún dato para actualizar" });
        return;
    } else if (errorMsg.includes("El cliente especificado no existe")) {
        res.status(409).json({ Error: "El cliente especificado no existe" });
        return;
    } else {
        res.status(503).json({ Error: "Error inesperado, reintente nuevamente" });
    }
}
