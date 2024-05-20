import {Router} from 'express';
import EventService from './../services/event-service.js';
import Event from './../entities/events.js'
import ValidacionesHelper from '../helpers/ValidacionesHelper.js';
const router = Router();
const svc = new EventService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAsync(req.query.name, req.query.category, req.query.startdate, req.query.tag);

    if(returnArray == null){
        respuesta = res.status(500).send('Error interno.');
    }else{
        respuesta = res.status(200).json(returnArray);
    }

    return respuesta;
});

export default router;