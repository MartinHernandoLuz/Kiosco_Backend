export function errorsUpdate(errorMsg,res) {
    if(errorMsg.includes("El campo 'ID_Categoria' es obligatorio en los parámetros")){
        res.status(400).json({"Error":"El campo 'ID_Categoria' es obligatorio en los parámetros"});
        return;
    }
    else if(errorMsg.includes("Debe proporcionar el campo nombre")){
        res.status(400).json({"Error":"Debe proporcionar el campo nombre"});
        return;
    }
    else if(errorMsg.includes("La categoría con el ID especificado no existe")){
        res.status(404).json({"Error":"La categoría con el ID especificado no existe"});
        return;
    }
    else {
        res.status(503).json({"Error":"Error inesperado, reintente nuevamente"});
    }
}