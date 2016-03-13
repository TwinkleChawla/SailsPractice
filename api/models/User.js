/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	schema: true, //this will be doing same work as the IMPORTANT will be doing after commenting out.

  attributes: {

  	name: {
  		type:'string',
  		required:true
  	},
  	title: {
  		type:'string',
  	},
  	email: {
  		type:'string',
  		email:true,
  		required:true,
  		unique:true
  	},
  	encryptedPassword:{
  		type:'string'
  	},
/* ---------------IMPORTANT------------------
  	toJSON: function() {
  		var obj = this.toObject();
  		delete obj.password;
  		delete obj.confirmation;
  		delete obj.encryptedPassword;
  		delete obj._csrf;
  		return obj;
  	}*/

  }

};