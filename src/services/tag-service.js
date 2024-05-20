import TagRepository from '../repositories/tag-repository.js';

export default class TagService{
    getAllAsync = async () => {
        const repo = new TagRepository();
        let returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        const repo = new TagRepository();
        let returnArray = await repo.getByIdAsync(id);
        return returnArray;
    }

}