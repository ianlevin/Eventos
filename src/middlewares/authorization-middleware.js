import jwt from 'jsonwebtoken'
import UserRepository from '../repositories/user-repository.js';

export default class authorization{
    desencriptation = async (req, res, next) => {
        let respuesta;
        const substring = (req.headers.authorization).slice(7);
        let payload = null;
        try{
            payload = await jwt.verify(substring,"SECRET_KEY")
        }catch(e){
            console.log(e)
            respuesta = res.status(401).send("token invalido")
        }

        if(payload != null){
            req.user = payload
            next();
        }else{
            return respuesta;
        }
        
        
    }
}
    

