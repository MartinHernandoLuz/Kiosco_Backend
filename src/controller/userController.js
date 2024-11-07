import {create} from '../model/userModel.js'

export const create = async (req, res) => {
    const data = req.body;
    try {
        const result = await create(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
}