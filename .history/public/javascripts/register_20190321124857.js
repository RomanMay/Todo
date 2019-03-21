$(() => {

	$('.registerButton').on('click', function (e) {
		e.pre
		let data = {
			login: $('#name').val(),
			password: $('#password').val(),
			passwordConfirm: $('#confirmPassword').val()
		}
		console.log(data)
	})


})