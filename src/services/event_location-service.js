import Event_categoryRepository from '../repositories/event_category-repository.js';

export default class Event_categoryService{
    getAllAsync = async () => {
        const repo = new Event_categoryRepository();
        let returnArray = await repo.getAllAsync();
        return returnArray;
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