
const index = (req, res) => {
	res.render('index')
};

const register = (req, res) =>{
	res.render('register')
}

const login = (req, res) => {
	res.render('login')
};


module.exports = {index, login, register};