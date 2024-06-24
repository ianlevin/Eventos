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
        const repo = new LocationRepository();
        const objeto = await repo.getLocationsByIdSync(id);
        return objeto;
    }
    
}