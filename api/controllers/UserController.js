/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new':function(req,res){
		
		res.view();
		
	},

	'create': function (req,res,next) {
		User.create ( req.params.all(), function userCreated(err,user){ 
			if(err) {
				console.log(err);
				req.session.flash = {
					err: err
				}

				return res.redirect('/user/new');
			}
			//res.json(user);
			req.session.flash = {};
			res.redirect('/user/show/'+user.id);
		});   
	},

	/*'create': function (req,res,next) {
		var params = req.params.all();
		User.create({name: req.params.name, title: req.params.title, email: req.params.email, encryptedPassword: req.params.encryptedPassword}).exec(function userCreated(err,user){
			if(err) {
				console.log(err);
				return res.redirect('/user/new');
			}
			req.session.flash = {};
        	res.redirect('/user/show/'+user.id);
      });
    },*/
	
	'show' : function (req,res,next){
		User.findOne(req.param('id'), function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next();
			res.view({user:user});
		});
	}
};