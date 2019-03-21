$(() => {

	$('.registerButton').on('click', function (e) {
		e.prevent
		let data = {
			login: $('#name').val(),
			password: $('#password').val(),
			passwordConfirm: $('#confirmPassword').val()
		}
		console.log(data)
	})


})