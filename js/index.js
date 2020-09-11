$.ajax({
    url: 'http://localhost:8000/operation/list/now',
    type: 'GET',

    beforeSend: function(){
        $('#tbodyNow').append("<tr><td colspan='4'>Changement ...</td></tr>")
    },
    
    success: function(data) {
        
        $('#tbodyNow').html("")
        console.log(data)
        for(let i = 0; i < data.length; i++){
            $('#tbodyNow').append(
                "<tr>" + 
                    "<td>" + data[i].id + "</td>" +
                    "<td>" + data[i].startDate.substr(0, 10).replaceAll('-', '/') + "</td>" +
                    "<td>" + data[i].idCustomer.firstname + " " + data[i].idCustomer.name + "</td>" +
                    "<td>" + data[i].idWorker.firstname + " " + data[i].idWorker.name + "</td>" +
                "</tr>"
            )
        }
        $('#tableNow').DataTable();
    },
    error: function(){
        $('#tbodyNow').html("")
        $('#tbodyNow').append("<tr><td colspan='4'>Connexion au serveur impossible réessayer plus tard ...</td></tr>")
    }
})

$.ajax({
    url: 'http://localhost:8000/operation/list/end',
    type: 'GET',

    beforeSend: function(){
        $('#tbodyEnd').append("<tr><td colspan='5'>Changement ...</td></tr>")
    },
    success: function(data) {
        
        $('#tbodyEnd').html("")
        for(let i = 0; i < data.length; i++){
            $('#tbodyEnd').append(
                "<tr>" + 
                    "<td>" + data[i].id + "</td>" +
                    "<td>" + data[i].startDate.substr(0, 10).replaceAll('-', '/') + "</td>" +
                    "<td>" + data[i].endDate.substr(0, 10).replaceAll('-', '/') + "</td>" +
                    "<td>" + data[i].idCustomer.firstname + " " + data[i].idCustomer.name + "</td>" +
                    "<td>" + data[i].idWorker.firstname + " " + data[i].idWorker.name + "</td>" +
                "</tr>"
            )
        }
        $('#tableEnd').DataTable();
    },
    error: function(){
        $('#tbodyEnd').html("")
        $('#tbodyEnd').append("<tr><td colspan='5'>Connexion au serveur impossible réessayer plus tard ...</td></tr>")
    }
})