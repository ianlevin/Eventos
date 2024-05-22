import config from '../configs/db-config.js';
import pkg from 'pg'
const {Client} = pkg 

export default class Event_tagRepository {
    getAllAsync = async () => {
        let returnArray = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM event_tags'
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
            const sql = 'SELECT * FROM event_locations WHERE Id = $1'
            const values = [id]

            const result = await client.query(sql, values)
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
            const sql = 'INSERT into event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES ($1,$2,$3,$4,$5,$6,$7)'
            const values = [entity.id_location, entity.name, entity.full_adress, entity.max_capacity, entity.latitude, entity.longitude, entity.id_creator_user]

            const result = await client.query(sql, values)
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
            const sql = 'UPDATE event_locations SET id_location = $1, name = $2, full_address = $3, max_capacity = $4, latitude = $5, longitude = $6, id_creator_user = $7 WHERE Id = $8'
            const values = [entity.id_location, entity.name, entity.full_address, entity.max_capacity, entity.latitude, entity.longitude, entity.id_creator_user, entity.id]
            
            const result = await client.query(sql, values)
            await client.end()
            objeto = result.rowCount
        }catch (error){
            console.log(error)
        }
        return objeto;
    }

    deleteByIdAsync = async (id) => {
        let objeto = null
        const client = new Client(config)
        try{
            await client.connect()
            let sql = 'DELETE FROM events WHERE id_event_locatios = $1'
            let values = [id]
            let result = await client.query(sql, values)

            sql = 'DELETE FROM event_locations WHERE Id = $1'
            values = [id]
            result = await client.query(sql, values)
            await client.end()

            objeto = result.rowCount
        }catch (error){
            console.log(error)
        }
        return objeto;
    }

}