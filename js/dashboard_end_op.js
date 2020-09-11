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
                url: 'http://localhost:8000/operation/list/end',
                type: 'GET',
                beforeSend: function(xhr) {
                    $('#tbodyOp').html("<tr><td colspan='6'>Chargement en cours ...</td></tr>")
                },
                success: function(freeOp){
                    $('#tbodyOp').html("")
                    if(freeOp.length > 0){
                        for(let i = 0; i < freeOp.length; i++){
                            $('#tbodyOp').append(
                                "<tr id='trOp'>" + 
                                    "<td>" + freeOp[i].id + "</td>" +
                                    "<td>" + freeOp[i].idCustomer.name + " " + freeOp[i].idCustomer.firstname + "</td>" +
                                    "<td>" + freeOp[i].comment.substr(0, 50) + "</td>" +
                                    "<td>" + freeOp[i].startDate.substr(0, 10).replaceAll('-', '/') + "</td>" +
                                    "<td>" + freeOp[i].endDate.substr(0, 10).replaceAll('-', '/') + "</td>" +
                                    "<td>" + freeOp[i].idOperationType.label + "</td>" +                                   
                                "</tr>"
                            )
                        }
                        $('#tableEndOp').DataTable();
                    } else {
                        $('#tbodyOp').html("<tr><td colspan='6'>Aucune opération terminé</td></tr>")
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


