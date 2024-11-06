import helmet from "helmet"
import { rateLimit } from 'express-rate-limit'

export function seguridadInicial(app){
    // Middleware de seguridad
app.use(helmet());  // Protege las cabeceras HTTP

// Limitar las peticiones para prevenir ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // Limita cada IP a 100 peticiones por ventana de 15 minutos
});
app.use(limiter);

// Middleware para parsear JSON
console.log("fiumba")
}