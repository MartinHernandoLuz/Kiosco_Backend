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


describe("POST /crear - Ruta para crear cliente", () => {

  beforeEach(async () => {
    // Iniciar una conexión para la transacción
    await db.query("BEGIN")
  });

  afterEach(async () => {
    // Realizar el rollback de la transacción
    await db.query("ROLLBACK")
  })

  it("Debería crear una cliente correctamente", async () => {
    const clienteData = { "nombre": "fulbito", "apellido": "holaxd", "telefono": "45673899" };

    const response = await request(app)
      .post("/clientes/crear")
      .set("Authorization", `Bearer ${token}`) // Aquí va el token
      .send(clienteData);

    // Verificar la respuesta
    expect(response.body).toHaveProperty("message", "Cliente creado exitosamente");
    expect(response.statusCode).toBe(201);
  });

  it("Debería devolver un error si no se envía el nombre", async () => {
    const response = await request(app)
      .post("/clientes/crear")
      .set("Authorization", `Bearer ${token}`) // Aquí va el token
      .send({}); // Enviar un cuerpo vacío

    expect(response.statusCode).toBe(400); // Error de validación
    expect(response.body).toEqual(
      expect.objectContaining({
        errors: expect.any(Array),
      })
    );

  });

  it("Debería devolver un error si el token es inválido", async () => {
    const response = await request(app)
      .post("/clientes/crear")
      .set("Authorization", `Bearer invalidtoken`) // Token inválido
      .send({ nombre: "cliente Inválida" });

    expect(response.statusCode).toBe(401); // Acceso prohibido
    expect(response.body).toMatchObject({ error: 'Token no válido o expirado' });
  });


});




describe("PUT /actualizar/:id - Ruta para actualizar cliente", () => {
  beforeEach(async () => {
    // Iniciar una conexión para la transacción
    await db.query("BEGIN")
  });

  afterEach(async () => {
    // Realizar el rollback de la transacción
    await db.query("ROLLBACK")
  })




  it("Debería actualizar una cliente correctamente", async () => {
    const clienteData = { "nombre": "voley" };

    const response = await request(app)
      .put("/clientes/actualizar/1")
      .set("Authorization", `Bearer ${token}`) // Aquí va el token
      .send(clienteData);

    // Verificar la respuesta
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Cliente actualizado exitosamente",
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

  it("Debería devolver un error si no se envía nada", async () => {
    const response = await request(app)
      .put("/clientes/actualizar/1")
      .set("Authorization", `Bearer ${token}`) // Aquí va el token
      .send({}); // Enviar un cuerpo vacío

    expect(response.statusCode).toBe(400); // Error de validación
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            "type": "field",
            "value": {},
            "msg": "Debe proporcionar al menos uno de los siguientes campos: nombre, apellido, dni, telefono, mail",
            "path": "",
            "location": "body"
          })
      ])
    );
  });

  it("Debería devolver un error si el token es inválido", async () => {
    const response = await request(app)
      .put("/clientes/actualizar/1")
      .set("Authorization", `Bearer invalidtoken`) // Token inválido
      .send({ nombre: "cliente Inválida" });

    expect(response.statusCode).toBe(401); // Acceso prohibido
    expect(response.body).toMatchObject({ error: 'Token no válido o expirado' });
  });


});




describe("DELETE /eliminar/:id - Ruta para eliminar una cliente", () => {
  beforeEach(async () => {
    // Iniciar una conexión para la transacción
    await db.query("BEGIN")
  });

  afterEach(async () => {
    // Realizar el rollback de la transacción
    await db.query("ROLLBACK")
  })

  it("Debería eliminar un cliente correctamente", async () => {

    const response = await request(app)
      .delete("/clientes/eliminar/1")
      .set("Authorization", `Bearer ${tokenAdmin}`) // Aquí va el token

    // Verificar la respuesta
    expect(response.body).toEqual(
      expect.objectContaining({
        Cliente: expect.any(Object), // Confirmar que 'cliente' sea un objeto
        Estado: "Eliminado",          // Confirmar que el estado sea "Eliminada"
      })
    );
    expect(response.statusCode).toBe(200);
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

  it("Debería fallar el acceso", async () => {
    const response = await request(app)
      .delete("/clientes/eliminar/1")
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


  it("Debería devolver un error si el token es inválido", async () => {
    const response = await request(app)
      .delete("/clientes/eliminar/1")
      .set("Authorization", `Bearer invalidtoken`) // Token inválido

    expect(response.statusCode).toBe(401); // Acceso prohibido
    expect(response.body).toMatchObject({ error: 'Token no válido o expirado' });
  });


});