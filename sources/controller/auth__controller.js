const pool = require('../db/database');
const mailer = require('../mailer/mailer')
const uuid = require("uuid");

const SecretKey = process.env.SECRET_KEY;
 
const register = (req, res) => {
	res.render('register');
};

const login = (req, res) => {
	res.render('login');
};

function sendmail(email, enlace){
	const info = mailer.sendMail({
    from: '"Cobalt System" <email.cobalt.system@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Comprueba tu cuenta..", // Subject line
    text: "Click en el siguiente enlace para verificar.", // plain text body
    html: `<h5>Verificar correo electrónico</h5>
	<p>Para verificar su correo electrónico, haga clic en el siguiente enlace:</p>
	<a href="${enlace}" class="btn btn-primary">Verificar</a>`, // html body			        
  });
}
  
/* 
const postRegister = (req, res) => {
	const {dni, email, password} = req.body;
	console.log(dni, email, password);
	var errors = [];
	var uid = uuid.v4();
	pool.query('SELECT email, `CC.PROPIETARIO` as propietario FROM `propietarios` WHERE `CC.PROPIETARIO` = ? or `EMAIL` = ?', [dni, email], function(err, result){
		console.log(result)
		if(err == null && result.length == 0){
			pool.query('INSERT INTO `propietarios` (`CC.PROPIETARIO`, EMAIL, PASSWORD, CODIGO_CONFIRMACION_EMAIL) VALUES (?,?, AES_ENCRYPT(?, "contrase"), ?)', [dni,email, password, uid], function(err, result2){
				if (err == null && result2){
					sendmail(email, `http://localhost:3000/verificar/cuenta/${uid}`)
					res.render('register', {title: "Cuenta creada correctamente.", description: "Se ha enviado un enlace de verificación a su dirección de correo electrónico "+email})			
				}
			});		
		}
		else if(result.length == 1 && err == null)
		{
			if(result[0].EMAIL == email)
				errors.push({title: "Email Registrado.", description: "El número de documento proporcionado ya existe en nuestra base de datos."})
			if(result[0].propietario == dni)
				errors.push({title: "Documento registrado.", description: "El número de documento proporcionado ya existe en nuestra base de datos."})
			res.render('register', {errors})	
		}
		else if(err){
			console.error()
		}
	});	
};
*/

const post_register = (req, res) =>{
	const {email, password} = req.body;
	pool.query('SELECT * FROM `prietarios` WHERE `EMAIL`=?', [email], function (err, result){
		if(err === null && result.length == 0){
			pool.query('SELECT ',[], {

			});
			sendmail(email, `http://localhost:3000/verificar/cuenta/${uid}`)
			res.render('register', {title: "Verifica Tu correo electrónico.", description: "Se ha enviado un enlace de verificación a su dirección de correo electrónico "+email})			
		}
		else if(result.length == 1)
			res.render('register', {title: "Correo electronico Existente.", description: "El correo electrónico ingresado ya esta registrado."+email})
		else 
			res.json("Ha ocurrido un error: "+err);			
	});
};

const GEtLoginVerifyAccount = (req, res) => {
	let message = [];
	pool.query('SELECT verificado as verify FROM `propietarios` WHERE `CODIGO_CONFIRMACION_EMAIL` = ?', [req.params.id], function(erno, resultado)
	{
		console.log(resultado);
		if(erno === null && resultado.length === 1)
		{
			console.log("lola"+resultado);
			if(resultado[0].verify === 0)
			{
				pool.query('UPDATE `propietarios` SET `verificado`= ?  WHERE `CODIGO_CONFIRMACION_EMAIL` = ?', [1, req.params.id], function(error, result) {
					if(error == null && result.affectedRows == 1){
						message.push({title: "Se ha verificado el correo", Description: "Tu correo electrÃ³nico ha sido verificado correctamente. Ahora puedes iniciar sesiÃ³n en tu cuenta."});
						if(message.length > 0)
							res.render('verificar', {message})
					}
				});	
			}
			else
				message.push({title: "Correo Verificado", Description: "El enlace es invalido, ya ha sido confirmada una cuenta con este enlace."});
		}
		else if(resultado.length === 0)
			message.push({title: "Enlace invalido", Description: "No se ha encontrado cuenta para verificar correo con este enlace."});
		else
			message.push({title: "Error", Description: "Ha ocurrido un error inesperado, Detalle :"+erno}); 
		if(message.length > 0)
			res.render('verificar', {message})
	});

};

