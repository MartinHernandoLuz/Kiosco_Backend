import helmet from "helmet"

export function seguridadInicial(app){
    // Middleware de seguridad
app.use(helmet());  // Protege las cabeceras HTTP


}