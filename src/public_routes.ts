
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';

const router = Router();

// signup route, creates a new user in the DB
//Users
router.get('/user', safe(actions.getUsers));
router.get('/user/:id', safe(actions.getUser));
router.post('/user', safe(actions.createUser));
router.put('/user', safe(actions.updateUser));
router.delete('/user/:id', safe(actions.deleteUser));

//Empresa
router.get('/empresa', safe(actions.getEmpresas));
router.get('/empresa/:RUT', safe(actions.getEmpresa));
router.post('/empresa', safe(actions.createEmpresa));
router.put('/empresa', safe(actions.updateEmpresa));
router.delete('/empresa/:RUT', safe(actions.deleteEmpresa));

//Persona
router.get('/persona', safe(actions.getPersonas));
router.get('/persona/:email', safe(actions.getPersona));
router.post('/persona', safe(actions.createPersona));
router.put('/persona', safe(actions.updatePersona));
router.delete('/persona/:id', safe(actions.deletePersona));

//Localidad
router.get('/localidad', safe(actions.getLocalidades));
router.get('/localidad/:id', safe(actions.getLocalidad));
router.post('/localidad', safe(actions.createLocalidad));
router.put('/localidad', safe(actions.updateLocalidad));
router.delete('/localidad/:id', safe(actions.deleteLocalidad));

//Departamento
router.get('/departamento', safe(actions.getDepartamentos));
router.get('/departamento/:id', safe(actions.getDepartamento));
router.post('/departamento', safe(actions.createDepartamento));
router.put('/departamento', safe(actions.updateDepartamento));
router.delete('/departamento/:id', safe(actions.deleteDepartamento));

//empresa_persona
router.get('/empresa_persona', safe(actions.getEmpresaPersonas));
router.get('/empresa_persona/:empresaId/:personaId', safe(actions.getEmpresaPersona));
router.post('/empresa_persona', safe(actions.createEmpresaPersona));
router.put('/empresa_persona', safe(actions.updateEmpresaPersona));
router.delete('/empresa_persona/:empresaId/:personaId', safe(actions.deleteEmpresaPersona));

export default router;
