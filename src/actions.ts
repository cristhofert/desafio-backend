import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Empresa } from './entities/Empresa'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}

export const obtenerEmpresas = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Empresa).find();
		return res.json(users);
}

export const obtenerEmpresa = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Empresa).findOne(req.params.id);
		return res.json(users);
}

export const crearEmpresa = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.email) throw new Exception("Por favor, provee una email")
	if(!req.body.contrasenna) throw new Exception("Por favor, provee una contraseña")
	if(!req.body.nombre) throw new Exception("Por favor, provee una nombre")
	if(!req.body.icono) throw new Exception("Por favor, provee una icono")
	if(!req.body.descripcion) throw new Exception("Por favor, provee una descripcion")
	if(!req.body.departamento) throw new Exception("Por favor, provee una departamento")
	if(!req.body.direccion) throw new Exception("Por favor, provee una direccion")
	if(!req.body.sitio_web) throw new Exception("Por favor, provee una sitio_web")
	if(!req.body.comentarios) throw new Exception("Por favor, provee una comentarios")
	if(!req.body.twitter) throw new Exception("Por favor, provee una twitter")
	if(!req.body.facebook) throw new Exception("Por favor, provee una facebook")
	if(!req.body.linkedin) throw new Exception("Por favor, provee una linkedin")
	if(!req.body.github) throw new Exception("Por favor, provee una github")

	const nuevaEmpresa = getRepository(Empresa).create(req.body);  
	const results = await getRepository(Empresa).save(nuevaEmpresa); 
	return res.json(results);
}
