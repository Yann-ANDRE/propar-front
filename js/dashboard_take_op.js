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
                url: 'http://localhost:8000/api/get_free_operation',
                type: 'GET',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('auth_token'));
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
                                    "<td>" + freeOp[i].idOperationType.label + "</td>" +                                   
                                "</tr>"
                            )
                            let nowWorkerOp = []
                            for(let i = 0; i < data.operations.length; i++){
                                if(data.operations[i].endDate == null){
                                    nowWorkerOp.push(data.operations[i])
                                }
                            }
                            if(nowWorkerOp.length < 5 && data.role == "Expert"){
                                $('#trOp').append("<td><a class='table-link' href='" + freeOp[i].id + "' id='takeOperation-" + freeOp[i].id + "'>Prendre l'opération</a></td>")
                            } else if(nowWorkerOp.length < 3 && data.role == "Senior"){
                                $('#trOp').append("<td><a class='table-link' href='" + freeOp[i].id + "' id='takeOperation-" + freeOp[i].id + "'>Prendre l'opération</a></td>")
                            } else if(nowWorkerOp.length < 1 && data.role == "Apprenti"){
                                $('#trOp').append("<td><a class='table-link' href='" + freeOp[i].id + "' id='takeOperation-" + freeOp[i].id + "'>Prendre l'opération</a></td>")
                            }
                            $('#takeOperation-' + freeOp[i].id).click(function(e){
                                e.preventDefault()
                                $.ajax({
                                    url: 'http://localhost:8000/api/take_operation/' + data.id + '/' + freeOp[i].id,
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
                        $('#tableFreeOp').DataTable();
                    } else {
                        $('#tbodyOp').html("<tr><td colspan='6'>Aucune opération disponible</td></tr>")
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


