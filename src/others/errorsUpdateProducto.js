

export function errorsUpdate(errorMsg,res) {
    if(errorMsg.includes("El campo 'id_producto' es obligatorio en los parámetros de consulta")){
        res.status(400).json({"Error":"El campo 'id_producto' es obligatorio en los parámetros de consulta"});
        return;
    }
    else if(errorMsg.includes("Debe proporcionar al menos uno de los siguientes campos en el cuerpo de la solicitud: nombre, precio, stock, ID_Categoria")){
        res.status(400).json({"Error":"Debe proporcionar al menos uno de los siguientes campos en el cuerpo de la solicitud: nombre, precio, stock, ID_Categoria"});
        return;
    }
    else if(errorMsg.includes("El producto con el ID especificado no existe")){
        res.status(404).json({"Error":"Producto no encontrado"});
        return;
    }
    else if(errorMsg.includes("No se ha proporcionado ningún dato para actualizar")){
        res.status(400).json({"Error":"No se ha proporcionado ningún dato para actualizar"});
        return;
    } 
    else {
        res.status(503).json({"Error":"Error inesperado, reintente nuevamente"});
    }
}