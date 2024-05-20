import {Router} from 'express';
import Event_CategorieService from '../services/event_category-service.js';
import Event_categorie from '../entities/event_categories.js'
import ValidacionesHelper from '../helpers/ValidacionesHelper.js';
const router = Router();
const svc = new Event_CategorieService();

router.get('', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    let respuesta;
    if(ValidacionesHelper.ValidaNumero(req.params.id)){
        respuesta = res.status(200).send("No se escribio un numero")
    }else{
        const returnArray = await svc.getByIdAsync(req.params.id);
        if(returnArray.length > 0){
            respuesta = res.status(200).json(returnArray);
        }else if(returnArray.length == 0){
            respuesta = res.status(200).send("No hay ninguna categoria con ese id")
        }else{
            respuesta = res.status(500).send('Error interno.');
        }
    }
    
})

router.post('', async (req, res) => {
    let respuesta;
    let Provincia = new Province(0,req.body.name, req.body.full_name,req.body.latitude, req.body.longitude, req.body.display_order)
    const returnArray = await svc.CreateAsync(Provincia);
    if(returnArray == 1){
        respuesta = res.status(200).send('Se ha creado correctamente');
    }else{
        respuesta = res.status(500).send('Error interno.');
    }
})

router.put('', async (req, res) => {
    let respuesta;
    let event = new Province(req.body.id,req.body.name, req.body.full_name,req.body.latitude, req.body.longitude, req.body.display_order)
    const returnArray = await svc.UpdateAsync(Provincia);
    if(returnArray == 1){
        respuesta = res.status(200).send('Se ha cambiado correctamente');
    }else{
        respuesta = res.status(500).send('Error interno.');
    }
})

router.delete('/:id', async (req, res) => {
    let respuesta;
    const returnArray = await svc.DeleteByIdAsync(req.params.id);

    if(ValidacionesHelper.ValidaNumero(req.params.id)){
        respuesta = res.status(200).send("No se escribio un numero")
    }else{
        if(returnArray == 1){
            respuesta = res.status(200).send('Se ha eliminado correctamente');
        }else if(returnArray == 0){
            respuesta = res.status(200).send('No hay ninguna provincia con ese id');
        }else{
            respuesta = res.status(500).send('error interno');
        }
    }
    
})

export default router;