import {createUserDB, loginUserDB} from '../model/userModel.js'

export const createUser = async (req, res) => {
    const data = req.body;
    try {
        const result = await createUserDB(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const loginUser = async (req, res) => {
    const data = req.body;
    try {
        const result = await loginUserDB(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.status || 500).json(error.message);
    }
}