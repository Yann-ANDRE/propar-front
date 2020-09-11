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
                success: function(ca){
                    console.log(ca)
                    let count = 0
                    for(let i = 0; i < ca.length; i++){
                        count = count + ca[i].idOperationType.price
                    }
                    $('#resCa').html("Le chiffre d'affaire total est de " + count + "€<br>Pour un total de " + ca.length + " opérations terminé")
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


