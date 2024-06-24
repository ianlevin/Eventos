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
            const sql = 'select * from locations where id_province = $1'
            const values = [id]

            const result = await client.query(sql, values)
            await client.end()
            objeto = result.rows
        }catch (error){
            console.log(error)
        }
        return objeto;
    }
    CreateAsync = async (entity) => {
        let objeto = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'INSERT into Provinces (name, full_name, latitude, longitude, display_order) VALUES ($1,$2,$3,$4,$5)'
            const values = [entity.name, entity.full_name, entity.latitude ,entity.longitude, entity.display_order]

            const result = await client.query(sql, values)
            await client.end()
            objeto = result.rowCount
        }catch (error){
            console.log(error)
        }
        return objeto;
    }
    UpdateAsync = async (entity) => {
        let objeto = 0
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'UPDATE Provinces SET name = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5 WHERE Id = $6'
            const values = [entity.name, entity.full_name, entity.latitude ,entity.longitude, entity.display_order, entity.id]

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
            let sql = 'DELETE FROM locations WHERE id_province = $1'
            let values = [id]
            let result = await client.query(sql, values)

            sql = 'DELETE FROM Provinces WHERE Id = $1'
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