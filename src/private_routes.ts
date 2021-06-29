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
router.get('/user', verifyToken, verifyAdmin, safe(actions.getUsers));
router.get('/user/:id', verifyToken, verifyAdmin, safe(actions.getUser));
router.post('/user', verifyToken, verifyAdmin, safe(actions.createUser));
router.put('/user', verifyToken, verifyAdmin, safe(actions.updateUser));
router.delete('/user/:id', verifyToken, verifyAdmin, safe(actions.deleteUser));

//Empresa
router.get('/empresa', verifyToken, verifyAdmin, safe(actions.getEmpresas));
router.get('/empresa/:RUT', verifyToken, safe(actions.getEmpresa));
router.post('/empresa', verifyToken, verifyAdmin, safe(actions.createEmpresa));
router.put('/empresa', verifyToken, safe(actions.updateEmpresa));
router.delete('/empresa/:RUT', verifyToken, verifyAdmin, safe(actions.deleteEmpresa));

//Persona
router.get('/persona', verifyToken, safe(actions.getPersonas));
router.get('/persona/:email', verifyToken, verifyAdmin, safe(actions.getPersona));
router.post('/persona', verifyToken, verifyAdmin, safe(actions.createPersona));
router.put('/persona', verifyToken, verifyAdmin, safe(actions.updatePersona));
router.delete('/persona/:id', verifyToken, verifyAdmin, safe(actions.deletePersona));

//Localidad
router.get('/localidad', verifyToken, safe(actions.getLocalidades));
router.get('/localidad/:id', verifyToken, safe(actions.getLocalidad));
router.post('/localidad', verifyToken, verifyAdmin, safe(actions.createLocalidad));
router.put('/localidad', verifyToken, verifyAdmin, safe(actions.updateLocalidad));
router.delete('/localidad/:id', verifyToken, verifyAdmin, safe(actions.deleteLocalidad));

//Departamento
router.get('/departamento', verifyToken, safe(actions.getDepartamentos));
router.get('/departamento/:id', verifyToken, safe(actions.getDepartamento));
router.post('/departamento', verifyToken, verifyAdmin, safe(actions.createDepartamento));
router.put('/departamento', verifyToken, verifyAdmin, safe(actions.updateDepartamento));
router.delete('/departamento/:id', verifyToken, verifyAdmin, safe(actions.deleteDepartamento));

//empresa_persona
router.get('/empresa_persona', verifyToken, safe(actions.getEmpresaPersonas));
router.get('/empresa_persona/:empresaId/:personaId', verifyToken, safe(actions.getEmpresaPersona));
router.post('/empresa_persona', verifyToken, verifyAdmin, safe(actions.createEmpresaPersona));
router.put('/empresa_persona', verifyToken, verifyAdmin, safe(actions.updateEmpresaPersona));
router.delete('/empresa_persona/:empresaId/:personaId', verifyToken, verifyAdmin, safe(actions.deleteEmpresaPersona));





export default router;