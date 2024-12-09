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





describe("POST /crear - Ruta para crear usuario", () => {

    beforeEach(async () => {
        // Iniciar una conexión para la transacción
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // Realizar el rollback de la transacción
        await db.query("ROLLBACK")
    })



    it("Debería crear un Usuario correctamente", async () => {
        const nuevoUsuario = {
            "email": "hoalxd@prueba.com",
            "password": "laleyendacuenta"
        }

        const response = await request(app)
            .post("/user/crear")
            .set("Authorization", `Bearer ${token}`) // Aquí va el token
            .send(nuevoUsuario);

        expect(response.body).toEqual(
            expect.objectContaining({
                message: `Usuario hoalxd@prueba.com insertado con éxito`,
            }));
        expect(response.statusCode).toBe(201);
    })
})



describe("POST /login - Ruta para loguearse", () => {

    beforeEach(async () => {
        // Iniciar una conexión para la transacción
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // Realizar el rollback de la transacción
        await db.query("ROLLBACK")
    })



    it("Debería logearse correctamente", async () => {
        const nuevoUsuario = {
            "email": "admin.admin@example.com",
            "password": "admin123"
        }

        const response = await request(app)
            .post("/user/login")
            .set("Authorization", `Bearer ${token}`) // Aquí va el token
            .send(nuevoUsuario);

        expect(response.body).toEqual(
            expect.any(Object))
        expect(response.statusCode).toBe(201);
    })
})


describe("PUT /actualizar - Ruta para actualizar", () => {

    beforeEach(async () => {
        // Iniciar una conexión para la transacción
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // Realizar el rollback de la transacción
        await db.query("ROLLBACK")
    })



    it("Debería actualizar un Usuario correctamente", async () => {
        const nuevoUsuario = {
            "email": "rumba.correo@example.com",
            "rango": "empleado"
        }

        const response = await request(app)
            .put("/user/actualizar")
            .set("Authorization", `Bearer ${tokenAdmin}`) // Aquí va el token
            .send(nuevoUsuario);

        expect(response.body).toEqual(
            expect.objectContaining({
                message: "Rango actualizado con éxito",
                email: "rumba.correo@example.com",
                nuevoRango: "empleado"
            }))
        expect(response.statusCode).toBe(201);
    })
})