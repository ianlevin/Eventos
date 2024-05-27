import config from './../configs/db-config.js';
import pkg from 'pg'
const {Client} = pkg 

export default class EventRepository{
    getAsync = async (stringsql) =>{
        let returnArray = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = `SELECT * FROM events ${stringsql}`
            console.log(sql)
            const result = await client.query(sql)
            await client.end()
            returnArray = result.rows
        } catch (error){
            console.log(error)
        }
        return returnArray;
    }

    getByIdAsync = async (id) => {
        let objeto = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = `select events.id, 
            events.name, 
            events.description, 
            events.id_event_category, 
            events.id_event_location,
            events.start_date, 
            events.duration_in_minutes, 
            events.price, 
            events.enabled_for_enrollment, 
            events.max_assistance, 
            events.id_creator_user,
            'event_location', json_build_object(
                'id', event_locations.id,
                'id_location', event_locations.id_location,
                'name', event_locations.name,
                'full_address', event_locations.full_address,
                'max_capacity', event_locations.max_capacity,
                'latitude', event_locations.latitude,
                'longitude', event_locations.longitude,
                'id_creator_user', event_locations.id_creator_user,
                'location', json_build_object(
                    'id', locations.id,
                    'name', locations.name,
                    'id_province', locations,
                    'latitude', locations.latitude,
                    'longitude', locations.longitude,
                    'province', json_build_object(
                        'id', provinces.id,
                        'name', provinces.name,
                        'full_name', provinces.full_name,
                        'latitude', provinces.latitude,
                        'longitude', provinces.longitude,
                        'display_order', provinces.display_order
                    )
                )
            )
            from events
            inner join event_locations on events.id = event_locations.id
            inner join locations on event_locations.id = locations.id
            inner join provinces on locations.id_province = provinces.id`


            const values = [id]

            const result = await client.query(sql, values)
            await client.end()
            objeto = result.rows
        }catch (error){
            console.log(error)
        }
        return objeto;
    }
}