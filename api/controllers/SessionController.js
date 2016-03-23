/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

	'new' : function(req,res){
		/*var oldDateObj = new Date();
		var newDateObj = new Date(oldDateObj.getTime()+60000);
		req.session.cookie.expires = newDateObj;*/
		req.session.authenticated = true;
		console.log(req.session);
		res.view('session/new');
	},

	'create' : function(req,res,next){
		//Now we'll check that the user entered some email and password 
		if(!req.param('email') || !req.param('password')) {
			var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter both Username and Password!'}]
			req.session.flash = { 
				err : usernamePasswordRequiredError 
			}
			res.redirect('/session/new');
			return;
		}

		//Now finding a user with their emailID and when there is no user at all
		User.findOneByEmail(req.param('email'), function foundUser (err,user){
			if (err) return next(err);
			//When no user found
			if(!user){
				var noAccountError = [{name: 'noAccount', message: 'The email address '+req.param('email')+' not found!'}]
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/session/new');
				return;
			}
			//Now comparing password from the params
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err,valid){
				if (err) return next(err);
				//When Password doesn't match
				if (!valid){
					var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid Username Password combination!'}]
					req.session.flash = {
					err: usernamePasswordMismatchError
					}
					res.redirect('/session/new');
					return;
				}

				 
				//When user is found and password is also matched
				req.session.authenticated = true;
				req.session.User = user;
				res.redirect('/user/show/'+user.id);
			});
		});
	}
	
};