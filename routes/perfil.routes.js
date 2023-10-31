import { Router } from "express";
import { getPerfiles, addPerfil, updatePerfil, getByIdPerfil, deletePerfil } from "../controllers/perfil.controllers.js";
const router=Router();

router.get('/perfiles',getPerfiles);
router.post('/perfil',addPerfil);
router.put('/perfil/:id',updatePerfil);
router.get('/perfil/:id',getByIdPerfil);
router.delete('/perfil/:id',deletePerfil);
//
export default router