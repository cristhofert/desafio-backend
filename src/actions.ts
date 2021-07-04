import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Empresa } from './entities/Empresa'
import { Exception } from './utils'
import { Persona } from './entities/Persona'
import { Departamento } from './entities/Departamento'
import { Localidad } from './entities/Localidad'
import { Empresa_Persona } from './entities/Empresa_Persona'
import jwt from 'jsonwebtoken'
import { Rubro } from './entities/Rubro'

interface IToken {
    user: Users,
    iat: number,
    exp: number
}

function validate_isRUT(rut: string)
{
	if (rut.length != 12){
		return false;
	}
	if (!/^([0-9])*$/.test(rut)){
               return false;
  	}
	let dc = rut.substr(11, 1);
	rut = rut.substr(0, 11);
	let total = 0;
	let factor = 2;
 
	for (let i = 10; i >= 0; i--) {
		total += (factor * Number(rut.substr(i, 1)));
		factor = (factor == 9)?2:++factor;
	}
 
	var dv = 11 - (total % 11);
 
	if (dv == 11){
		dv = 0;
	}else if(dv == 10){
		dv = 1;
	}
	if(dv == Number(dc)){
		return true;
	}
	return false;
}

//USER
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
export const getLocalidadesDeDepartamento = async (req: Request, res: Response): Promise<Response> =>{
        const departamento = await getRepository(Departamento).findOne({relations: ["localidades"], where: {id: req.params.id}});
        if(!departamento) throw new Exception("No existe el departamento")
		const localidades = departamento.localidades;
		return res.json(localidades);
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

//Empresa
export const createEmpresa = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.razon_social) throw new Exception("Please provide a razon_social")
	if(!req.body.nombre_fantasia) throw new Exception("Please provide an nombre_fantasia")
	if(!req.body.RUT) throw new Exception("Please provide a RUT")
	if(!req.body.email) throw new Exception("Please provide is email")
	if(!req.body.celular) throw new Exception("Please provide is celular")
	if(!req.body.telefono) throw new Exception("Please provide is telefono")
	if(!req.body.nro_BPS) throw new Exception("Please provide is nro_BPS")
	if(!req.body.nro_referencia) throw new Exception("Please provide is nro_referencia")
	if(!req.body.actividad_principal) throw new Exception("Please provide is actividad_principal")
	if(!req.body.actividad_secunadria) throw new Exception("Please provide is actividad_secunadria")
	if(!req.body.fecha_afiliacion) throw new Exception("Please provide is fecha_afiliacion")
	if(!req.body.fecha_inicio_empresa) throw new Exception("Please provide is fecha_inicio_empresa")
	if(!req.body.estado) throw new Exception("Please provide is estado")
	if(!req.body.fecha_de_baja) throw new Exception("Please provide is fecha_de_baja")
	if(!req.body.observaciones) throw new Exception("Please provide is observaciones")
    if(!req.body.imagen) throw new Exception("Please provide is imagen")
	if(!req.body.localidadID) throw new Exception("Por favor ingresa una Localidad");
    //if(!validate_isRUT(req.body.RUT)) throw new Exception("RUT incorrecto")
    

	const empresaRepo = getRepository(Empresa)
	// fetch for any Empresa with this email
	const empresa = await empresaRepo.findOne({ where: {RUT: req.body.RUT }})
	if(empresa) throw new Exception("Empresas already exists with this RUT")

	const body = req.body as Empresa
	const newEmpresa = getRepository(Empresa).create(body);
	const localidad = await getRepository(Localidad).findOne({relations: ["empresa"], where: {id: req.body.localidadID}});
	console.log(newEmpresa, localidad);
	if(!localidad) throw new Exception("La localidad no existe");
	localidad.empresa = [...localidad.empresa, newEmpresa];
	const results = await getRepository(Empresa).save(newEmpresa);
	await getRepository(Localidad).save(localidad);
	
	return res.json(results);
}

export const getEmpresas = async (req: Request, res: Response): Promise<Response> =>{
		const empresas = await getRepository(Empresa).find();
		return res.json(empresas);
}

export const getEmpresa = async (req: Request, res: Response): Promise<Response> =>{
		const empresa = await getRepository(Empresa).findOne({where: {RUT: req.params.RUT}});
		return res.json(empresa);
}

