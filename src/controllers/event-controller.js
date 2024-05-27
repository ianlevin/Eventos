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

router.get('/:id', async (req, res) => {
    let respuesta;
    if(ValidacionesHelper.ValidaNumero(req.params.id)){
        respuesta = res.status(200).send("No se escribio un numero")
    }else{
        const returnArray = await svc.getByIdAsync(req.params.id);
        if(returnArray != null){
            respuesta = res.status(200).json(returnArray);
        }else if(returnArray == null){
            respuesta = res.status(200).send("No hay ningun evento con ese id")
        }else{
            respuesta = res.status(500).send('Error interno.');
        }
    }
    
})

router.put('', async (req, res) => {
    let respuesta;
    let evento = new Event(req.body.id,req.body.name, req.body.description, req.body.id_event_category,req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, req.body.enables_for_enrollment,req.body.max_assistance,req.body.id_creator_user)
    const returnArray = await svc.UpdateAsync(evento);
    if(returnArray == 1){
        respuesta = res.status(200).send('Se ha cambiado correctamente');
    }else{
        respuesta = res.status(500).send('Error interno.');
    }
})

export default router;