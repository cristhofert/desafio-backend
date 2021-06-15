import { Request, Response } from 'express'
import { getRepository, EntityTarget, ILike } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Exception } from './utils'
import { Empresa } from './entities/Empresa'
import { RegistroProfesional } from './entities/RegistroProfesional'
import jwt from 'jsonwebtoken'
import { PerfilProfesional } from './entities/PerfilProfesional'
import { Estudio } from './entities/Estudio'
import { Experiencia } from './entities/Experiencia'
import { Certificacion } from './entities/Certificacion'
import { Idioma } from './entities/Idioma'
import { Oferta } from './entities/Oferta'
import { Cualificacion } from './entities/Cualificacion'
import { Condicion } from './entities/Condicion'
import { Habilidad } from './entities/Habilidad'
import { Responsabilidad } from './entities/Responsabilidad'
import bcrypt from "bcrypt"
import nodemailer from 'nodemailer'

interface IToken {
    user: RegistroProfesional | Empresa,
    iat: number,
    exp: number
}

// GET
export const obtenerEmpresas = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Empresa).find();
    return res.json(users);
}

export const obtenerEmpresa = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Empresa).findOne(req.params.id);
    return res.json(users);
}

export const obtenerMiEmpresa = async (req: Request, res: Response): Promise<Response> => {
    const token = req.user as IToken;
    if (token.user! instanceof Empresa) throw new Exception("Debe ser una empresa")
    const users = await getRepository(Empresa).findOne({ email: token.user.email });
    return res.json(users);
}

export const getProfesional = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(PerfilProfesional).findOne({ relations: ["estudios", "experiencias", "certificaciones", "idiomas"], where: { id: req.params.id } });
    return res.json(users);
}

export const getProfesionales = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(PerfilProfesional).find({ relations: ["estudios", "experiencias", "certificaciones", "idiomas"] });
    return res.json(users);
}

export const getCualificacion = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Cualificacion).find();
    return res.json(users);
}

// POST
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
    const profesional = await getRepository(RegistroProfesional).findOne({ email: req.body.email })
    if (profesional) throw new Exception("Ya existe un profesional con ese email")
    req.body.contrasenna = bcrypt.hashSync(req.body.contrasenna, 10);


    //Ahora al crear una empresa, tambien se crea una lista de ofertas vacia con ella
    const nuevaEmpresa = getRepository(Empresa).create({ ...req.body, ofertas: [] });
    const results = await getRepository(Empresa).save(nuevaEmpresa);
    return res.json(results);
}

export const crearProfesional = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.email) throw new Exception("Por favor, provee una email")
    if (!req.body.contrasenna) throw new Exception("Por favor, provee una contraseña")
    req.body.contrasenna = bcrypt.hashSync(req.body.contrasenna, 10);

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

export const crearEstudio = async (req: Request, res: Response): Promise<Response> => {
    const profesional = await getRepository(PerfilProfesional).findOne({ relations: ["estudios"], where: { id: req.params.id } });

    if (!profesional) throw new Exception("No existe el usuario");
    if (!req.body.nombre) throw new Exception("Ingrese un nombre del estudio");

    const nuevoEstudio = getRepository(Estudio).create();
    nuevoEstudio.nombre = req.body.nombre;

    profesional.estudios = [...profesional.estudios, nuevoEstudio];
    const results = await getRepository(PerfilProfesional).save(profesional);
    return res.json(results);
}

export const crearExperiencia = async (req: Request, res: Response): Promise<Response> => {
    const profesional = await getRepository(PerfilProfesional).findOne({ relations: ["experiencias"], where: { id: req.params.id } });

    if (!profesional) throw new Exception("No existe el usuario");
    if (!req.body.nombre) throw new Exception("Ingrese un nombre de la experiencia");

    const nuevaExperiencia = getRepository(Experiencia).create();
    nuevaExperiencia.nombre = req.body.nombre;

    profesional.experiencias = [...profesional.experiencias, nuevaExperiencia];
    const results = await getRepository(PerfilProfesional).save(profesional);
    return res.json(results);
}

