$(document).ready(function(){
    $('#add_category').submit(addCategory);
});

var API_key = 'DW63ivcBz6-Z02DPFc8e-unZ9FuGLygB';
function getCategories(){
    $.get('https://api.mlab.com/api/1/databases/taskmanager/collections/categories?apiKey='+API_key
          ,function(data){
              var output = '<ul class="list-group">';
              $.each(data,function(key,data){
                  output += '<li class="list-group-item category">' +
                  data.category_name +
                  '<div class="pull-right">' +
                  '<a class="btn btn-primary btn-edit-category" data-category-id="'+data._id.$oid+'">Edit</a>' +
                  ' <a class="btn btn-danger btn-delete-category" data-category-id="'+data._id.$oid+'">Delete</a>' +
                  '</div>'
                  '</li>';
              })
              output + '</ul>';
              $('#categories').html(output);
          });
}

function addCategory(){
    var category_name = $('#category_name').val();

    $.ajax( {
      url: "https://api.mlab.com/api/1/databases/taskmanager/collections/categories?apiKey="+API_key,
    	data: JSON.stringify( { "category_name" : category_name } ),
    	type: "POST",
    	contentType: "application/json" ,
      success: function(data){
        window.location.href = 'categories.html';
      },
      error: function(xhr,status,err){
        console.log(err);
      }
    }
      );
      return false;
}
