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

	/*'create': function (req,res,next) {
		User.create ( req.params.all(), function userCreated(err,user){ 
			if(err) {
				console.log(err);
				return res.redirect('/user/new');
			}
			//res.json(user);
			res.redirect('/user/show/'+user.id);
		});
	},*/

	'create': function (req,res) {
		var params = req.params.all();
		User.create({username: params.username, id: params.id}).exec(function createUser(err,created){
			if(err) {
				console.log(err);
				return res.redirect('/user/new');
			}
        	res.redirect('/user/show/'+params.id);
      });
    },
	
	'show' : function (req,res,next){
		User.findOne(req.param('id'), function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next();
			res.view({user:user});
		});
	} 
};


