import EventRepository from '../repositories/event-repository.js';

export default class EventService{
    getAsync = async (name, category, startdate, tag) => {
        const repo = new EventRepository();
        var stringsql = 'WHERE '
        if(name != null){
            stringsql += `name = '${name}' AND`
        }
        else if(category != null){
            stringsql += `id_event_category = ${category} AND`
        }else if(startdate != null){
            stringsql += `start_date = '${startdate}' AND`
        }else if(tag != null){
            stringsql += `tag = '${name}' AND`
        }
        let sqlfinal = stringsql.substring(0,((stringsql.length)-4))
        let returnArray = await repo.getAsync(sqlfinal);
        return returnArray;
    }
}