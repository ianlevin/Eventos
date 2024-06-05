import jwt from 'jsonwebtoken'
import UserRepository from '../repositories/user-repository.js';

export default class authorization{
    desencriptation = async (req, res, next) => {
        const substring = (req.headers.authorization).slice(7);
        let payload;
        try{
            payload = await jwt.verify(substring,"SECRET_KEY")
        }catch(e){
            console.log(e)
            return res.status().send("token invalido")
        }
        req.user = payload
        next();
        
    }
}
    

