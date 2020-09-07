$(document).ready(function () {
    listUsers()
  });
  
  function listUsers() {
    $.getJSON("/api/v1/users", (data) => {
      var users = ''
      for (var i = 0; i < data.users.length; i++) {
        users += '<li class="list-group-item">' + data.users[i].FirstName + ' ' + data.users[i].LastName  + '<i class="fa fa-trash" onclick="deleteUser(' + data.users[i].ID +')"></i></li>'
      }
      $('#users').html('')
      $('#users').append(users)
    })
  }
  
  $('#add_user').on('click', (e) => {
    var firstName = $('#firstName').val()
    var lastName = $('#lastName').val()
    $.post("/api/v1/users", {"firstName" : firstName , "lastName": lastName}, (data) => {
      $('#users').prepend('<li class="list-group-item">' + data.user.FirstName + ' '  + data.user.LastName + ' <i class="fa fa-trash" onclick="deleteUser(' + data.user.ID +')"></i></li>')
    })
  })

  function deleteUser(id) { 
    $.post("/api/v1/user/delete", {"id" : id}, (data) => {
      $('#users').empty()
      listUsers()
    })
  }