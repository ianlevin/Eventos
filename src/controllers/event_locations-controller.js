import {Router} from 'express';
import Event_LocationService from '../services/event_location-service.js';
import Event_location from '../entities/event_location.js'
import ValidacionesHelper from '../helpers/ValidacionesHelper.js';
import AutorizationMiddleware from '../middlewares/authorization-middleware.js'
const router = Router();
const svc = new Event_LocationService();
const mw = new AutorizationMiddleware();

router.get('',mw.desencriptation, async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAllAsync();
    if (returnArray != null){
        respuesta = res.status(200).send(returnArray);
    }
    else {
        respuesta = res.status(500).send('Error interno.');
    }
    return respuesta;
});

router.get('/:id',mw.desencriptation, async (req, res) => {
    let respuesta;
    if(ValidacionesHelper.ValidaNumero(req.params.id)){
        respuesta = res.status(200).send("No se escribio un numero")
    }else{
        const returnArray = await svc.getByIdAsync(req.params.id);
        if(returnArray.length > 0){
            respuesta = res.status(200).json(returnArray);
        }else if(returnArray.length == 0){
            respuesta = res.status(404).send("No hay ninguna localidad de evento con ese id")
        }else{
            respuesta = res.status(500).send('Error interno.');
        }
    }
    
})

router.post('',mw.desencriptation, async (req, res) => {
    let respuesta;
    let event_location = new Event_location(0,req.body.id_location,req.body.name,req.body.full_address,req.body.max_capacity,req.body.latitude,req.body.longitude,req.body.id_creator_user)
    const returnArray = await svc.createAsync(event_location);
    if(returnArray == 1){
        respuesta = res.status(200).send('Se ha creado correctamente');
    }else{
        respuesta = res.status(500).send('Error interno.');
    }
})

router.put('',mw.desencriptation, async (req, res) => {
    let respuesta;

    let event_location = new Event_location(req.body.id,req.body.id_location,req.body.name,req.body.full_adress,req.body.max_capacity,req.body.latitude,req.body.longitude,req.body.id_creator_user)
    const returnArray = await svc.updateAsync(event_location);
    if(returnArray == 1){
        respuesta = res.status(200).send('Se ha cambiado correctamente');
    }else{
        respuesta = res.status(500).send('Error interno.');
    }
})

router.delete('/:id',mw.desencriptation, async (req, res) => {
    let respuesta;
    const returnArray = await svc.deleteByIdAsync(req.params.id);

    if(ValidacionesHelper.ValidaNumero(req.params.id)){
        respuesta = res.status(200).send("No se escribio un numero")
    }else{
        if(returnArray == 1){
            respuesta = res.status(200).send('Se ha eliminado correctamente');
        }else if(returnArray == 0){
            respuesta = res.status(404).send('No hay ninguna ubicacion de evento con ese id');
        }else{
            respuesta = res.status(500).send('error interno');
        }
    }
    
})

export default router;