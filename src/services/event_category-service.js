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
}