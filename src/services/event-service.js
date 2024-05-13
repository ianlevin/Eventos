import EventRepository from '../repositories/event-repository.js';

export default class EventService{
    getAsync = async (name, category, startdate, tag) => {
        const repo = new EventRepository();
        var stringsql = 'WHERE '
        if(name != null){
            stringsql += `name = '${name}' AND `
        }
        if(category != null){
            console.log("llego")
            stringsql += `id_event_category = ${category} AND `
        }
        if(startdate != null){
            stringsql += `start_date = '${startdate}' AND `
        }
        if(tag != null){
            stringsql += `tag = '${name}' AND `
        }
        let sqlfinal = stringsql.substring(0,((stringsql.length)-5))
        let returnArray = await repo.getAsync(sqlfinal);
        return returnArray;
    }
}