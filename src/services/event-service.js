import EventRepository from '../repositories/event-repository.js';

export default class EventService{
    getAsync = async (name, category, startdate, tag) => {
        const repo = new EventRepository();
        var stringsql = ''
        if(tag != null){
            stringsql += `inner join event_tags on events.id = event_tags.id_event
            inner join tags on event_tags.id_tag = tags.id
            WHERE tags.name = '${tag}' AND `
        }else{
            stringsql += 'WHERE '
        }
        if(name != null){
            stringsql += `events.name = '${name}' AND `
        }
        if(category != null){
            stringsql += `event_categories.name = '${category}' AND `
        }
        if(startdate != null){
            stringsql += `start_date = '${startdate}' AND `
        }
        
        let sqlfinal = stringsql.substring(0,((stringsql.length)-5))
        let returnArray = await repo.getAsync(sqlfinal);
        return returnArray;
    }

    getByIdAsync = async (id) => {
        const repo = new EventRepository();
        const objeto = await repo.getByIdAsync(id);
        return objeto;
    }

    createAsync = async (entity) => {
        const repo = new EventRepository();
        const objeto = await repo.createAsync(entity);
        return objeto;
    }
    updateAsync = async (entity) => {
        const repo = new EventRepository();
        const objeto = await repo.UpdateAsync(entity);
        return objeto;
    }
    createEnrollmentAsync = async (entity) =>{
        const repo = new EventRepository();
        const objeto = await repo.createEnrollmentAsync(entity);
        return objeto;
    }
    deleteEnrollmentAsync = async (id_event,id_user) =>{
        const repo = new EventRepository();
        const objeto = await repo.deleteEnrollmentAsync(id_event,id_user);
        return objeto;
    }
}