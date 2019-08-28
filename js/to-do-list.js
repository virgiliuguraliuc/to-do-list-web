window.ToDoList = {
    API_BASE_URL: "http://localhost:8083/to-do-items",

    createItem: function () {
        var decription = $("#description-field").val();
        var deadline = $("#deadline-picker").val();


        var item = {
            description: decription,
            deadline: deadline
        };

        $.ajax({
                url: ToDoList.API_BASE_URL,
                method: "POST",
                //MIME type
                contentType: "application/json",
                data: JSON.stringify(item)
            },
        ).done(function (response) {
            console.log("Succesfully received response");
            console.log(response);
            ToDoList.getItems();
        })

    },

    getItems: function () {
        $.ajax({
                url: ToDoList.API_BASE_URL,
                method: "GET"
            }
        ).done(function (response) {
            console.log("Succesfully received response");
            console.log(response);
            ToDoList.displatItems(JSON.parse(response))
        })


    },

    deleteItem: function (ItemId) {
        $.ajax({
                url: ToDoList.API_BASE_URL + "?id=" + ItemId,
                method: "DELETE"
            }
        ).done(function (response) {
            ToDoList.getItems();
        })


    },


//ctrl+shift+enter to fix my problems (formating)
    displatItems: function (items) {
        var tableBodyHtml = '';

        items.forEach(item => tableBodyHtml += ToDoList.getItemRow(item))

        $("#to-do-items-table tbody").html(tableBodyHtml);
    },

    getItemRow: function (item) {
        //spread syntax am transformat un array in parametrii adica cifrele despartite cu virgula se transforma in parametrii pt crearea de date
        var formatedDate = new Date(...item.deadline).toLocaleDateString("en-US");

        return `<tr>
             <td>${item.description}</td>
            <td> ${formatedDate}</td>
            <td> <input type="checkbox" class="mark-done-checkbox" title="Compleated" data-id="${item.id}" /> </td>
            <td> <a href="#" class="delete-item fa fa-trash" data-id="${item.id}" ></a> </td>
        </tr>`
    },

    bindEvents: function () {
        $("#new-item-form").submit(function (event) {
            event.preventDefault();

            ToDoList.createItem();
        });
        // using delegate because the element a.delete-item is dynnamicaly injected after the page has loadead
        $("#to-do-items-table").delegate('.delete-item','click',function (event) {
            event.preventDefault();

            var ItemId = $(this).data('id');

            ToDoList.deleteItem(ItemId)
        });


    },




};
ToDoList.bindEvents();
ToDoList.getItems();