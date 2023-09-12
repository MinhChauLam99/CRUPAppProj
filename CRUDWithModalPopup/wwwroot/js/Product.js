$(document).ready(function () {
    GetProducts()
});

/*Read Data*/
function GetProducts() {
    $.ajax({
        url: '/products/GetProducts',
        type: 'get',
        datatype: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            if (!response || response.length == 0)
            {
                var object = '';
                object += '<tr>';
                object += '<td colspan="5" >' + 'Products not available' + '</td>';
                object += '<tr>';
                $('#tblBody').html(object);
            }
            else {
                var object += '';
                $.each(response, function (index, item) {
                    object += '<tr>';
                    object += '<td>' + item.id + '</td>';
                    object += '<td>' + item.productName + '</td>';
                    object += '<td>' + item.price + '</td>';
                    object += '<td>' + item.quantity + '</td>';
                    object += '<td> <a href="#" class="btn btn-primary btn-sm" onclick="Edit(' + item.id + ')">Edit</a> </n> <a href="#" class="btn btn-danger btn-sm" onclick="Delete(' + item.id + ')">Delete</a>';
                });
                $('#tblBody').html(object);
            }
        },
        error: function (errors) {
            console.log(errors)
            alert('Unable to read the data.');
        }
    });
}


$('#btnAdd').click(function () {
    $('#ProductsModal').modal('show');
    $('#modalTitle').text('Add Product');
});

/* Insert Data*/
function Insert() {
    var result = Validate();
    if (result = false) {
        return false;
    }


    var formData = new Object();
    formData.id = $('#Id').val();
    formData.productName = $('#ProductName').val();
    formData.price = $('#Price').val();
    formData.quantity = $('#Quantity').val();

    $.ajax({
        url: '/products/Insert',
        data: formData, 
        type: 'post',
        success: function (response) {
            if (!response || response.length == 0) {
                alert('Unable to save the data.');
            }
            else {
                HideModal();
                GetProducts();
                alert(response);
            }
        },
        Error: function() {
            alert('Unable to save the data.');
        }
    });
}

function HideModal() {
    ClearData();
    $('#ProductsModal').modal('hide');
}

function ClearData() {
    $('#ProductName').val('');
    $('#Price').val('');
    $('#Quantity').val('');

    $('#ProductName').css('border-color', 'lightgrey');
    $('#Price').css('border-color', 'lightgrey');
    $('#Quantity').css('border-color', 'lightgrey');

}

function Validate() {
    var isValid = true;

    if ($('#ProductName').val().trim() == "") {
        $('#ProductName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductName').css('border-color', 'lightgrey');
    }
    if ($('#Price').val().trim() == "") {
        $('#Price').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Price').css('border-color', 'lightgrey');
    }
    if ($('#Quantity').val().trim() == "") {
        $('#Quantity').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Quantity').css('border-color', 'lightgrey');
    }
    return isValid;
}


$('#ProductName').change(function(){
    Validate();
})
$('#Price').change(function(){
    Validate();
})
$('#Quantity').change(function(){
    Validate();
})

/* Edit */
function Edit(id) {
    $.ajax({
        url: 'products/Edit?id=' + id,
        type: 'get',
        contentType: 'application/json;charset=utf-8',
        datatype: 'json',
        success: function (response) {
            if (response == null || response == undefined) {
                alert('Unable to read the data.');
            } else if (response.length == 0) {
                alert('Data not available with the id.' + id);
            } else {
                $('#ProductsModal').modal('show');
                $('#modalTitle').text('Update Product');
                $('#Save').css('display', 'none');
                $('#Update').css('display', 'block');
                $('#Id').val(response.id);
                $('#ProductName').val(response.productName);
                $('#Price').val(response.price);
                $('#Quantity').val(response.quantity);
            }
        },
        error: function () {
            alert('Unable to read the data.');
        }
    });
}

/* Update Data */
function Update() {
    result = Validate();
    if (result = false) {
        return false;
    }
    var formData = new Object();
    formData.id = $('#Id').val();
    formData.productName = $('#ProductName').val();
    formData.price = $('#Price').val();
    formData.quantity = $('#Quantity').val();

    $.ajax({
        url: '/products/Update',
        data: formData,
        type: 'post',
        success: function (response) {
            if (!response || response.length == 0) {
                alert('Unable to save the data.');
            }
            else {
                HideModal();
                GetProducts();
                alert(response);
            }
        },
        Error: function () {
            alert('Unable to save the data.');
        }
    });
}

/* Delete Data */
function Delete(id) {
    if (confirm('Are you sure to delete this record?')) {
        $.ajax({
            url: 'products/Delete?id=' + id,
            type: 'post',
            datatype: 'json',
            success: function (response) {
                if (response == null || response == undefined) {
                    alert('Unable to delete the data.');
                } else {
                    GetProducts();
                    alert(response);
                }
            },
            error: function () {
                alert('Unable to delete the data.');
            }
        });

    }
}