import app from '../../app.js'
import request from 'supertest'
import db from '../config/db.js';
import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { email: "juan.perez@example.com", rango: "administrador"},
  process.env.JWT_SECRET,
  { expiresIn: "1h" } // Tiempo de expiración del token
);

const tokenAdmin = jwt.sign(
  { email: "admin.admin@example.com", rango: "administrador"},
  process.env.JWT_SECRET,
  { expiresIn: "1h" } // Tiempo de expiración del token
);


describe("POST /crear - Ruta para crear categoria", () => {
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
          
          expect(response.statusCode).toBe(401); // Acceso prohibido
          expect(response.body).toMatchObject({error: 'Token no válido o expirado'});
        });
       

});




describe("PUT /actualizar/:id - Ruta para actualizar categoria", () => {
        beforeEach(async () => {
          // Iniciar una conexión para la transacción
          await db.query("BEGIN")
        });
        
        afterEach(async () => {
          // Realizar el rollback de la transacción
          await db.query("ROLLBACK")
        })



        
        it("Debería actualizar una categoría correctamente", async () => {
          const categoriaData = {"nombre": "voley"};
          
          const response = await request(app)
          .put("/categorias/actualizar/1")
          .set("Authorization", `Bearer ${token}`) // Aquí va el token
          .send(categoriaData);
          
          // Verificar la respuesta
          expect(response.body).toEqual(
            expect.objectContaining({
              message: "Categoría actualizada exitosamente",
            }));
          expect(response.statusCode).toBe(201);
        });
        
        it("Debería devolver un error si no se envía el ID", async () => {
          const response = await request(app)
          .put("/categorias/actualizar/f")
          .set("Authorization", `Bearer ${token}`) // Aquí va el token
          .send({}); // Enviar un cuerpo vacío
          
          expect(response.statusCode).toBe(400); // Error de validación
          expect(response.body).toEqual(
            expect.objectContaining({
              errors: expect.any(Array),
            })
          );
        });

        it("Debería devolver un error si no se envía el nombre u otro dato", async () => {
          const response = await request(app)
          .put("/categorias/actualizar/1")
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
          .put("/categorias/actualizar/1")
          .set("Authorization", `Bearer invalidtoken`) // Token inválido
          .send({ nombre: "Categoría Inválida" });
          
          expect(response.statusCode).toBe(401); // Acceso prohibido
          expect(response.body).toMatchObject({error: 'Token no válido o expirado'});
        });
       

});




describe("DELETE /eliminar/:id - Ruta para eliminar una categoría", () => {
  beforeEach(async () => {
    // Iniciar una conexión para la transacción
    await db.query("BEGIN")
  });
  
  afterEach(async () => {
    // Realizar el rollback de la transacción
    await db.query("ROLLBACK")
  })

  it("Debería eliminar una categoría correctamente", async () => {
    
    const response = await request(app)
    .delete("/categorias/eliminar/1")
    .set("Authorization", `Bearer ${tokenAdmin}`) // Aquí va el token
    
    // Verificar la respuesta
    expect(response.body).toEqual(
      expect.objectContaining({
        Categoria: expect.any(Object), // Confirmar que 'Categoria' sea un objeto
        Estado: "Eliminada",          // Confirmar que el estado sea "Eliminada"
      })
    );
    expect(response.statusCode).toBe(200);
  });
  
  it("Debería fallar el acceso", async () => {
    const response = await request(app)
      .delete("/categorias/eliminar/1")
      .set("Authorization", `Bearer ${token}`); // Aquí va el token
  
    // Verificar la respuesta
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Acceso denegado: permisos insuficientes"
      })
    );
  
    // Verificar el código de estado HTTP
    expect(response.statusCode).toBe(403);
  });
  
  
  it("Debería devolver un error si no se envía el nombre", async () => {
    const response = await request(app)
    .delete("/categorias/eliminar/f")
    .set("Authorization", `Bearer ${token}`) // Aquí va el token
    
    expect(response.statusCode).toBe(400); // Error de validación
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "El ID debe ser un número entero positivo"
        })
      ])
    );
    });
  
  it("Debería devolver un error si el token es inválido", async () => {
    const response = await request(app)
    .delete("/categorias/eliminar/1")
    .set("Authorization", `Bearer invalidtoken`) // Token inválido
    
    expect(response.statusCode).toBe(401); // Acceso prohibido
    expect(response.body).toMatchObject({error: 'Token no válido o expirado'});
    });
 

});