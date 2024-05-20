import {Router} from 'express';
import TagService from './../services/tag-service.js';
import ValidacionesHelper from '../helpers/ValidacionesHelper.js';

const router = Router();
const svc = new TagService();

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
            respuesta = res.status(200).send("No hay ningun tag con ese id")
        }else{
            respuesta = res.status(500).send('Error interno.');
        }
    }
});

export default router;