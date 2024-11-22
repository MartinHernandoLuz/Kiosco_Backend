//RUTA EN EL app.js
app.use("/detalle_venta", detalleVentaRoutes)


//RUTAS EN LA CARPETA ROUTER
// ruta para obtener todos los detalle venta
router.get("/", getAllDetalleVentas)

// ruta para obtener todos los detalles de una venta por el id de la tabla venta
router.get("/id", /*handler*/)

//ruta para obtener el detalle de las ventas por productos
router.get("/get-producto-nombre",/*handler*/)

/*función que obtiene los detalles de ventas en determinadas fechas*/
router.get("/get-fecha-d-ventas", /*handler*/)

//obtiene los productos que más se vendieron en determinadas fechas
router.get("/get-fecha-d-ventas_productos-mas-vendidos", /*handler*/)

/*obtiene el precio unitario:que es el precio del proveedor y el precio con el que vende el kiosquero en determinadas fechas*/
router.get("/get-fecha-d-ventas/get-precio-unitario_precio",/*handler*/)



//LA CONSULTA A LA BASE DE DATOS *fijate si te sirve* ESTO VA EN EL MODEL

const sentence = `
    SELECT 
        dv.id_detalle,
        dv.cantidad,
        dv.precio_unitario,
        dv.subtotal,
        p.nombre AS producto_nombre,
        p.precio AS producto_precio,
        p.stock AS producto_stock,
        c.nombre AS categoria_nombre,
        v.fecha AS venta_fecha,
        v.total AS venta_total,
        cl.dni AS cliente_dni,
        cl.nombre AS cliente_nombre,
        cl.apellido AS cliente_apellido,
        cl.telefono AS cliente_telefono,
        cl.mail AS cliente_mail
    FROM 
        DETALLE_VENTA dv
    JOIN 
        PRODUCTO p ON dv.id_producto = p.id_producto
    JOIN 
        CATEGORIA c ON p.id_categoria = c.id_categoria
    JOIN 
        VENTA v ON dv.id_venta = v.id_venta
    JOIN 
        CLIENTE cl ON v.id_cliente = cl.id_cliente;
  `;