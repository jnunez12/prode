$(document).ready(function(){

	$('.form-signin').validate({
		rules: {
			nombre: {
				required: true
			},
			password: {
				required: true,
				minlength: 6
			},
			passwordConfirm: {
				//equalTo: '#password'
			}
		},


	});
});