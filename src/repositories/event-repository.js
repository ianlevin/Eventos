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
            json_build_object(
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
            ) as event_location,
             json_build_object(
                'id', users.id,
                'first_name', users.first_name,
                'last_name', users.last_name,
                'username', users.username,
                'password', users.password
            )as creator_user,
             (
                select json_agg(json_build_object(tags.id, tags.name))
                from tags
                join event_tags on tags.id = event_tags.id_tag
            
                where event_tags.id = events.id
            )as tags,
            	json_build_object(
                'id', event_categories.id,
                'name', event_categories.name,
                'display_order', event_categories.display_order
            ) as event_category
            
            from events
            left join event_categories on events.id = event_categories.id
            left join event_tags on events.id = event_tags.id
            left join users on events.id = users.id
            left join event_locations on events.id = event_locations.id
            left join locations on event_locations.id = locations.id
            left join provinces on locations.id_province = provinces.id
            where events.id = $1`

            const values = [id]
            const result = await client.query(sql,values)
            await client.end()
            objeto = result.rows
        }catch (error){
            console.log(error)
        }
        return objeto;
    }

    createAsync = async (entity) => {
        let objeto = null
        const client = new Client(config)
        try{
            await client.connect()
            let sql = 'select max_capacity from event_locations where id = $1'
            let values = [entity.id_event_location]
            let result = await client.query(sql, values)

            if(parseInt(result.rows[0].max_capacity) < entity.max_assistance){
                return "max_assistance_error"
            }
            sql = 'INSERT into Events (name, description, id_event_category, id_event_location, start_date ,duration_in_minutes, price,enabled_for_enrollment,max_assistance,id_creator_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)'
            values = [entity.name, entity.description, entity.id_event_category ,entity.id_event_location, entity.start_date, entity.duration_in_minutes, entity.price, entity.enabled_for_enrollment,entity.max_assistance,entity.id_creator_user]

            result = await client.query(sql, values)
            await client.end()
            objeto = result.rowCount
        }catch (error){
            console.log(error)
        }
        return objeto;
    }

    updateAsync = async (entity) => {
        let objeto = 0
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'UPDATE events SET name = $1, description = $2, id_event_category = $3, id_event_location = $4, start_date = $5 ,duration_in_minutes = $6, price = $7,enabled_for_enrollment = $8,max_assistance = $9,id_creator_user = $10 where id = $11'
            const values = [entity.name, entity.description, entity.id_event_category,entity.id_event_location, entity.start_date, entity.duration_in_minutes, entity.price, entity.enabled_for_enrollment,entity.max_assistance,entity.id_creator_user,entity.id]

            const result = await client.query(sql, values)
            await client.end()
            objeto = result.rowCount
        }catch (error){
            console.log(error)
        }
        return objeto;
    }

    createEnrollmentAsync= async (entity) => {
        let objeto = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'INSERT INTO event_enrollments (id_event,id_user,description,registration_date_time,attended,observations,rating) VALUES ($1,$2,$3,$4,$5,$6,$7)'
            const values = [entity.id_event,entity.id_user,entity.description,entity.registration_date_time,entity.attended,entity.observations,entity.rating]
            const result = await client.query(sql, values)

            await client.end()
            objeto = result.rowCount
        }catch (error){
            console.log(error)
        }
        return objeto;
    }

    deleteEnrollmentAsync= async (id_event,id_user) => {
        let objeto = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = `DELETE FROM event_enrollments WHERE id_event = ${id_event} AND id_user = ${id_user}`
            const result = await client.query(sql)

            await client.end()
            objeto = result.rowCount
        }catch (error){
            console.log(error)
        }
        return objeto;
    }
}