export const crearCertificacion = async (req: Request, res: Response): Promise<Response> => {
    const profesional = await getRepository(PerfilProfesional).findOne({ relations: ["certificaciones"], where: { id: req.params.id } });

    if (!profesional) throw new Exception("No existe el usuario");
    if (!req.body.nombre) throw new Exception("Ingrese el nombre de la certificacion");

    const nuevoCertificado = getRepository(Certificacion).create();
    nuevoCertificado.nombre = req.body.nombre;

    profesional.certificaciones = [...profesional.certificaciones, nuevoCertificado];
    const results = await getRepository(PerfilProfesional).save(profesional);
    return res.json(results);
}

export const crearIdioma = async (req: Request, res: Response): Promise<Response> => {
    const profesional = await getRepository(PerfilProfesional).findOne({ relations: ["idiomas"], where: { id: req.params.id } });

    if (!profesional) throw new Exception("No existe el usuario");
    if (!req.body.nombre) throw new Exception("Ingrese el nombre del idioma");

    const nuevoIdioma = getRepository(Idioma).create();
    nuevoIdioma.nombre = req.body.nombre;

    profesional.idiomas = [...profesional.idiomas, nuevoIdioma];
    const results = await getRepository(PerfilProfesional).save(profesional);
    return res.json(results);
}

export const obtenerProfesionalLogeado = async (req: Request, res: Response): Promise<Response> => {
    const token = req.user as IToken;

    const profesional = await getRepository(RegistroProfesional).findOne({ relations: ["perfil"], where: { email: token.user.email } });
    if (!profesional) throw new Exception("Profesional no encontrado");

    const infoProfesional = await getRepository(PerfilProfesional).findOne({ relations: ["estudios", "experiencias", "certificaciones", "idiomas"], where: { id: profesional.perfil.id } })

    return res.json(infoProfesional);
}

//controlador para el logueo
export const login = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.email) throw new Exception("Por favor, especifique un correo en el cuerpo de su solicitud", 400)
    if (!req.body.contrasenna) throw new Exception("Por favor, especifique una contraseña en el cuerpo de su solicitud", 400)

    const profesionalRepo = getRepository(RegistroProfesional)
    const empresaRepo = getRepository(Empresa)

    // We need to validate that a user with this email and password exists in the DB
    const profesional = await profesionalRepo.findOne({ where: { email: req.body.email } })
    let user;
    if (!profesional) {
        const empresa = await empresaRepo.findOne({relations: ["ofertas"], where: { email: req.body.email } })
        if (!empresa) throw new Exception("Email o contraseña inválido", 401)
        if (await bcrypt.compare(req.body.contrasenna, empresa.contrasenna).then(function (result: boolean) {
            return !result
        })) {
            throw new Exception("Email o contraseña inválido", 401)
        }
        user = empresa;
    }
    else {
        if (await bcrypt.compare(req.body.contrasenna, profesional.contrasenna).then(function (result: boolean) {
            return !result
        })) {
            throw new Exception("Email o contraseña inválido", 401)
        }
        user = profesional
    }


    // this is the most important line in this function, it create a JWT token
    const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 24 * 60 * 60 });

    // return the user and the recently created token to the client
    return res.json({ user: user, token });
}

