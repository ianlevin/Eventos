import jwt from 'jsonwebtoken'
import UserRepository from '../repositories/user-repository.js';

export default class authorization{
    desencriptation = async (req, res, next) => {
            let respuesta;
        try{
            
            const substring = (req.headers.authorization).slice(7);
            let payload = null;
            payload = await jwt.verify(substring,"SECRET_KEY")
            req.user = payload
            next();
        }catch(e){
            console.log(e)
            respuesta = res.status(401).send("token invalido")
            return respuesta;
        }
        
    }
}
    

