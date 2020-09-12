if(localStorage.getItem('auth_token')){
    $.ajax({
        url: 'http://localhost:8000/api/worker/get',
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('auth_token'));
        },
        success: function(data){

            $('#userInfo').html(data.firstname + " " + data.name + " / " + data.role)
            if(data.role == "Expert"){
                $('#sidebar').append('<a class="sidebar-link" href="view_ca.html">Chiffre d\'affaire</a>')
                $('#sidebar').append('<a class="sidebar-link" href="dashboard_add_worker.html">Ajouter un employé</a>')
                $('#sidebar').append('<a class="sidebar-link" href="dashboard_list_worker.html">Liste des employés</a>')
            }

            $('#addOpSubmit').click(function(e){
                e.preventDefault()
                let workerFirstname = $('#workerFirstname').val() 
                let workerName = $('#workerName').val()
                let workerUsername = $('#workerUsername').val()
                let workerPassword = $('#workerPassword').val()
                let workerPasswordConfirm = $('#workerPasswordConfirm').val()
                let workerRole = $('#workerRole').val()

                if(workerFirstname.length > 0 && workerName.length > 0 && workerUsername.length > 0 && workerPassword.length > 0 && workerPasswordConfirm.length > 0 && workerRole.length > 0){
                    if(workerPassword == workerPasswordConfirm){
                        $.ajax({
                            url: 'http://localhost:8000/api/worker/add',
                            type: 'POST',
                            data: {
                                'workerFirstname': workerFirstname,
                                'workerName': workerName,
                                'workerUsername': workerUsername,
                                'workerPassword': workerPassword,
                                'workerPasswordConfirm': workerPasswordConfirm,
                                'workerRole': workerRole
                            },
                            beforeSend: function(xhr) {
                                xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('auth_token'));
                            },
                            success: function(responce){
                                if(responce.result == true){
                                    location.href = "dashboard_take_op.html"
                                } else {
                                    $('#error').html("Une erreur c'est produite merci de vérifier les données inserées")
                                }
                            }
        
                        })
                    } else {
                        $('#error').html("Le mot de passe de confirmation de correspond pas au mot de passe")
                    }
                    
                } else {
                    $('#error').html("Merci de remplir correctement les champs ci-dessous")
                }
            })
            
        }
    })
        

    $('#sidebarBtn').click(function(){
        $('#sidebar').toggleClass('active')
    })
} else {
    location.href = "login.html"
}


