import { body, check, validationResult } from "express-validator";

// Middleware de validación para creación de venta
export const reqControlVenta = [
    // Validación para "ID_Cliente"
    body("ID_Cliente")
        .exists().withMessage("El ID del cliente es obligatorio")
        .isInt({ min: 1 }).withMessage("El ID del cliente debe ser un número entero positivo"),

    // Validación para "total"
    body("total")
        .exists().withMessage("El total es obligatorio")
        .isFloat({ gt: 0 }).withMessage("El total debe ser un número positivo"),
    // Validación para "total"
    body("id_vendedor")
        .exists().withMessage("El id_vendedor es obligatorio")
        .isInt({ gt: 0 }).withMessage("El id_vendedor debe ser un número entero positivo"),

    // Manejo de errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Middleware de validación para actualización de venta
export const reqControlUpdateVenta = [
    // Validación para "ID_Cliente" (opcional)
    body("ID_Cliente")
        .optional()
        .isInt({ min: 1 }).withMessage("El ID del cliente debe ser un número entero positivo"),

    // Validación para "total" (opcional)
    body("total")
        .optional()
        .isFloat({ gt: 0 }).withMessage("El total debe ser un número positivo"),

    // Validación para "fecha" (opcional)
    body("fecha")
        .optional()
        .isISO8601().withMessage("La fecha debe estar en formato válido (ISO 8601)"),

    body("id_vendedor")
        .optional()
        .isInt({ gt: 0 }).withMessage("El id_vendedor debe ser un número entero positivo"),
    check().custom((_, { req }) => {
        const { ID_Cliente, total, fecha, id_vendedor } = req.body
        if (!ID_Cliente && !total && !fecha && !id_vendedor) {
            throw new Error("Debe proporcionar al menos uno de los siguientes campos: ID_Cliente, total, fecha, id_vendedor");
        }
        return true
    }),

    // Manejo de errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