export const updateEmpresa = async (req: Request, res:Response): Promise<Response> =>{
    
    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.razon_social) throw new Exception("Por favor ingresa una razon_social")
	if(!req.body.nombre_fantasia) throw new Exception("Por favor ingresa un nombre_fantasia")
	if(!req.body.RUT) throw new Exception("Por favor ingresa un RUT")
	if(!req.body.email) throw new Exception("Por favor ingresa un email")
	if(!req.body.celular) throw new Exception("Por favor ingresa un celular")
	if(!req.body.telefono) throw new Exception("Por favor ingresa un telefono")
	if(!req.body.nro_BPS) throw new Exception("Por favor ingresa un nro_BPS")
	if(!req.body.nro_referencia) throw new Exception("Por favor ingresa un nro_referencia")
	if(!req.body.actividad_principal) throw new Exception("Por favor ingresa una actividad_principal")
	if(!req.body.actividad_secunadria) throw new Exception("Por favor ingresa una actividad_secunadria")
	if(!req.body.fecha_afiliacion) throw new Exception("Por favor ingresa una fecha_afiliacion")
	if(!req.body.fecha_inicio_empresa) throw new Exception("Por favor ingresa una fecha_inicio_empresa")
	if(!req.body.estado) throw new Exception("Por favor ingresa un estado")
	if(!req.body.fecha_de_baja) throw new Exception("Por favor ingresa una fecha_de_baja")
	if(!req.body.observaciones) throw new Exception("Por favor ingresa observaciones")
	if(!req.body.imagen) throw new Exception("Por favor ingresa una imagen")
    
	const empresaRepo = getRepository(Empresa)
	// fetch for any Empresa with this email
	const empresa = await empresaRepo.findOne({ where: {RUT: req.body.RUT }})
	if(!empresa) throw new Exception("Empresa not exist")

    empresaRepo.merge(empresa, req.body);
	const results = await getRepository(Empresa).save(empresa);
	return res.json(results);
}

export const deleteEmpresa = async (req: Request, res:Response): Promise<Response> =>{
    const results = await  getRepository(Empresa).delete(req.params.RUT);
    return res.send(results);
}
// Mi Empresa
export const getMIEmpresa = async (req: Request, res: Response): Promise<Response> =>{
    const token = req.user as IToken;
    return res.json(token.user.empresa);
}

export const updateMiEmpresa = async (req: Request, res:Response): Promise<Response> =>{
    const token = req.user as IToken;
    
    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if(!req.body.razon_social) throw new Exception("Please provide a razon_social")
    if(!req.body.nombre_fantasia) throw new Exception("Please provide an nombre_fantasia")
    if(!req.body.RUT) throw new Exception("Please provide a RUT")
    if(!req.body.email) throw new Exception("Please provide is email")
    if(!req.body.celular) throw new Exception("Please provide is celular")
    if(!req.body.telefono) throw new Exception("Please provide is telefono")
    if(!req.body.nro_BPS) throw new Exception("Please provide is nro_BPS")
    if(!req.body.nro_referencia) throw new Exception("Please provide is nro_referencia")
    if(!req.body.actividad_principal) throw new Exception("Please provide is actividad_principal")
    if(!req.body.actividad_secunadria) throw new Exception("Please provide is actividad_secunadria")
    if(!req.body.fecha_afiliacion) throw new Exception("Please provide is fecha_afiliacion")
    if(!req.body.fecha_inicio_empresa) throw new Exception("Please provide is fecha_inicio_empresa")
    if(!req.body.estado) throw new Exception("Please provide is estado")
    if(!req.body.fecha_de_baja) throw new Exception("Please provide is fecha_de_baja")
    if(!req.body.observaciones) throw new Exception("Please provide is observaciones")
    if(!req.body.imagen) throw new Exception("Please provide is imagen")

    const empresaRepo = getRepository(Empresa)
    // fetch for any Empresa with this email
    const empresa = token.user.empresa;
    if(!empresa) throw new Exception("Empresa not exist")

    empresaRepo.merge(empresa, req.body);
    const results = await getRepository(Empresa).save(empresa);
    return res.json(results);
}

//Persona
export const createPersona = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.nombre) throw new Exception("Please provide a nombre")
	if(!req.body.apellido) throw new Exception("Please provide a apellido")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.celular) throw new Exception("Please provide a celular")
	if(!req.body.estado) throw new Exception("Please provide is estado")

	const personaRepo = getRepository(Persona)
	// fetch for any persona with this email
	const persona = await personaRepo.findOne({ where: {email: req.body.email }})
	if(persona) throw new Exception("Persona already exists with this email")

	const newPersona = personaRepo.create(req.body);  //Creo un usuario
	const results = await personaRepo.save(newPersona); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getPersonas = async (req: Request, res: Response): Promise<Response> =>{
		const personas = await getRepository(Persona).find();
		return res.json(personas);
}

export const getPersona = async (req: Request, res: Response): Promise<Response> =>{
		const persona = await getRepository(Persona).findOne({where: {email: req.params.email}});
		return res.json(persona);
}

