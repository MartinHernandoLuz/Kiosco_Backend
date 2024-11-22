import app from '../../app.js'
import request from 'supertest'
import db from '../config/db.js';
import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { email: "juan.perez@example.com", rango: "administrador"},
  process.env.JWT_SECRET,
  { expiresIn: "1h" } // Tiempo de expiración del token
);


describe("POST /crear - Ruta para crear categoría", () => {
    // Reemplaza con tu token válido
        let connection;
      
        beforeEach(async () => {
          // Iniciar una conexión para la transacción
          await db.query("BEGIN")
        });
        
        afterEach(async () => {
          // Realizar el rollback de la transacción
          await db.query("ROLLBACK")
        })
        
        it("Debería crear una categoría correctamente", async () => {
          const categoriaData = {"nombre": "fulbito"};
          
          const response = await request(app)
          .post("/categorias/crear")
          .set("Authorization", `Bearer ${token}`) // Aquí va el token
          .send(categoriaData);
          
          // Verificar la respuesta
          expect(response.body).toHaveProperty("message", "Categoría creada exitosamente");
          expect(response.statusCode).toBe(201);
        });
        
        it("Debería devolver un error si no se envía el nombre", async () => {
          const response = await request(app)
          .post("/categorias/crear")
          .set("Authorization", `Bearer ${token}`) // Aquí va el token
          .send({}); // Enviar un cuerpo vacío
          
          expect(response.statusCode).toBe(400); // Error de validación
          expect(response.body.errors).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                msg: "El nombre es obligatorio"
              })
            ])
          );
        });
        
        it("Debería devolver un error si el token es inválido", async () => {
          const response = await request(app)
          .post("/categorias/crear")
          .set("Authorization", `Bearer invalidtoken`) // Token inválido
          .send({ nombre: "Categoría Inválida" });
          
          expect(response.statusCode).toBe(403); // Acceso prohibido
          expect(response.body).toMatchObject({error: 'Token no válido o expirado'});
        });
       

      });
      
      /*
      afterAll(async () => {
        await db.end(); // Cerrar conexión con la base de datos si usas MySQL o similar
});*/
