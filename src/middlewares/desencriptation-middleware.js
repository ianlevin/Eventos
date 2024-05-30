import jwt from 'jsonwebtoken'

const desencriptation = async function (req,res,next) {
    let payload;
    try{
        payload = await jwt.verify(token,key)
    }catch(e){
        console.log(e)
    }
    return payload;
    re
}
export default desencriptation;