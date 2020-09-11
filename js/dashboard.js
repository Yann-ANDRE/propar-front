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

            $.ajax({
                url: 'http://localhost:8000/api/now_operation_for_worker/' + data.id,
                type: 'GET',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('auth_token'));
                    $('#tbodyOp').html("<tr><td colspan='6'>Chargement en cours ...</td></tr>")
                },
                success: function(nowOp){
                    $('#tbodyOp').html("")
                    if(nowOp.length > 0){
                        for(let i = 0; i < nowOp.length; i++){
                            $('#tbodyOp').append(
                                "<tr>" + 
                                    "<td>" + nowOp[i].id + "</td>" +
                                    "<td>" + nowOp[i].idCustomer.name + " " + nowOp[i].idCustomer.firstname + "</td>" +
                                    "<td>" + nowOp[i].comment.substr(0, 50) + "</td>" +
                                    "<td>" + nowOp[i].startDate.substr(0, 10).replaceAll('-', '/') + "</td>" +
                                    "<td>" + nowOp[i].idOperationType.label + "</td>" +
                                    "<td><a class='table-link' href='" + nowOp[i].id + "' id='endOperation-" + nowOp[i].id + "'>Terminer l'opération</a></td>" +
                                "</tr>"
                            )
                            $('#endOperation-' + nowOp[i].id).click(function(e){
                                e.preventDefault()
                                $.ajax({
                                    url: 'http://localhost:8000/api/end_operation/' + nowOp[i].id,
                                    type: 'POST',
                                    beforeSend: function(xhr) {
                                        xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('auth_token'));
                                    },
                                    success: function(data) {
                                        location.reload()
                                    }
                                })
                            })
                        }
                    } else {
                        $('#tbodyOp').html("<tr><td colspan='6'>Aucune opération en cours</td></tr>")
                    }
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


