import {Router} from 'express';
import LocationService from '../services/location-service.js';
import Location from '../entities/location.js'
import ValidacionesHelper from '../helpers/ValidacionesHelper.js';
import AutorizationMiddleware from '../middlewares/authorization-middleware.js'
const router = Router();
const svc = new LocationService();
const mw = new AutorizationMiddleware();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAllAsync();

    if(returnArray == null){
        respuesta = res.status(500).send('Error interno.');
    }else{
        respuesta = res.status(200).json(returnArray);
    }

    return respuesta;
});
router.get('/:id', async (req, res) => {
    let respuesta;
    if(ValidacionesHelper.ValidaNumero(req.params.id)){
        respuesta = res.status(200).send("No se escribio un numero")
    }else{
        const returnArray = await svc.getByIdSync(req.params.id);
        if(returnArray.length > 0){
            respuesta = res.status(200).json(returnArray);
        }else if(returnArray.length == 0){
            respuesta = res.status(400).send("No hay ninguna ciudad con ese id")
        }else{
            respuesta = res.status(500).send('Error interno.');
        }
    }
    
})

router.get('/:id/', async (req, res) => {
    let respuesta;
    if(ValidacionesHelper.ValidaNumero(req.params.id)){
        respuesta = res.status(200).send("No se escribio un numero")
    }else{
        const returnArray = await svc.getByIdSync(req.params.id);
        if(returnArray.length > 0){
            respuesta = res.status(200).json(returnArray);
        }else if(returnArray.length == 0){
            respuesta = res.status(400).send("No hay ninguna ciudad con ese id")
        }else{
            respuesta = res.status(500).send('Error interno.');
        }
    }
    
})


export default router;