const postLogin = (req, res) =>{
	var passwordEncript;
	var errors = [];
	const {email, password} = req.body
	console.log(email);
	pool.query('SELECT AES_ENCRYPT(?, "contrase") as p', [password], function(err, result) 
	{
    if (err)
      console.log(err);
    console.log(result[0].p);
		passwordEncript = result[0].p;
	}); 
	pool.query('SELECT `PASSWORD` as pwsd, verificado, `CC.PROPIETARIO` as CCUser FROM `propietarios` WHERE `EMAIL`= ?', [email], function(err, result)
	{
		console.log(result);
		if(err == null && result.length == 1)
		{
			console.log(passwordEncript)
			console.log(result[0].pwsd)
			if(result[0].verificado == 1)
			{
				if(Buffer.compare(result[0].pwsd, passwordEncript) === 0)
				{
					console.log("Contrase Correcta");
					req.session.userId = result[0].CCUser;
					console.log(req.session.userId);
					res.redirect('/auth/complete/information');
				}
				else {
					errors.push({title: "Contraseña incorrecta.", description: "La contraseña ingresada no coincide con la base de datos."})
					res.render('login', {errors})
				}
			}
			else{
				errors.push({title: "Correo aún por verificar.", description: "Busca en tu bandeja de entrada el email de confirmación."})
				res.render('login', {errors})	
			}
		}
		else if(err == null && result.length == 0){
			errors.push({title: "El email No existe.", description: "El correo electrónico ingresado no existe en nuestra base de datos."})
			res.render('login', {errors});
		}
		
	});
};

const CompleteInformation = (req, res) => {
	pool.query('SELECT `NOMBRE` as nombre,`FECHA_DE_NACIMIENTO` as nacimiento,`N.CELULAR` as celular ,`GENERO` as genero FROM `propietarios` WHERE `CC.PROPIETARIO` = ?', [req.session.userId], function(err, result){
		if(err)
			return console.error(err);
		if(result.length){
			var len = Object.entries(result[0]).filter((entry) => entry[1] === null).length;
			if(len > 0)
				res.render('complete_data')
			else 
				res.redirect('/auth/propiedad');
		}
	});	
};

const PostCompleteInformation = (req, res) =>
{
	const {nombres, fnacimiento, celular, genero, ntorre, napartamento}= req.body;
	pool.query('UPDATE `propietarios` SET `NOMBRE`=? , `FECHA_DE_NACIMIENTO` = ?, `N.CELULAR`= ?, `GENERO`=? WHERE `CC.PROPIETARIO` = ?',[nombres, fnacimiento, celular, genero, req.session.userId], function(error, resultado){
		if(error === null && resultado.affectedRows === 1){
			pool.query('INSERT INTO `apartamentos` (N_APARTAMENTO, N_TORRE) VALUES(?,?)',[napartamento,ntorre], function(err, result){
				if(err === null && result.affectedRows === 1){
					console.log(result)
					pool.query('INSERT INTO `apartamentos_has_propietarios` (id_apartamento, cc_propietario) VALUES(?,?)',[result.insertId, req.session.userId], function(erno, result2){
						console.log(result2)
						if(erno === null && result2.affectedRows === 1){
							res.redirect('/auth/propiedad');
						}
					});
				}
			});	
		}
	});
};

//===================> Ruta localhost:3000/propiedad <=======================//
/*
Consulta y Union MySQL de tablas  propietarios, apartamentos, apartamentos_has_propietarios (Donde se guardar el el id de apartamento y el cc de propietario).
Obteniendo en la tabla propietarios las columnas nombre, fecha de nacimiento, celular, genero.
Obteniendo en la tabla apartamentos_has_propietarios las columnas llamadas id_apartamento, cc_propietario. 
Obteniendo en la tabla apartamentos la columna id. 
*/

const GetPropiedad = (req, res) =>{ 
	pool.query('SELECT NOMBRE, FECHA_DE_NACIMIENTO, `N.CELULAR` as celular, GENERO, id_apartamento, cc_propietario, N_APARTAMENTO, N_TORRE, aptm.id FROM `propietarios` \
	INNER JOIN `apartamentos_has_propietarios` as aha ON `cc_propietario`= `CC.PROPIETARIO`\
	INNER JOIN `apartamentos` as aptm ON `id_apartamento` = aptm.id WHERE `CC.PROPIETARIO`= ?', 
	[req.session.userId], function(err, result)
	{
		if(err === null && result.length === 1)
			res.render('propiedad', {result});
		else if(err === null)
			res.redirect('/auth/complete/information');
		else
			res.json(`Ha Ocurrido un error , Detalle: ${err}`);
	});
};

//===================> Ruta localhost:3000/logout <=======================//
/* 
Cierra la sessión creada en POST localhost:3000/login
Redirecciona a la pagina principal localhost:3000

*/

const logout =  (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error logging out');
    } else {
      res.clearCookie('sessionID');
      res.redirect('/'); 
    }
  });
};
module.exports = {register, login, post_register, postLogin, GEtLoginVerifyAccount,CompleteInformation, PostCompleteInformation, GetPropiedad, logout};