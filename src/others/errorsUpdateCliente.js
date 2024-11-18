export function errorsUpdate(errorMsg, res) {
    if (errorMsg.includes("El campo 'id_Cliente' es obligatorio")) {
        res.status(400).json({ "Error": "El campo 'id_Cliente' es obligatorio" });
        return;
    } else if (errorMsg.includes("Debe proporcionar al menos uno de los siguientes campos: nombre, apellido, dni, telefono, mail")) {
        res.status(400).json({ "Error": "Debe proporcionar al menos uno de los siguientes campos: nombre, apellido, dni, telefono, mail" });
        return;
    } else if (errorMsg.includes("El cliente con el ID especificado no existe")) {
        res.status(404).json({ "Error": "Cliente no encontrado" });
        return;
    } else {
        res.status(503).json({ "Error": "Error inesperado, reintente nuevamente" });
    }
}
