import { Router, Request, Response, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken'

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

//cambiar contraseña
router.put('/cambiarcontraseña',verifyToken, safe(actions.cambiarContraseña));
router.put('/cambiarPassRecuperacion',verifyToken, safe(actions.cambiarPassRecuperacion));
//perfil profesional

router.post('/perfil-profesional/estudio/:id', verifyToken, safe(actions.crearEstudio));
router.post('/perfil-profesional/experiencia/:id', verifyToken, safe(actions.crearExperiencia));
router.post('/perfil-profesional/certificacion/:id', verifyToken, safe(actions.crearCertificacion));
router.post('/perfil-profesional/idioma/:id', verifyToken, safe(actions.crearIdioma));

router.get('/perfil-profesional/postulaciones', verifyToken, safe(actions.postulacionesProfesional));
router.post('/perfil-profesional/postulaciones', verifyToken, safe(actions.postularProfesional));
router.put('/perfil-profesional/postulaciones', verifyToken, safe(actions.borrarPostulacion));

router.put('/perfil-profesional/', verifyToken, safe(actions.editarProfesional));
router.get('/perfil-profesional/', verifyToken, safe(actions.obtenerProfesionalLogeado));
router.put('/perfilProfesional/:id', verifyToken, safe(actions.putPerfilProfesional))

//EMPRESA
router.put('/empresa/', verifyToken, safe(actions.editarEmpresa))
router.get('/empresa/', verifyToken, safe(actions.obtenerMiEmpresa))
router.put('/perfilEmpresa/:id', verifyToken, safe(actions.putPerfilEmpresa))
//OFERTAS
router.get('/ofertas', verifyToken, safe(actions.getOfertas))
router.post('/oferta', verifyToken, safe(actions.crearOferta));
router.put('/oferta/:id', verifyToken, safe(actions.putOferta))

//estudio
router.delete('/deleteEstudio/:id', verifyToken, safe(actions.deleteEstudio));
//experiencia
router.delete('/deleteExperiencia/:id', verifyToken, safe(actions.deleteExperiencia));
//certificacion
router.delete('/deleteCertificacion/:id', verifyToken, safe(actions.deleteCertificacion));
//idioma
router.delete('/deleteIdioma/:id', verifyToken, safe(actions.deleteIdioma));

export default router;