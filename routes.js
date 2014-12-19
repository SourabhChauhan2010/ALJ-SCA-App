module.exports = function(app) {

	var user = require('./controllers/userController');
	var device = require('./controllers/deviceController');

	app.get('/', function(req, res, next) {
		res.send('hello world');
	});

	user.createSuperAdminIfNotPresent();
	//USER 
	app.post('/admin/login', user.adminLogin);
	app.post('/user', user.register);
	app.post('/user/login', user.login);
	app.get('/users', user.index);
	app.get('/user/:id', user.show);
	app.post('/user/:id/block', user.changeBlockStatus);
	app.post('/forgot', user.forgotPassword);
	app.get('/reset/:token', user.checkPasswordExpiry);
	app.post('/reset/:token', user.resetPassword);
	app.get('/user', user.findByEmail);

	//DEVICE
	app.post('/user/device', device.add);
	app.get('/user/devices', device.show);
	app.del('/user/device/:id', device.remove);

}