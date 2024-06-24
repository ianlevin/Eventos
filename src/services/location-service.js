import LocationRepository from '../repositories/location-repository.js';

export default class ProvinceService{
    getAllAsync = async () => {
        const repo = new LocationRepository();
        let returnArray = await repo.getAllAsync();
        return returnArray;
    }
    
    getByIdSync = async (id) => {
        const repo = new LocationRepository();
        const objeto = await repo.getByIdSync(id);
        return objeto;
    }
    getLocationsByIdSync = async (id) => {
        const repo = new ProvinceRepository();
        const objeto = await repo.getLocationsByIdSync(id);
        return objeto;
    }
    CreateAsync = async (entity) => {
        const repo = new ProvinceRepository();
        const objeto = await repo.CreateAsync(entity);
        return objeto;
    }
    UpdateAsync = async (entity) => {
        const repo = new ProvinceRepository();
        const objeto = await repo.UpdateAsync(entity);
        return objeto;
    }
    deleteByIdAsync = async (id) => {
        const repo = new ProvinceRepository();
        const objeto = await repo.deleteByIdAsync(id);
        return objeto;
    }
}