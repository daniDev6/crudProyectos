import { Router } from "express";
import{ getProyectByUserId,getProyectos, addProyecto,addProyects, updateProyecto, getByIdProyecto, deleteProyecto } from "../controllers/proyectos.controllers.js";
const router=Router();

router.get('/proyectos',getProyectos);
router.post('/proyecto',addProyecto);
router.post('/proyectos',addProyects);
router.put('/proyecto/:id',updateProyecto);
router.get('/proyecto/:id',getByIdProyecto);
router.delete('/proyecto/:id',deleteProyecto);

router.get('/proyect/:idUser',getProyectByUserId)

export default router






















