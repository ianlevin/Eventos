import {Router} from 'express';
import EventService from './../services/event-service.js';
import Event from './../entities/events.js'
import Event_enrollment from './../entities/event_enrollments.js'
import ValidacionesHelper from '../helpers/ValidacionesHelper.js';
import AutorizationMiddleware from '../middlewares/authorization-middleware.js'
const router = Router();
const svc = new EventService();
const mw = new AutorizationMiddleware();

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

router.post('', async (req, res) => {
    let respuesta;
    if(ValidacionesHelper.ValidarMayorATresLetras(req.body.name) && ValidacionesHelper.ValidarMayorATresLetras(req.body.description) && req.body.price>=0 && req.body.duration_in_minutes>=0){
        let evento = new Event(0, req.body.name,req.body.description, req.body.id_event_category,req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, req.body.enables_for_enrollment,req.body.max_assistance,req.body.id_creator_user)
        const returnArray = await svc.createAsync(evento);
        if(returnArray == 'max_assistance_error'){
            respuesta = res.status(401).send('max_assistance es mayor que max_capacity del evento');
        }
        else if(returnArray == 1){
            respuesta = res.status(200).send('Se ha creado correctamente');
        }else{
            respuesta = res.status(500).send('Error interno.');
        }
    }else{
        respuesta = res.status(401).send("hay algun campo erroneo en la entrada de datos")
    }
    
})

router.post('/:id/enrollment', mw.desencriptation, async (req, res) => {
    let respuesta;
    let event_enrollment = new Event_enrollment(0,req.params.id,req.user.id,null,'2024-10-10'/** date(now)*/,false,null,null)
    const returnArray = await svc.createEnrollmentAsync(event_enrollment);
    if(returnArray == 1){
        respuesta = res.status(200).send('Se ha creado correctamente');
    }else{
        respuesta = res.status(500).send('Error interno.');
    }

})

router.delete('/:id/enrollment', mw.desencriptation, async (req, res) => {
    let respuesta;
    const returnArray = await svc.deleteEnrollmentAsync(req.params.id,req.user.id);
    if(returnArray == 1){
        respuesta = res.status(200).send('Se ha eliminado correctamente del evento');
    }else{
        respuesta = res.status(500).send('Error interno.');
    }

})
router.patch('/:id/enrollment/:rating', mw.desencriptation, async (req, res) => {
    let respuesta;
    if(ValidacionesHelper.ValidarHasta10(req.params.id) == false){
        return respuesta = res.status(400).send("el valor no esta entre 1 y 10")
    }
    const returnArray = await svc.updateEnrollmentAsync(req.params.id,req.user.id,req.params.rating,req.query.observations);
    if(returnArray == 1){
        respuesta = res.status(200).send('Se ha creado correctamente');
    }else{
        respuesta = res.status(500).send('Error interno.');
    }

})

router.put('', async (req, res) => {
    let respuesta;
    let evento = new Event(req.body.id,req.body.name, req.body.description, req.body.id_event_category,req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, req.body.enables_for_enrollment,req.body.max_assistance,req.body.id_creator_user)
    const returnArray = await svc.updateAsync(evento);
    if(returnArray == 1){
        respuesta = res.status(200).send('Se ha cambiado correctamente');
    }else{
        respuesta = res.status(500).send('Error interno.');
    }
})

export default router;