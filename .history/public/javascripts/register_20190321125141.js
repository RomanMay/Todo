$(() => {

	$('.registerButton').on('click', function (e) {
		e.preventDefault()

		let data = {
			login: $('#name').val(),
			password: $('#password').val(),
			passwordConfirm: $('#confirmPassword').val()
		}
		console.log(data)
	})
	$.ajax({
		type: 'POST'
	})


})