
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { obtenerEmpresas, obtenerEmpresa, crearEmpresa, crearProfesional, putPerfilProfesional, getProfesional, deleteEstudio, deleteCertificacion, deleteIdioma, deleteExperiencia, putPerfilEmpresa, crearOferta, getOferta, getOfertas, getProfesionales, putOferta, getCualificacion, buscar, recuperarPass } from './actions';
import { login } from './actions'

const router = Router();

// signup route, creates a new user in the DB

//usuario
router.post('/recuperarPass', safe(recuperarPass))
//Empresa
router.get('/empresas', safe(obtenerEmpresas))
router.get('/empresa/:id', safe(obtenerEmpresa))
router.post('/empresa', safe(crearEmpresa))
router.put('/perfilEmpresa/:id', safe(putPerfilEmpresa))
//profesional
router.get('/profesionales', safe(getProfesionales))
router.get('/profesional/:id', safe(getProfesional))
router.post('/registroprofesional', safe(crearProfesional))
//cualificacion
router.get('/cualificacion', safe(getCualificacion))
//perfil profesional
router.put('/perfilProfesional/:id', safe(putPerfilProfesional))
//login
router.post('/login',safe(login))
//ofertas
router.put('/oferta/:id', safe(putOferta))
router.get('/oferta/:id', safe(getOferta))
router.get('/buscar/:consulta', safe(buscar))
//estudio
router.delete('/deleteEstudio/:id', safe(deleteEstudio));
//experiencia
router.delete('/deleteExperiencia/:id', safe(deleteExperiencia));
//certificacion
router.delete('/deleteCertificacion/:id', safe(deleteCertificacion));
//idioma
router.delete('/deleteIdioma/:id', safe(deleteIdioma));

export default router;
