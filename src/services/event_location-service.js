import Event_locationRepository from '../repositories/event_location-repository.js';

export default class Event_locationService{
    getAllAsync = async () => {
        const repo = new Event_locationRepository();
        let returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        const repo = new Event_locationRepository();
        let returnArray = await repo.getByIdAsync(id);
        return returnArray;
    }
    createAsync = async (entity) => {
        const repo = new Event_locationRepository();
        let returnArray = await repo.createAsync(entity);
        return returnArray;
    }
    updateAsync = async (entity) => {
        const repo = new Event_locationRepository();
        const objeto = await repo.updateAsync(entity);
        return objeto;
    }
    deleteByIdAsync = async (id) => {
        const repo = new Event_categoryRepository();
        const objeto = await repo.deleteByIdAsync(id);
        return objeto;
    }
}