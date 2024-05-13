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
}