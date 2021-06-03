import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Empresa } from './entities/Empresa'
import { RegistroProfesional } from './entities/RegistroProfesional'
import jwt from 'jsonwebtoken'
import { PerfilProfesional } from './entities/PerfilProfesional'
import { Estudio } from './entities/Estudio'
import { Experiencia } from './entities/Experiencia'
import { Certificacion } from './entities/Certificacion'
import { Idioma } from './entities/Idioma'

interface IToken {
    user: RegistroProfesional | Empresa,
    iat: number,
    exp: number
}

export const obtenerEmpresas = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Empresa).find();
    return res.json(users);
}

export const obtenerEmpresa = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Empresa).findOne(req.params.id);
    return res.json(users);
}

export const crearEmpresa = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.email) throw new Exception("Por favor, provee un email")
    if (!req.body.contrasenna) throw new Exception("Por favor, provee una contraseña")
    if (!req.body.nombre) throw new Exception("Por favor, provee un nombre")
    if (!req.body.icono) throw new Exception("Por favor, provee un icono")
    if (!req.body.descripcion) throw new Exception("Por favor, provee una descripcion")
    if (!req.body.departamento) throw new Exception("Por favor, provee un departamento")
    if (!req.body.direccion) throw new Exception("Por favor, provee una direccion")
    if (!req.body.sitio_web) throw new Exception("Por favor, provee un sitio_web")
    if (!req.body.comentarios) throw new Exception("Por favor, provee un comentarios")
    if (!req.body.twitter) throw new Exception("Por favor, provee una cuenta de twitter")
    if (!req.body.facebook) throw new Exception("Por favor, provee una cuenta de facebook")
    if (!req.body.linkedin) throw new Exception("Por favor, provee una cuenta de linkedin")
    if (!req.body.github) throw new Exception("Por favor, provee una cuenta de github")
    const profecional = await getRepository(RegistroProfesional).findOne({ email: req.body.email })
    if (profecional) throw new Exception("Ya existe un profecional con ese email")

    const nuevaEmpresa = getRepository(Empresa).create(req.body);
    const results = await getRepository(Empresa).save(nuevaEmpresa);
    return res.json(results);
}

export const crearProfesional = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.email) throw new Exception("Por favor, provee una email")
    if (!req.body.contrasenna) throw new Exception("Por favor, provee una contraseña")

    const empresa = await getRepository(Empresa).findOne({ email: req.body.email })
    if (empresa) throw new Exception("Ya existe un empresa con ese email")

    const perfilNuevo = getRepository(PerfilProfesional).create(
        {
            nombre: "",
            apellido: "",
            descripcion: "",
            facebook: "",
            github: "",
            linkedin: "",
            twitter: ""
        }
    );
    const results_perfil = await getRepository(PerfilProfesional).save(perfilNuevo);

    const nuevaProfesional = getRepository(RegistroProfesional).create({ ...req.body, perfil: perfilNuevo });
    const results = await getRepository(RegistroProfesional).save(nuevaProfesional);
    return res.json({ results_perfil, results });
}

export const cambiarContraseña = async (req: Request, res: Response): Promise<Response> => {
    const token = req.user as IToken
    const tipo = "profesional"//cambiar a req.user.tipo
    let usuario

    if (!req.body.contrasennaVieja) throw new Exception("Por favor, provee la contraseña vieja")
    if (!req.body.contrasennaNueva) throw new Exception("Por favor, provee una nueva contraseña")
  
    if (tipo == "profesional") {
        usuario = await getRepository(RegistroProfesional).findOne({ email: token.user.email });
        if (!usuario) throw new Exception("El profesional no existe")
    }
    else {
        usuario = await getRepository(Empresa).findOne({ email: token.user.email });
        if (!usuario) throw new Exception("El empresa no existe")
    }

    if (req.body.contrasennaVieja != usuario.contrasenna) throw new Exception("Contraseña incorrecta")
    usuario.contrasenna = req.body.contrasennaNueva

    let results
    if (tipo == "profesional") 
        results = await getRepository(RegistroProfesional).save(usuario);
    else 
        results = await getRepository(Empresa).save(usuario);


    return res.json(results);
}

//controlador para el logueo
export const login = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.email) throw new Exception("Por favor, especifique un correo en el cuerpo de su solicitud", 400)
    if (!req.body.contrasenna) throw new Exception("Por favor, especifique una contraseña en el cuerpo de su solicitud", 400)

    const profesionalRepo = getRepository(RegistroProfesional)
    const empresaRepo = getRepository(Empresa)

    // We need to validate that a user with this email and password exists in the DB
    const profesional = await profesionalRepo.findOne({ where: { email: req.body.email, contrasenna: req.body.contrasenna } })
    let user;
    let tipo;
    if (!profesional) {
        const empresa = await empresaRepo.findOne({ where: { email: req.body.email, contrasenna: req.body.contrasenna } })
        if (!empresa) throw new Exception("Email o contraseña inválido", 401)
        user = empresa;
        tipo = "empresa"
    }
    else {
        user = profesional;
        tipo = "profesional"
    }


    // this is the most important line in this function, it create a JWT token
    const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 24 * 60 * 60 });

    // return the user and the recently created token to the client
    return res.json({ user: {...user, tipo}, token });
}

