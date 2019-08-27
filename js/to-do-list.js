
window.ToDoList = {
    API_BASE_URL:"http://localhost:8083/to-do-items",
    
    createItem: function () {
        var decription = $("#description-field").val();
        var deadline = $("#deadline-picker").val();
        
        
        var item = {
            description:decription,
            deadline:deadline
        }
        
        $.ajax(({
            url:ToDoList.API_BASE_URL,
            method: "POST",
            //MIME type
            contentType:"application/json",
            data:JSON.stringify(item)
        }).done(function (response) {
            console.log("Succesfully received response")
            console.log(response);
        }))

    }





}