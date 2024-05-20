import ProvinceRepository from '../repositories/province-repository.js';

export default class ProvinceService{
    getAllSync = async () => {
        const repo = new ProvinceRepository();
        let returnArray = await repo.getAllSync();
        return returnArray;
    }
    
    getByIdSync = async (id) => {
        const repo = new ProvinceRepository();
        const objeto = await repo.getByIdSync(id);
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