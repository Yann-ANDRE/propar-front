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
                url: 'http://localhost:8000/api/worker/get/all',
                type: 'GET',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('auth_token'));
                    $('#tbodyOp').html("<tr><td colspan='6'>Chargement en cours ...</td></tr>")
                },
                success: function(workers){
                    $('#tbodyOp').html("")
                    if(workers.length > 0){
                        for(let i = 0; i < workers.length; i++){
                            $('#tbodyOp').append(
                                "<tr>" + 
                                    "<td>" + workers[i].id + "</td>" +
                                    "<td>" + workers[i].firstname + " " + workers[i].name + "</td>" +
                                    "<td>" + workers[i].username + "</td>" +
                                    "<td>" + workers[i].recruitmentDate.substr(0, 10).replaceAll('-', '/') + "</td>" +
                                    "<td>" + workers[i].role + "</td>" +
                                    "<td>" + workers[i].operations.length + "</td>" +

                                "</tr>"
                            )
                        }
                    } else {
                        $('#tbodyOp').html("<tr><td colspan='6'>Aucun employé</td></tr>")
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


