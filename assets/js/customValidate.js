$(document).ready(function(){

$('.form-signin').validate({
	rules: {
		name : {
			required:true
		},
		email: {
			required:true,
			email:true
		},
		password: {
			minlength: 6,
			required:true
		},
		encryptedPassword: {
			minlength: 6,
			equalTo: "#password"
		}
	},

	success: function (element) {
		element
		.text('OK!').addClass('valid')
	}

});

});