export function errorsUpdate(errorMsg, res) {
    if (errorMsg.includes("No se ha proporcionado ningún dato para actualizar")) {
      res.status(400).json({ error: "Debe proporcionar al menos un campo para actualizar" });
    } else {
      res.status(503).json({ error: "Error inesperado. Intente nuevamente" });
    }
  }
  