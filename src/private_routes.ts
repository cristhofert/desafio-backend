import { Router, Request, Response, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken'
import { Users } from './entities/Users';

// declare a new router to include all the endpoints
const router = Router();

//middleware de verificación
const verifyToken= (req: Request,res:Response, next:NextFunction) =>{
    //headers con el token
    const token = req.header('Authorization');
    if(!token) return res.status(400).json('ACCESS DENIED');

    const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
    req.user = decoded;
    
    next()
}

interface IToken {
    user: Users,
    iat: number,
    exp: number
}

const verifyAdmin = (req: Request,res:Response, next:NextFunction) =>{
    const token = req.user as IToken;
    if(token.user.is_admin)
    next()
    else return res.status(400).json('El usuario no es Admin');
}

//Users
router.get('/user', safe(actions.getUsers));
router.get('/user/:username', safe(actions.getUser));
router.post('/user', safe(actions.createUser));
router.put('/user', safe(actions.updateUser));
router.delete('/user/:id', safe(actions.deleteUser));
router.post('/user/empresa/:RUT', verifyToken, safe(actions.asignarEmpresaAlUsuario))

//Empresa
router.get('/empresa', safe(actions.getEmpresas));
router.get('/empresa/:RUT', safe(actions.getEmpresa));
router.post('/empresa', safe(actions.createEmpresa));
router.put('/empresa', safe(actions.updateEmpresa));
router.delete('/empresa/:RUT', safe(actions.deleteEmpresa));
//mi_empresa
router.get('/mi_empresa/',verifyToken, safe(actions.getMIEmpresa));
router.put('/mi_empresa', verifyToken, safe(actions.updateMiEmpresa));
router.get('/asociados', verifyToken, safe(actions.getMiAsociados));
router.post('/asociados/nuevo', verifyToken, safe(actions.createAsociadoNuevo));
//Persona
router.get('/persona', safe(actions.getPersonas));
router.get('/persona/:email', safe(actions.getPersona));
router.post('/persona', safe(actions.createPersona));
router.put('/persona', safe(actions.updatePersona));
router.delete('/persona/:id', safe(actions.deletePersona));

//Localidad
router.get('/localidad', safe(actions.getLocalidades));
router.get('/localidad/:id', safe(actions.getLocalidad));
router.post('/localidad/:id', safe(actions.createLocalidad));
router.put('/localidad/:id', safe(actions.updateLocalidad));
router.delete('/localidad/:id', safe(actions.deleteLocalidad));

//Departamento
router.get('/departamento', safe(actions.getDepartamentos));
router.get('/departamento/:id', safe(actions.getDepartamento));
router.post('/departamento', safe(actions.createDepartamento));
router.put('/departamento', safe(actions.updateDepartamento));
router.delete('/departamento/:id', safe(actions.deleteDepartamento));

//empresa_persona
router.get('/empresa_persona/:empresaId', safe(actions.getEmpresasPersonas));
router.get('/empresa_persona', safe(actions.getEmpresaPersonas));
router.get('/empresa_persona/:empresaId/:personaId', safe(actions.getEmpresaPersona));
router.post('/empresa_persona', safe(actions.createEmpresaPersona));
router.put('/empresa_persona', safe(actions.updateEmpresaPersona));
router.delete('/empresa_persona/:empresaId/:personaId', safe(actions.deleteEmpresaPersona));

//localidades
router.get('/departamento/:id/localidades', safe(actions.getLocalidadesDeDepartamento));




export default router;