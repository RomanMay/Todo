$(() => {

	$('.registerButton').on('click', function (e) {
		e.preventD
		let data = {
			login: $('#name').val(),
			password: $('#password').val(),
			passwordConfirm: $('#confirmPassword').val()
		}
		console.log(data)
	})


})