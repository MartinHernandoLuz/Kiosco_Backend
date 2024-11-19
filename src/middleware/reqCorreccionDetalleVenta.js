import { body, validationResult } from "express-validator";

export const reqControlDetalleVenta = [
  body("ID_Venta").isInt({ min: 1 }).withMessage("El ID_Venta debe ser un entero positivo"),
  body("ID_Producto").isInt({ min: 1 }).withMessage("El ID_Producto debe ser un entero positivo"),
  body("cantidad").isInt({ min: 1 }).withMessage("La cantidad debe ser un entero positivo"),
  body("precio_unitario").isFloat({ gt: 0 }).withMessage("El precio_unitario debe ser un número positivo"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const reqControlUpdateDetalleVenta = [
  body("cantidad").optional().isInt({ min: 1 }).withMessage("La cantidad debe ser un entero positivo"),
  body("precio_unitario").optional().isFloat({ gt: 0 }).withMessage("El precio_unitario debe ser un número positivo"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
