import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Empresa } from './entities/Empresa'
import { RegistroProfesional } from './entities/RegistroProfesional'
import jwt from 'jsonwebtoken'

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

    const nuevaEmpresa = getRepository(Empresa).create(req.body);
    const results = await getRepository(Empresa).save(nuevaEmpresa);
    return res.json(results);
}

export const crearProfesional = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.email) throw new Exception("Por favor, provee una email")
    if (!req.body.contrasenna) throw new Exception("Por favor, provee una contraseña")

    const nuevaProfesional = getRepository(RegistroProfesional).create(req.body);
    const results = await getRepository(RegistroProfesional).save(nuevaProfesional);
    return res.json(results);
}

export const cambiarContraseña = async (req: Request, res: Response): Promise<Response> => {
    const profesional = await getRepository(RegistroProfesional).findOne(req.params.id);
    if (!req.body.contrasennaVieja) throw new Exception("Por favor, provee la contraseña vieja")
    if (!req.body.contrasennaNueva) throw new Exception("Por favor, provee una nueva contraseña")
    if (!profesional) throw new Exception("El profesional no existe")
    if (req.body.contrasennaVieja != profesional.contrasenna) throw new Exception("Contraseña incorrecta")
    profesional.contrasenna = req.body.contrasennaNueva
    const results = await getRepository(RegistroProfesional).save(profesional);
    
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
    if (!profesional) {
        const empresa = await empresaRepo.findOne({ where: { email: req.body.email, contrasenna: req.body.contrasenna } })
        if (!empresa) throw new Exception("Email o contraseña inválido", 401)
        user = empresa;
    }
    else
    {
        user = profesional;
    }


    // this is the most important line in this function, it create a JWT token
    const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });

    // return the user and the recently created token to the client
    return res.json({ user, token });
}