// PUT
export const cambiarContraseña = async (req: Request, res: Response): Promise<Response> => {
    const token = req.user as IToken
    let usuario

    if (!req.body.contrasennaVieja) throw new Exception("Por favor, provee la contraseña vieja")
    if (!req.body.contrasennaNueva) throw new Exception("Por favor, provee una nueva contraseña")

    if (token.user instanceof RegistroProfesional) {
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
    if (token.user instanceof RegistroProfesional)
        results = await getRepository(RegistroProfesional).save(usuario);
    else
        results = await getRepository(Empresa).save(usuario);


    return res.json(results);
}

export const cambiarPassRecuperacion = async (req: Request, res: Response): Promise<Response> => {
    const token = req.user as IToken
    const empresa = token.user as Empresa;
    let usuario

    if (!req.body.nuevaPass) throw new Exception("Ingrese una nueva contraseña")

    if (empresa.comentarios) {
        usuario = await getRepository(Empresa).findOne({ email: token.user.email });
        if (!usuario) throw new Exception("La empresa no existe")
    }
    else {
        usuario = await getRepository(RegistroProfesional).findOne({ email: token.user.email });
        if (!usuario) throw new Exception("El profesional no existe")
    }

    usuario.contrasenna = bcrypt.hashSync(req.body.nuevaPass, 10);

    let results
    if (empresa.comentarios)
        results = await getRepository(Empresa).save(usuario);
    else
        results = await getRepository(RegistroProfesional).save(usuario);

    return res.json(results);
}

export const putPerfilProfesional = async (req: Request, res: Response): Promise<Response> => {
    const profesional = await getRepository(PerfilProfesional).findOne(req.params.id);
    if (!profesional) throw new Exception("No existe", 400)
    PerfilProfesional.merge(profesional, req.body);
    const results = await PerfilProfesional.save(profesional);
    return res.send(results);
}

export const putPerfilEmpresa = async (req: Request, res: Response): Promise<Response> => {
    const empresa = await getRepository(Empresa).findOne(req.params.id);
    if (!empresa) throw new Exception("No existe", 400)
    Empresa.merge(empresa, req.body);
    const results = await Empresa.save(empresa);
    return res.send(results);
}

export const editarProfesional = async (req: Request, res: Response): Promise<Response> => {
    const token = req.user as IToken;
    const profesional = await getRepository(RegistroProfesional).findOne({ relations: ["perfil"], where: { email: token.user.email } })
    if (!profesional) throw new Exception("No existe", 400)
    const profesionalPerfil = profesional.perfil;
    PerfilProfesional.merge(profesionalPerfil, req.body);
    const results = await PerfilProfesional.save(profesionalPerfil);
    return res.send(results);
}

export const editarEmpresa = async (req: Request, res: Response): Promise<Response> => {
    const token = req.user as IToken
    const empresa = await getRepository(Empresa).findOne({ email: token.user.email });
    if (!empresa) throw new Exception("No existe", 400)
    Empresa.merge(empresa, req.body);
    const results = await Empresa.save(empresa);
    return res.send(results);
}

export const putOferta = async (req: Request, res: Response): Promise<Response> => {
    const oferta = await getRepository(Oferta).findOne(req.params.id);
    if (!oferta) throw new Exception("No existe", 400)
    Oferta.merge(oferta, req.body);
    const results = await Oferta.save(oferta);
    return res.send(results);
}

// DELETE
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

export const deleteCualificacion = async (req: Request, res: Response): Promise<Response> => {
    const cualificacionRepo = getRepository(Cualificacion)
    const cualificacion = await cualificacionRepo.findOne({ relations: ["oferta"], where: { id: req.params.id } })
    if (!cualificacion) throw new Exception("La cualificacion no existe")

    const results = await cualificacionRepo.delete(cualificacion);
    return res.json(results)
}

export const deleteHabilidad = async (req: Request, res: Response): Promise<Response> => {
    const habilidadRepo = getRepository(Habilidad)
    const habilidad = await habilidadRepo.findOne({ relations: ["oferta"], where: { id: req.params.id } })
    if (!habilidad) throw new Exception("La habilidad no existe")

    const results = await habilidadRepo.delete(habilidad);
    return res.json(results)
}

export const deleteCondicion = async (req: Request, res: Response): Promise<Response> => {
    const condicionRepo = getRepository(Condicion)
    const condicion = await condicionRepo.findOne({ relations: ["oferta"], where: { id: req.params.id } })
    if (!condicion) throw new Exception("La condicion no existe")

    const results = await condicionRepo.delete(condicion);
    return res.json(results)
}

export const deleteResponsabilidad = async (req: Request, res: Response): Promise<Response> => {
    const responsabilidadRepo = getRepository(Responsabilidad)
    const responsabilidad = await responsabilidadRepo.findOne({ relations: ["oferta"], where: { id: req.params.id } })
    if (!responsabilidad) throw new Exception("La responsabilidad no existe")

    const results = await responsabilidadRepo.delete(responsabilidad);
    return res.json(results)
}

const crearArregloRelacion = (entidad: EntityTarget<Cualificacion> | EntityTarget<Condicion> | EntityTarget<Habilidad> | EntityTarget<Responsabilidad>, detallesArray: Object[]): Cualificacion[] | Condicion[] | Habilidad[] | Responsabilidad[] => {
    const repo = getRepository(entidad);
    let reqDetalles = detallesArray;
    let newDetalles: Cualificacion[] | Condicion[] | Habilidad[] | Responsabilidad[] = [];
    reqDetalles.forEach((detalleIterable: Object) => {
        const nuevoDetalle = repo.create(detalleIterable)
        newDetalles.push(nuevoDetalle);
    })

    return newDetalles;
}

export const crearOferta = async (req: Request, res: Response): Promise<Response> => {
    const token = req.user as IToken
    const empresa = await getRepository(Empresa).findOne({ relations: ["ofertas"], where: { email: token.user.email } })
    if (!empresa) throw new Exception("empresa no esta logeada"); //no se si esto es opcional.

    if (!req.body.nombre) throw new Exception("Ingrese un nombre para la oferta");
    if (!req.body.fecha) throw new Exception("Ingrese la fecha de la creacion de la oferta");
    if (!req.body.descripcion) throw new Exception("Ingrese una descripcion de oferta");
    if (!req.body.presencialidad) throw new Exception("Indique si es presencial o remoto");
    if (!req.body.estado) throw new Exception("Indique el estado de la oferta");
    if (!req.body.cualificaciones) throw new Exception("Ingrese alguna cualificacion");
    if (!req.body.condiciones) throw new Exception("Ingrese alguna condicion");
    if (!req.body.habilidades) throw new Exception("Ingrese alguna habilidad");
    if (!req.body.responsabilidades) throw new Exception("Ingrese alguna responsabilidad");

    const cualificacionesNueva: Cualificacion[] = crearArregloRelacion(Cualificacion, req.body.cualificaciones);
    const condicionesNueva: Condicion[] = crearArregloRelacion(Condicion, req.body.condiciones);
    const habilidadesNueva: Habilidad[] = crearArregloRelacion(Habilidad, req.body.habilidades);
    const responsabilidadesNueva: Responsabilidad[] = crearArregloRelacion(Responsabilidad, req.body.responsabilidades);

    const oferta = getRepository(Oferta).create();
    oferta.nombre = req.body.nombre;
    oferta.fecha = req.body.fecha;
    oferta.descripcion = req.body.descripcion;
    oferta.presencialidad = req.body.presencialidad;
    oferta.estado = req.body.estado;
    oferta.cualificaciones = cualificacionesNueva;
    oferta.condiciones = condicionesNueva;
    oferta.habilidades = habilidadesNueva;
    oferta.responsabilidades = responsabilidadesNueva;

    const ofertaGuardada = await getRepository(Oferta).save(oferta);
    console.log(empresa);
    empresa.ofertas = [...empresa.ofertas, oferta];
    const empresaGuardada = await getRepository(Empresa).save(empresa);

    return res.json({ empresa: empresaGuardada, oferta: ofertaGuardada });
}


export const getOferta = async (req: Request, res: Response): Promise<Response> => {
    const oferta = await getRepository(Oferta).findOne({
        relations: ["cualificaciones", "condiciones", "habilidades", "responsabilidades"],
        where: { id: req.params.id }
    })
    return res.json(oferta);
}

export const buscar = async (req: Request, res: Response): Promise<Response> => {
    const oferta = await getRepository(Oferta).find({
        where: [
            { nombre: ILike(`%${req.params.consulta}%`) },
            { descripcion: ILike(`%${req.params.consulta}%`) }
        ]
    })
    return res.json(oferta);
}

export const getOfertas = async (req: Request, res: Response): Promise<Response> => {

    const token = req.user as IToken
    const empresa = await getRepository(Empresa).findOne({ relations: ["ofertas"], where: { email: token.user.email } })
    if (!empresa) throw new Exception("no existe la empresa");
    const ofertas = empresa.ofertas;
    return res.json(ofertas);
}

export const recuperarPass = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.email) throw new Exception("Por favor, especifique un correo en el cuerpo de su solicitud", 400)

    const profesionalRepo = getRepository(RegistroProfesional)
    const empresaRepo = getRepository(Empresa)

    // We need to validate that a user with this email and password exists in the DB
    const profesional = await profesionalRepo.findOne({ email: req.body.email })
    let user;
    if (!profesional) {
        const empresa = await empresaRepo.findOne({ email: req.body.email })
        if (empresa) {
            user = empresa;
        }
    }
    else {
        user = profesional
    }

    if (user) {
        const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 24 * 60 * 60 });
        const tokenSustituido = token.replace(/\./g, '$');

        let testAccount = await nodemailer.createTestAccount();

        testAccount.user = "jobstack16@gmail.com"
        testAccount.pass = process.env.GMAILPASS as string

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"JobStack" <jobstack16@gmail.com>',
            to: req.body.email,
            subject: "Recuperación de contraseña",
            html: `<p>Si ha solicitado su contraseña, por favor ingrese al siguiente <a href="${process.env.FRONTEND}/recuperarContraseña/${tokenSustituido}">link</a>, en caso contrario, omita este email</p>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    return res.json({ message: "OK" });
}


export const loginGoogle = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.email) throw new Exception("Por favor, especifique un correo en el cuerpo de su solicitud", 400)

    const profesionalRepo = getRepository(RegistroProfesional)
    const empresaRepo = getRepository(Empresa)

    // We need to validate that a user with this email and password exists in the DB
    const profesional = await profesionalRepo.findOne({ where: { email: req.body.email } })
    let user;
    if (!profesional) {
        const empresa = await empresaRepo.findOne({ where: { email: req.body.email } })
        if (!empresa) throw new Exception("Email o contraseña inválido", 401)
        user = empresa;
    }
    else {
        user = profesional
    }

    // this is the most important line in this function, it create a JWT token
    const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 24 * 60 * 60 });

    // return the user and the recently created token to the client
    return res.json({ user: user, token });

export const postularProfesional = async (req: Request, res: Response): Promise<Response> => {
    const token = req.user as IToken;
    const profesional = await getRepository(PerfilProfesional).findOne({relations: ['postulaciones'] ,where: {id: token.user.id}});
    if(!profesional) throw new Exception('No se encontro un profesional');

    const oferta = await getRepository(Oferta).findOne(req.body.idOferta);
    if(!oferta) throw new Exception('No se encontro la oferta');
    profesional.postulaciones = [...profesional.postulaciones, oferta];

    const results = getRepository(PerfilProfesional).save(profesional);
    return res.json(results);
}

export const borrarPostulacion = async (req: Request, res: Response): Promise<Response> => {
    const token = req.user as IToken;
    const profesional = await getRepository(PerfilProfesional).findOne({relations: ['postulaciones'] ,where: {id: token.user.id}});
    if(!profesional) throw new Exception('No se encontro un profesional');

    const oferta = await getRepository(Oferta).findOne(req.body.idOferta);
    if(!oferta) throw new Exception('No se encontro la oferta');

    const nuevasPostulaciones = profesional.postulaciones.filter((oferta)=>{
        return oferta.id != req.body.idOferta;
    })

    profesional.postulaciones = nuevasPostulaciones;
    const results = getRepository(PerfilProfesional).save(profesional);

    return res.json(results);
}

export const postulacionesProfesional = async (req: Request, res: Response): Promise<Response> => {
    const token = req.user as IToken;
    const profesional = await getRepository(PerfilProfesional).findOne({relations: ['postulaciones'] ,where: {id: token.user.id}});
    if(!profesional) throw new Exception('No se encontro un profesional');

    return res.json(profesional.postulaciones);

}