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
                let customerFirstname = $('#customerFirstname').val() 
                let customerName = $('#customerName').val()
                let customerPhone = $('#customerPhone').val()
                let startDate = $('#startDate').val()
                let comment = $('#comment').val()
                let typeOp = $('#typeOp').val()

                if(customerFirstname.length > 0 && customerName.length > 0 && customerPhone.length > 0 && startDate.length == 10 && comment.length > 0 && typeOp.length > 0){
                    $.ajax({
                        url: 'http://localhost:8000/api/operation/add',
                        type: 'POST',
                        data: {
                            'customerFirstname': customerFirstname,
                            'customerName': customerName,
                            'customerPhone': customerPhone,
                            'startDate': startDate,
                            'comment': comment,
                            'typeOp': typeOp
                        },
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('auth_token'));
                        },
                        success: function(responce){
                            if(responce.result == true){
                                location.href = "dashboard_take_op.html"
                            }
                        }
    
                    })
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


