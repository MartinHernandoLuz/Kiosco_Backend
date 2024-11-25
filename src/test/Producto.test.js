import app from '../../app.js'
import request from 'supertest'
import db from '../config/db.js';
import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { email: "juan.perez@example.com", rango: "administrador" },
  process.env.JWT_SECRET,
  { expiresIn: "1h" } // Tiempo de expiración del token
);

const tokenAdmin = jwt.sign(
  { email: "admin.admin@example.com", rango: "administrador" },
  process.env.JWT_SECRET,
  { expiresIn: "1h" } // Tiempo de expiración del token
);



describe("POST /crear - Ruta para crear producto", () => {

  beforeEach(async () => {
    // Iniciar una conexión para la transacción
    await db.query("BEGIN")
  });

  afterEach(async () => {
    // Realizar el rollback de la transacción
    await db.query("ROLLBACK")
  })


  //##########################################

  it("Debería crear un Producto correctamente", async () => {
    const productoData = {
      "nombre": "HP",
      "precio": "1000000",
      "stock": "30",
      "ID_Categoria": "5"
    };

    const response = await request(app)
      .post("/productos/crear")
      .set("Authorization", `Bearer ${token}`) // Aquí va el token
      .send(productoData);

    // Verificar la respuesta
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Producto creado exitosamente",
      }));
    expect(response.statusCode).toBe(201);
  });

  it("Debería devolver un error si no se envía el body", async () => {
    const response = await request(app)
      .post("/productos/crear")
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
      .post("/productos/crear")
      .set("Authorization", `Bearer invalidtoken`) // Token inválido
      .send({ nombre: "Producto Inválida" });

    expect(response.statusCode).toBe(401); // Acceso prohibido
    expect(response.body).toMatchObject({ error: 'Token no válido o expirado' });
  });


});




describe("PUT /actualizar/:id - Ruta para actualizar producto", () => {
  beforeEach(async () => {
    // Iniciar una conexión para la transacción
    await db.query("BEGIN")
  });

  afterEach(async () => {
    // Realizar el rollback de la transacción
    await db.query("ROLLBACK")
  })




  it("Debería actualizar un Producto correctamente", async () => {
    const productoData = { "nombre": "voley" };

    const response = await request(app)
      .put("/productos/actualizar/1")
      .set("Authorization", `Bearer ${token}`) // Aquí va el token
      .send(productoData);

    // Verificar la respuesta
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Producto actualizado exitosamente",
      }));
    expect(response.statusCode).toBe(201);
  });

  it("Debería devolver un error si no se envía el ID", async () => {
    const response = await request(app)
      .put("/productos/actualizar/f")
      .set("Authorization", `Bearer ${token}`) // Aquí va el token
      .send({}); // Enviar un cuerpo vacío

    expect(response.statusCode).toBe(400); // Error de validación
    expect(response.body).toEqual(
      expect.objectContaining({
        errors: expect.any(Array),
      })
    );
  });

  it("Debería devolver un error si no se envía nada", async () => {
    const response = await request(app)
      .put("/productos/actualizar/1")
      .set("Authorization", `Bearer ${token}`) // Aquí va el token
      .send({}); // Enviar un cuerpo vacío

    // Verificar el estado HTTP
    expect(response.statusCode).toBe(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        Error: "Debe proporcionar al menos uno de los siguientes campos en el cuerpo de la solicitud: nombre, precio, stock, ID_Categoria"
      })
    );

  });

  it("Debería devolver un error si el token es inválido", async () => {
    const response = await request(app)
      .put("/productos/actualizar/1")
      .set("Authorization", `Bearer invalidtoken`) // Token inválido
      .send({ nombre: "Producto Inválida" });

    expect(response.statusCode).toBe(401); // Acceso prohibido
    expect(response.body).toMatchObject({ error: 'Token no válido o expirado' });
  });


});




describe("DELETE /eliminar/:id - Ruta para eliminar un Producto", () => {
  beforeEach(async () => {
    // Iniciar una conexión para la transacción
    await db.query("BEGIN")
  });

  afterEach(async () => {
    // Realizar el rollback de la transacción
    await db.query("ROLLBACK")
  })

  it("Debería eliminar una Producto correctamente", async () => {

    const response = await request(app)
      .delete("/productos/eliminar/1")
      .set("Authorization", `Bearer ${tokenAdmin}`) // Aquí va el token

    // Verificar la respuesta
    expect(response.body).toEqual(
      expect.objectContaining({
        Producto: expect.any(Object), // Confirmar que 'Producto' sea un objeto
        Estado: "Eliminado",          // Confirmar que el estado sea "Eliminada"
      })
    );
    expect(response.statusCode).toBe(200);
  });

  it("Debería fallar el acceso", async () => {
    const response = await request(app)
      .delete("/productos/eliminar/1")
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


  it("Debería devolver un error si no se envía el ID", async () => {
    const response = await request(app)
      .delete("/productos/eliminar/f")
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
      .delete("/productos/eliminar/1")
      .set("Authorization", `Bearer invalidtoken`) // Token inválido

    expect(response.statusCode).toBe(401); // Acceso prohibido
    expect(response.body).toMatchObject({ error: 'Token no válido o expirado' });
  });


});