export const updatePersona = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.nombre) throw new Exception("Please provide a nombre")
	if(!req.body.apellido) throw new Exception("Please provide a apellido")
    if(!req.body.emailNuevo) throw new Exception("Please provide an email")
    if(!req.body.emailActual) throw new Exception("Please provide an email")
	if(!req.body.celular) throw new Exception("Please provide a celular")
    if(!req.body.estado) throw new Exception("Please provide is estado")
    
    const body = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.emailNuevo,
        celular: req.body.celular,
        estado: req.body.estado
    }

	const personaRepo = getRepository(Persona)
	// fetch for any user with this email
	const p = await personaRepo.findOne({ where: {email: req.body.emailActual }})
	if(!p) throw new Exception("User not exist")

    personaRepo.merge(p, body);
	const results = await personaRepo.save(p);
	return res.json(results);
}

export const deletePersona = async (req: Request, res:Response): Promise<Response> =>{
        const results = await  getRepository(Users).delete(req.params.id);
        return res.send(results);
}

//Localidad
export const createLocalidad = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.nombre) throw new Exception("Por favor ingresa un nombre");

	const localidadRepo = getRepository(Localidad);

	const departamento = await getRepository(Departamento).findOne({relations: ["localidades"], where: {id: req.params.id}});
	if(!departamento) throw new Exception("El departamento no existe");

	const newLocalidad = localidadRepo.create();
	newLocalidad.nombre = req.body.nombre;

	const existe = departamento.localidades.includes(newLocalidad);
	if(!existe){
		departamento.localidades.push(newLocalidad);
		await getRepository(Departamento).save(departamento);
	} else {
		throw new Exception("Ya existe una localidad con este nombre");
	}
	
	return res.json(newLocalidad);
}

export const getLocalidades = async (req: Request, res: Response): Promise<Response> =>{
		const localidades = await getRepository(Localidad).find();
		return res.json(localidades);
}

export const getLocalidad = async (req: Request, res: Response): Promise<Response> =>{
		const localidad = await getRepository(Localidad).findOne(req.params.id);
		return res.json(localidad);
}

export const updateLocalidad = async (req: Request, res:Response): Promise<Response> =>{
	if(!req.body.nombre) throw new Exception("Please provide a nombre")

	const localidadRepo = getRepository(Localidad)
	
	const localidad = await localidadRepo.findOne(req.params.id)
	if(!localidad) throw new Exception("La Localidad no existe")

    localidadRepo.merge(localidad, req.body);
	const results = await localidadRepo.save(localidad);
	return res.json(results);
}

export const deleteLocalidad = async (req: Request, res:Response): Promise<Response> =>{
        const results = await  getRepository(Localidad).delete(req.params.id);
        return res.send(results);
    }

//Departamento
export const createDepartamento = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.nombre) throw new Exception("Por favor ingresa un nombre para el departamento");

    const departamentoRepo = getRepository(Departamento);
    
	const departamento = await departamentoRepo.findOne({ where: {nombre: req.body.nombre }});
	if(departamento) throw new Exception("Ya existe un departamento con este nombre");

    const newDepartamento = departamentoRepo.create(req.body);
	const results = await departamentoRepo.save(newDepartamento);
	return res.json(results);
}

export const getDepartamentos = async (req: Request, res: Response): Promise<Response> =>{
		const departamentos = await getRepository(Departamento).find();
		return res.json(departamentos);
}

export const getDepartamentosYlocalidades = async (req: Request, res: Response): Promise<Response> =>{
	const departamentos = await getRepository(Departamento).find({relations: ["localidades"]});
	return res.json(departamentos);
}

export const getDepartamento = async (req: Request, res: Response): Promise<Response> =>{
		const departamento = await getRepository(Departamento).findOne(req.params.id);
		return res.json(departamento);
}

export const updateDepartamento = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.id) throw new Exception("Por favor ingresa el id del departamento");
	if(!req.body.nombre) throw new Exception("Por favor ingresa un nombre para el Departamento");

    const departamentoRepo = getRepository(Departamento);
    
	const departamento = await departamentoRepo.findOne(req.body.id);
	if(!departamento) throw new Exception("El Departamento con ese nombre no existe");

    departamentoRepo.merge(departamento, req.body);
    const results = await departamentoRepo.save(departamento);
    
	return res.json(results);
}

export const deleteDepartamento = async (req: Request, res:Response): Promise<Response> =>{
        const results = await getRepository(Departamento).delete(req.params.id);
        return res.send(results);
    }

