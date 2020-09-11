$('#submit-login').click(function(e){
    e.preventDefault()
    let username = $('#username').val()
    let password = $('#password').val()

    if(username.length > 0 && password.length > 0){
        let data = {
            "username": username,
            "password": password
        }
        
        formData = JSON.stringify(data)
        $.ajax({
            url: 'http://localhost:8000/api/login_check',
            type: 'POST',
            data: formData,
            dataType: "json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(data){
                localStorage.setItem('auth_token', data.token)
                location.href = "dashboard.html"
            },
            error: function(){
                $('#errorMsg').html("Erreur de connexion au serveur<br>merci de réessayer plus tard")
            }
        })
    } else {
        $('#errorMsg').html("Merci de remplir les champs ci-dessous")
    }
})