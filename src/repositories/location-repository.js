import config from './../configs/db-config.js';
import pkg from 'pg'
const {Client} = pkg 

export default class ProvinceRepository {
    getAllAsync = async () => {
        let returnArray = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM Locations limit 10'
            const result = await client.query(sql)
            await client.end()
            returnArray = result.rows
        } catch (error){
            console.log(error)
        }
        return returnArray;
    }
    getByIdSync = async (id) => {
        let objeto = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM Locations WHERE Id = $1'
            const values = [id]

            const result = await client.query(sql, values)
            await client.end()
            objeto = result.rows
        }catch (error){
            console.log(error)
        }
        return objeto;
    }
    getLocationsByIdSync = async (id) => {
        let objeto = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'select * from event_locations where id_location = $1'
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