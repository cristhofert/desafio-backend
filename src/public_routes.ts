
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { obtenerEmpresas, obtenerEmpresa, crearEmpresa, crearProfesional, cambiarContraseña } from './actions';
import { login } from './actions'


const router = Router();

// signup route, creates a new user in the DB

//Empresa
router.get('/empresas', safe(obtenerEmpresas))
router.get('/empresa/:id', safe(obtenerEmpresa))
router.post('/empresa', safe(crearEmpresa))
router.post('/registoprofesional', safe(crearProfesional))
router.put('/cambiarcontraseña', safe(cambiarContraseña))
router.post('/login',safe(login))
export default router;
