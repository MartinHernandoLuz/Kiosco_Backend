import {createUserDB, loginUserDB} from '../model/userModel.js'

// función para crear el usuario
export const createUser = async (req, res) => {
    const data = req.body; // saca la data Email y contraseña
    try {
        // envía data a una función que está en userModel.js
        const result = await createUserDB(data); 
        res.status(201).json(result); // si funciona, envía un 201 CREATED
    } catch (error) {
        // si hay error, envía el que llega por error o 500 INTERNAL por default
        res.status(error.message || 500).json(error.message);
    }
}

// función para iniciar sesión
export const loginUser = async (req, res) => {
    const data = req.body; // saca la data Email y contraseña
    try {
        // envía data a una función que está en userModel.js
        const result = await loginUserDB(data);
        res.status(201).json(result); // si funciona, envía un 201 CREATED
    } catch (error) {
        // si hay error, envía el que llega por error o 500 INTERNAL por default
        res.status(error.status || 500).json(error.message);
    }
}