export const putPerfilProfesional = async (req: Request, res: Response): Promise<Response> => {
    const profesional = await getRepository(PerfilProfesional).findOne(req.params.id);
    if (!profesional) throw new Exception("No existe", 400)
    PerfilProfesional.merge(profesional, req.body);
    const results = await PerfilProfesional.save(profesional);
    return res.send(results);
}

export const getProfesional = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(PerfilProfesional).findOne({ relations: ["estudios","experiencias", "certificaciones", "idiomas"], where: {id: req.params.id}});
    return res.json(users);
}

export const deleteEstudio = async (req: Request, res: Response): Promise<Response> => {
    const estudioRepo = getRepository(Estudio)
    const estudio = await estudioRepo.findOne({ relations: ["perfilProfesional"], where: { id: req.params.id } })
    if (!estudio) throw new Exception("El estudio no existe")
    
    const results = await estudioRepo.delete(estudio);
    return res.json(results)
}

export const deleteExperiencia = async (req: Request, res: Response): Promise<Response> => {
    const experienciaRepo = getRepository(Experiencia)
    const experiencia = await experienciaRepo.findOne({ relations: ["perfilProfesional"], where: { id: req.params.id } })
    if (!experiencia) throw new Exception("La experiencia no existe")
    
    const results = await experienciaRepo.delete(experiencia);
    return res.json(results)
}

export const deleteCertificacion = async (req: Request, res: Response): Promise<Response> => {
    const certificacionRepo = getRepository(Certificacion)
    const certificacion = await certificacionRepo.findOne({ relations: ["perfilProfesional"], where: { id: req.params.id } })
    if (!certificacion) throw new Exception("La certificación no existe")
    
    const results = await certificacionRepo.delete(certificacion);
    return res.json(results)
}

export const deleteIdioma = async (req: Request, res: Response): Promise<Response> => {
    const idiomaRepo = getRepository(Idioma)
    const idioma = await idiomaRepo.findOne({ relations: ["perfilProfesional"], where: { id: req.params.id } })
    if (!idioma) throw new Exception("El idioma no existe")
    
    const results = await idiomaRepo.delete(idioma);
    return res.json(results)
}

export const crearEstudio = async (req: Request, res: Response): Promise<Response> => {
    const profesional = await getRepository(PerfilProfesional).findOne({ relations: ["estudios"], where: {id: req.params.id}});
    
    if(!profesional) throw new Exception("No existe el usuario");
    if(!req.body.nombre) throw new Exception("Ingrese un nombre del estudio");

    const nuevoEstudio = getRepository(Estudio).create();
    nuevoEstudio.nombre = req.body.nombre;

    profesional.estudios = [...profesional.estudios, nuevoEstudio];
    const results = await getRepository(PerfilProfesional).save(profesional);
    return res.json(results);
}

export const crearExperiencia = async (req: Request, res: Response): Promise<Response> => {
    const profesional = await getRepository(PerfilProfesional).findOne({ relations: ["experiencias"], where: {id: req.params.id}});
    
    if(!profesional) throw new Exception("No existe el usuario");
    if(!req.body.nombre) throw new Exception("Ingrese un nombre de la experiencia");

    const nuevaExperiencia = getRepository(Experiencia).create();
    nuevaExperiencia.nombre = req.body.nombre;

    profesional.experiencias = [...profesional.experiencias, nuevaExperiencia];
    const results = await getRepository(PerfilProfesional).save(profesional);
    return res.json(results);
}

export const crearCertificacion = async (req: Request, res: Response): Promise<Response> => {
    const profesional = await getRepository(PerfilProfesional).findOne({ relations: ["certificaciones"], where: {id: req.params.id}});
    
    if(!profesional) throw new Exception("No existe el usuario");
    if(!req.body.nombre) throw new Exception("Ingrese el nombre de la certificacion");

    const nuevoCertificado = getRepository(Certificacion).create();
    nuevoCertificado.nombre = req.body.nombre;

    profesional.certificaciones = [...profesional.certificaciones, nuevoCertificado];
    const results = await getRepository(PerfilProfesional).save(profesional);
    return res.json(results);
}

export const crearIdioma = async (req: Request, res: Response): Promise<Response> => {
    const profesional = await getRepository(PerfilProfesional).findOne({ relations: ["idiomas"], where: {id: req.params.id}});
    
    if(!profesional) throw new Exception("No existe el usuario");
    if(!req.body.nombre) throw new Exception("Ingrese el nombre del idioma");

    const nuevoIdioma = getRepository(Idioma).create();
    nuevoIdioma.nombre = req.body.nombre;

    profesional.idiomas = [...profesional.idiomas, nuevoIdioma];
    const results = await getRepository(PerfilProfesional).save(profesional);
    return res.json(results);
}