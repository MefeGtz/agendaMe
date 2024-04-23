
//$("#add_task").submit(function (event) {
//  alert("Se inserto correctamente!");
//})

//se modifica porque no se utilizara axiox
$("#update_tas").submit(function (event) {
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })
    var request = {
        "url": `http://localhost:3000/api/tasks/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        location.replace('/')
        //alert("Datos actualizados correctamente!");
    })

})


$("#update_task1").submit(function (event) {
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })

    var request = {
        "url": `http://localhost:3000/api/tasks/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request)
        .done(function (response) {
            location.replace('/');
            //alert("Datos actualizados correctamente!");
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            // Aquí manejas el error
            // Por ejemplo, puedes renderizar otra vista con los errores
            var errors = jqXHR.responseJSON.errors; // Suponiendo que la API devuelve los errores en un objeto JSON con la clave 'errors'
            renderErrorsView(errors); // Llama a una función para renderizar la vista de errores y pasa los errores como parámetro
        });
});

function renderErrorsView(errors) {
    // Aquí defines cómo renderizar la vista de errores con los errores recibidos
    // Puedes usar jQuery para actualizar el DOM y mostrar los errores al usuario
    // Por ejemplo:
    var errorList = "<ul>";
    for (var field in errors) {
        errorList += "<li>" + field + ": " + errors[field] + "</li>";
    }
    errorList += "</ul>";

    // Suponiendo que tienes un div con id 'error-messages' donde mostrar los errores
    $('#error-messages').html(errorList);
}

function confirmar(id) {
    Swal.fire({
        title: '¿Confirma eliminar el registro: ' + id + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Confirmar'
    }).then((result) => {
        if (result.isConfirmed) {
            // window.location = '/delete/'+id;                              
        }
    });
};

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/tasks/${id}`,
            "method": "DELETE"
        }

        Swal.fire({
            title: '¿Confirma eliminar el registro: ' + id + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.isConfirmed) {
                // window.location = '/delete/'+id;  
                $.ajax(request).done(function (response) {
                    // alert("registro eliminado!");
                    location.reload();
                });
            }
        });
    });
}
if (window.location.pathname == "/usuarios") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": "DELETE"
        }

        Swal.fire({
            title: '¿Confirma eliminar el usuario ' + id + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.isConfirmed) {
                // window.location = '/delete/'+id;  
                $.ajax(request).done(function (response) {
                    // alert("registro eliminado!");
                    location.reload();
                });
            }
        });
    });
}
/* 
if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/tasks/${id}`,
            "method": "DELETE"
        }
        

        if (confirm("desea eliminar el registro?")) {
            $.ajax(request).done(function (response) {
                alert("registro eliminado!");
                location.reload();
            })
        }
    })
} */