//EmpresaPersona
export const createEmpresaPersona = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.empresaId) throw new Exception("Please provide a empresa")
    if(!req.body.personaId) throw new Exception("Please provide a persona")
    if(!req.body.cargo) throw new Exception("Please provide a persona")

	// fetch for any user with this email
	const persona = await getRepository(Persona).findOne(req.body.personaId)
    const empresa = await getRepository(Empresa).findOne({where: {RUT: req.body.empresaId }})
	if(!persona || !empresa) throw new Exception("Persona and Empresa relationship exists")
    
	const empresaPersonaRepo = getRepository(Empresa_Persona)
    const newEmpresaPersona = empresaPersonaRepo.create();
    newEmpresaPersona.persona = persona
    newEmpresaPersona.empresa = empresa
    newEmpresaPersona.cargo = req.body.cargo
	const results = await empresaPersonaRepo.save(newEmpresaPersona);
	return res.json(results);
}

export const getEmpresaPersonas = async (req: Request, res: Response): Promise<Response> =>{
		const empresaPersonaes = await getRepository(Empresa_Persona).find({ relations: ["persona", "empresa"]});
		return res.json(empresaPersonaes);
}

export const getEmpresaPersona = async (req: Request, res: Response): Promise<Response> =>{
		const empresaPersona = await getRepository(Empresa_Persona).findOne({where: {empresa: req.params.empresaId, persona: req.params.personaId}});
		return res.json(empresaPersona);
}

export const getEmpresasPersonas = async (req: Request, res: Response): Promise<Response> =>{
        const empresaPersona = await getRepository(Empresa_Persona).find({ relations: ["persona", "empresa"], where: { empresa: req.params.empresaId } });
		return res.json(empresaPersona);
}

export const updateEmpresaPersona = async (req: Request, res:Response): Promise<Response> =>{

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.empresaId) throw new Exception("Please provide a empresa")
	if(!req.body.personaId) throw new Exception("Please provide a persona")

	// fetch for any user with this email
	const empresaPersonaRepo = getRepository(Empresa_Persona)
	const empresaPersona = await empresaPersonaRepo.findOne({where: {empresa: req.params.empresaId, persona: req.params.personaId}})
	if(!empresaPersona) throw new Exception("EmpresaPersona not exist")

    empresaPersonaRepo.merge(empresaPersona, req.body);
	const results = await empresaPersonaRepo.save(empresaPersona);
	return res.json(results);
}

export const deleteEmpresaPersona = async (req: Request, res:Response): Promise<Response> =>{
	const empresaPersona = await getRepository(Empresa_Persona).findOne({where: {empresa: req.params.empresaId, persona: req.params.personaId}})
	if(!empresaPersona) throw new Exception("EmpresaPersona not exist")
	const results = await getRepository(Empresa_Persona).delete(empresaPersona);
	return res.send(results);
}

//LOGIN
export const login = async (req: Request, res: Response): Promise<Response> => {
	
	if (!req.body.username) throw new Exception("Please specify an email on your request body", 400)
    if (!req.body.password) throw new Exception("Please specify a password on your request body", 400)

    const userRepo = await getRepository(Users)

    // We need to validate that a user with this email and password exists in the DB
    const user = await userRepo.findOne({ where: { username: req.body.username, password: req.body.password } })
    if (!user) throw new Exception("Invalid email or password", 401)
	
    // this is the most important line in this function, it create a JWT token
    const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });
	
    // return the user and the recently created token to the client
    return res.json({ user, token });
}

export const reportes = async (req: Request, res:Response): Promise<Response> => {
	return res.json(
		{
		"Cantidad_total_de_empresa_activos":
			await getRepository(Empresa).count({where: {activo: true}}),
		"Cantidad total de empresa por rubro de actividad":
			await getRepository(Rubro).createQueryBuilder("rubro")
			.select("rubro.nombre")
			.addSelect("COUNT(rubro.empresa)", "count")
			.groupBy("rubro.nombre")
			.getRawMany(),
		"Listado de empresa por rubro de actividad": 
			await getRepository(Empresa)
			.createQueryBuilder("empresa")
			.select("empresa.RUT")
			.addSelect("empresa.rubro")
			.groupBy("empresa.rubro")
			.getRawMany(),
		"Cantidad total de empresa por localidad": 
			await getRepository(Localidad).createQueryBuilder("localidad")
			.select("localidad.nombre")
			.addSelect("COUNT(localidad.empresa)", "count")
			.groupBy("localidad.nombre")
			.getRawMany(),
		"Altas y bajas del Mes": "Altas y bajas del Mes",
		"Aniversario de empresa por mes (fecha de inicio actividad)": 
			await getRepository(Empresa)
				.createQueryBuilder("empresa")
				.select("empresa.RUT")
				.addSelect("empresa.fecha_de_inicio_actividad")
				.distinctOn(["empresa.fecha_de_inicio_actividad"])
				.orderBy("empresa.fecha_de_inicio_actividad")
			,
		"Listado de empresa y sus contactos asociados": 
			await getRepository(Empresa_Persona).find({relations: ['empresa', 'persona']})

	});
}