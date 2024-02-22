const app = require('./server.js')

app.listen(process.env.PORT, () => {
	console.log(`Servidor iniciado en el puerto: ${process.env.PORT}`)
});