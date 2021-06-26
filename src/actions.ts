import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.username) throw new Exception("Please provide a username")
	if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")
	if(!req.body.is_admin) throw new Exception("Please provide is is_admin")

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

export const getUser = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).findOne({where: {username: req.params.username}});
		return res.json(users);
}

export const updateUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.username) throw new Exception("Please provide a username")
	if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")
	if(!req.body.is_admin) throw new Exception("Please provide is is_admin")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(!user) throw new Exception("User not exist")

    userRepo.merge(user, req.body);
	const results = await getRepository(Users).save(user);
	return res.json(results);
}

export const deleteUser = async (req: Request, res:Response): Promise<Response> =>{
        const results = await  getRepository(Users).delete(req.params.id);
        return res.send(results);
    }