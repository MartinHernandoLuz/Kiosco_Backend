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



describe("POST /crear - Ruta para crear venta", () => {

  beforeEach(async () => {
    // Iniciar una conexión para la transacción
    await db.query("BEGIN")
  });

  afterEach(async () => {
    // Realizar el rollback de la transacción
    await db.query("ROLLBACK")
  })


  //##########################################

  it("Debería crear un Venta correctamente", async () => {
    const ventaData = {
      "ID_Cliente": "3",
      "total": "40",
      "id_vendedor": "1"
    };

    const response = await request(app)
      .post("/ventas/crear")
      .set("Authorization", `Bearer ${token}`) // Aquí va el token
      .send(ventaData);

    // Verificar la respuesta
    expect(response.body).toEqual(
      expect.objectContaining({
        Message: "Venta creada exitosamente",
      }));
    expect(response.statusCode).toBe(201);
  });

  it("Debería devolver un error si no se envía el body", async () => {
    const response = await request(app)
      .post("/ventas/crear")
      .set("Authorization", `Bearer ${token}`) // Aquí va el token
      .send({}); // Enviar un cuerpo vacío

    expect(response.statusCode).toBe(400); // Error de validación
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.any(Object) // Esto valida que haya al menos un objeto en el array.
      ])
    );
  });

  it("Debería devolver un error si el token es inválido", async () => {
    const response = await request(app)
      .post("/ventas/crear")
      .set("Authorization", `Bearer invalidtoken`) // Token inválido
      .send({ nombre: "Venta Inválida" });

    expect(response.statusCode).toBe(401); // Acceso prohibido
    expect(response.body).toMatchObject({ error: 'Token no válido o expirado' });
  });


});




describe("PUT /actualizar/:id - Ruta para actualizar venta", () => {
  beforeEach(async () => {
    // Iniciar una conexión para la transacción
    await db.query("BEGIN")
  });

  afterEach(async () => {
    // Realizar el rollback de la transacción
    await db.query("ROLLBACK")
  })




  it("Debería actualizar un Venta correctamente", async () => {
    const ventaData = { "total": "40" };

    const response = await request(app)
      .put("/ventas/actualizar/3")
      .set("Authorization", `Bearer ${token}`) // Aquí va el token
      .send(ventaData);

    // Verificar la respuesta
    expect(response.body).toEqual(
      expect.objectContaining({
        Message: "Venta actualizada exitosamente",
      }));
    expect(response.statusCode).toBe(201);
  });

  it("Debería devolver un error si no se envía el ID", async () => {
    const response = await request(app)
      .put("/ventas/actualizar/f")
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
      .put("/ventas/actualizar/1")
      .set("Authorization", `Bearer ${token}`) // Aquí va el token
      .send({}); // Enviar un cuerpo vacío

    // Verificar el estado HTTP
    expect(response.statusCode).toBe(400);

    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.any(Object)
      ])
    );

  });

  it("Debería devolver un error si el token es inválido", async () => {
    const response = await request(app)
      .put("/ventas/actualizar/1")
      .set("Authorization", `Bearer invalidtoken`) // Token inválido
      .send({ nombre: "Venta Inválida" });

    expect(response.statusCode).toBe(401); // Acceso prohibido
    expect(response.body).toMatchObject({ error: 'Token no válido o expirado' });
  });


});




describe("DELETE /eliminar/:id - Ruta para eliminar un Venta", () => {
  beforeEach(async () => {
    // Iniciar una conexión para la transacción
    await db.query("BEGIN")
  });

  afterEach(async () => {
    // Realizar el rollback de la transacción
    await db.query("ROLLBACK")
  })

  it("Debería eliminar una Venta correctamente", async () => {

    const response = await request(app)
      .delete("/ventas/eliminar/3")
      .set("Authorization", `Bearer ${tokenAdmin}`) // Aquí va el token

    // Verificar la respuesta
    expect(response.body).toEqual(
      expect.objectContaining({
        Venta: expect.any(Object), // Confirmar que 'Venta' sea un objeto
        Estado: "Eliminada",          // Confirmar que el estado sea "Eliminada"
      })
    );
    expect(response.statusCode).toBe(200);
  });

  it("Debería decir que la venta no existe", async () => {

    const response = await request(app)
      .delete("/ventas/eliminar/1")
      .set("Authorization", `Bearer ${tokenAdmin}`) // Aquí va el token

    // Verificar la respuesta
    expect(response.body).toEqual(
      expect.objectContaining({
        "Error": "La venta no existe"
      })
    );
    expect(response.statusCode).toBe(404);
  });

  it("Debería fallar el acceso", async () => {
    const response = await request(app)
      .delete("/ventas/eliminar/1")
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
      .delete("/ventas/eliminar/f")
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
      .delete("/ventas/eliminar/1")
      .set("Authorization", `Bearer invalidtoken`) // Token inválido

    expect(response.statusCode).toBe(401); // Acceso prohibido
    expect(response.body).toMatchObject({ error: 'Token no válido o expirado' });
  });


});