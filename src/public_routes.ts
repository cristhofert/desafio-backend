
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { obtenerEmpresas, obtenerEmpresa, crearEmpresa, crearProfesional, putPerfilProfesional, getProfesional, deleteEstudio, deleteCertificacion, deleteIdioma, deleteExperiencia, putPerfilEmpresa, crearOferta, getOferta, getOfertas } from './actions';
import { login } from './actions'

const router = Router();

// signup route, creates a new user in the DB

//Empresa
// GET
router.get('/empresas', safe(obtenerEmpresas))
router.get('/empresa/:id', safe(obtenerEmpresa))
router.get('/profesional/:id', safe(getProfesional))
router.get('/oferta/:id', safe(getOferta))
router.get('/oferta', safe(getOfertas))
// POST
router.post('/empresa', safe(crearEmpresa))
router.post('/registoprofesional', safe(crearProfesional))
router.post('/login',safe(login))
// PUT
router.put('/perfilProfesional/:id', safe(putPerfilProfesional))
router.put('/perfilEmpresa/:id', safe(putPerfilEmpresa))
// DELETE
router.delete('/deleteEstudio/:id', safe(deleteEstudio));
router.delete('/deleteExperiencia/:id', safe(deleteExperiencia));
router.delete('/deleteCertificacion/:id', safe(deleteCertificacion));
router.delete('/deleteIdioma/:id', safe(deleteIdioma));
export default router;
