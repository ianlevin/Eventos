import UserRepository from '../repositories/user-repository.js';
import jwt from 'jsonwebtoken'
export default class UserService{
    getAllAsync = async () => {
        const repo = new Event_categoryRepository();
        let returnArray = await repo.getAllAsync();
        return returnArray;
    }
    verifyAsync = async (username, Password) => {
        
        const payload = {
            user: username,
            password: Password
        }
    
        const options = {
            expiresIn: '1h'
        }
        const token = jwt.sign(payload,"fidnaodo", options)

        return token;
    }

    getByIdAsync = async (id) => {
        const repo = new Event_categoryRepository();
        let returnArray = await repo.getByIdAsync(id);
        return returnArray;
    }
    createAsync = async (entity) => {
        const repo = new Event_categoryRepository();
        let returnArray = await repo.createAsync(entity);
        return returnArray;
    }
    updateAsync = async (entity) => {
        const repo = new Event_categoryRepository();
        const objeto = await repo.updateAsync(entity);
        return objeto;
    }
    deleteByIdAsync = async (id) => {
        const repo = new Event_categoryRepository();
        const objeto = await repo.deleteByIdAsync(id);
        return objeto;
    }
}