const baseUrl = "http://localhost:3000"

$(document).ready(() => {
  if (localStorage.token) {
    afterLogin()
  } else {
    beforeLogin()
  }

  $("#logout").on("click", () => {
    logout()
  })
})

// logout
const logout = () => {
  $("#content").hide()
  $("#login").show()
  $("#navBtn").show()
  $("#navBtn1").show()
  localStorage.removeItem('token')
  signOut()
  hideContent()
}

// login
const login = (e) => {
  e.preventDefault()
  const email = $("#email").val()
  const password = $("#password").val()

  $.ajax({
    method: 'POST',
    url: baseUrl + '/signin',
    data: {
      email,
      password
    }
  })
    .done(response => {
      localStorage.setItem('token', response.access_token)
      afterLogin()
    })
    .fail(err => {
      console.log(err);
    })
}

// register
const register = (e) => {
  e.preventDefault()
  const name = $("#req-name").val()
  const email = $("#req-email").val()
  const password = $("#req-password").val()

  $.ajax({
    method: 'POST',
    url: baseUrl + '/signup',
    data: {
      name,
      email,
      password
    }
  })
    .done(response => {
      const token = response.access_token
      localStorage.setItem('token', token)
      $("#content").show()
      $("#login").hide()
      $("#register").hide()
      $("#navBtn").hide()
      $("#navBtn1").hide()
      afterLogin()
    })
    .fail(err => {
      console.log(err);
    })
}

// Google sign in
function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var google_access_token = googleUser.getAuthResponse().id_token;
  console.log(google_access_token, '<<< ini access_token dari google');

  $.ajax({
    method: 'POST',
    url: baseUrl + '/googlelogin',
    headers: {
      google_access_token
    }
  })
    .done(response => {
      localStorage.setItem('token', response.access_token)
      afterLogin()
    })
    .fail(err => {
      console.log(err)
    })
}

// Google sign out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  $("#content").hide()
  hideContent()
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.clear()
}

// Delete
const deleteTodo = (id) => {
  $.ajax({
    method: "DELETE",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(data => {
      fetchTodo()
    })
    .fail(err => {
      console.log(err)
    })
}

// Add Todo
$("#add-todo").submit((ev) => {
  ev.preventDefault()
  let title = $("#inputTitle").val()
  let description = $("#inputDescription").val()
  let due_date = $("#inputDate").val()
  let status = $("input[type=radio][name=status]:checked").val()
  
  $.ajax({
    method: "POST",
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      title,
      description,
      due_date,
      status
    }
  })
    .done(data => {
      fetchTodo()
      afterLogin()
    })
    .fail(err => {
      console.log(err)
    })
})

// Update Todo
const updateTodo = (id,) => {
  editTodo()
  let value = {}
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(result => {
      // console.log(result)
      value.title = result.title,
        value.description = result.description,
        value.status = result.status,
        value.due_date = result.due_date

      console.log(value)
      $("#edit-todo").empty()
      $("#edit-todo").append(`
            <h1>Edit New todos</h1>
            <form  class="mx-auto">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="editTitle">Title</label>
                        <input type="text" class="form-control" id="editTitle" name="title" value="${value.title}">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="editDescription">Description</label>
                        <input type="textbox" class="form-control" id="editDescription" name="descripton" value="${value.description}">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="editDate">Date</label>
                        <input type="date" class="form-control" id="editDate" name="due_date" 
                        value="${value.due_date.substring(0, 10)}">
                    </div>
                </div>

                <div class="row">
                    <legend class="col-form-label col-sm-2 pt-0">Status</legend>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status" id="editStatus" value="done" ${value.status === true ? "checked" : ""}>
                            <label class="form-check-label" for="status1">
                                Done
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status" id="editStatus2" value="undone" ${value.status === false ? "checked" : ""}>
                            <label class="form-check-label" for="status2">
                                Undone
                            </label>
                        </div>

                    </div>
                </div>
                <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="">Restaurant</label>
                    <input class="form-control" type="text" id="editResto" placeholder="Optional">
                </div>
            </div>
            <button type="submit" class="btn btn-danger" onclick="putTodo(${result.id}, event)">Add Tod</button>
            </form>
            <div class="mt-3">
                <button class="btn btn-danger" onclick="afterLogin()">See List Todo</button>
            </div>
            `)
    })
}

// Put
const putTodo = (id, event) => {
  event.preventDefault()
  let title = $("#editTitle").val()
  let description = $("#editDescription").val()
  let status = $("input[type=radio][name=status]:checked").val()
  let due_date = $("#editDate").val()
  console.log(id, title, description, status, due_date)
  $.ajax({
    method: "PUT",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
    .done(result => {
      fetchTodo()
      afterLogin()
    })
    .fail(err => {
      console.log(err)
    })
}

// Patch
const patchStatus = (id, event) => {
  let status = $("input[type=radio][name=status]:checked").val()
  event.preventDefault()
  $.ajax({
    method: "PATCH",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      status
    }
  })
    .done(result => {
      fetchTodo()
    })
    .fail(err => {
      console.log(err)
    })
    .always(() => {
    })
}

// Get All Todo
const fetchTodo = () => {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(dataTodo => {
      $("#listTodo").empty()
      $("#nameProfile").empty()

      $("#nameProfile").append(`<div ><h3 class="ProfileName bg-info text-white"> Your Profile ${dataTodo.name.name}</h3><div>
      <button class="btn btn-danger btn-block mb-3" onclick="addNewTodo()">Add New Todo</button>`)
      dataTodo.todo.forEach(el => {
        $("#listTodo").append(` 
      <div class="col-sm-3 mb-3 ">
        <div class="card border text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header">
            Todo Profile Name ${el.User.name}
            </div>
            <div class ="card-body">
            <span>
            <p card-text mt-0>Title </p>
            </span>
            <p class="card-text mt-0"> ${el.title}</p>
                <p class="card-text">${el.description}.</p>
                <h5 class="card-title">${new Date(el.due_date).toLocaleString(['ban', 'id'])}</h5>
                <label for="true">Status</label> : 
                <p>${el.status === true ? "done" : "undone"}</p>
                <form>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="status" value="done">
                    <label class="form-check-label" for="status1">
                        Done
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="status" value="undone">
                    <label class="form-check-label" for="status2">
                        Undone
                    </label>
                </div>
                <button type="button" class="btn btn-warning btn-sm mx-3" onclick="patchStatus(${el.id}, event)">Update Status</button>
                </form>
                <div class="my-auto">
                    <div>
                        <div class="card-footer bg-transparent border-dark">
                            <button type="button" class="btn btn-danger btn-sm my-1" id="show" onclick="deleteTodo(${el.id})">Delete</button>
                            <button type="button" class="btn btn-danger btn-sm mx-3" id="hide" onclick="updateTodo(${el.id})">Edit Todo</button>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
      </div>`)
      });
    })
    .fail(err => {
      console.log(err, "<<<<<<< masuk ke err")
    })
}

const hideContent = () => {
  $("#navBtn1").hide()
}

const afterLogin = () => {
  $("#addCard").show()
  $("#addTodo").show()
  $("#editTodo").show()
  $("#logout").show()
  $("#content").show()
  $("#navBtn").hide()
  $("#navBtn1").hide()
  $("#login").hide()
  $("#register").hide()
}

const beforeLogin = () => {
  $("#addCard").hide()
  $("#editTodo").hide()
  $("#addTodo").hide()
  $("#login").show()
  $("#content").hide()
  $("#register").hide()
  $("#navBtn1").hide()
}

const registerBtn = () => {
  $("#addCard").hide()
  $("#editTodo").hide()
  $("#addTodo").hide()
  $("#register").show()
  $("#navBtn").hide()
  $("#navBtn1").show()
  $("#content").hide()
  $("#login").hide()
}

const loginNavBtn = () => {
  $("#addCard").hide()
  $("#editTodo").hide()
  $("#addTodo").hide()
  $("#register").hide()
  $("#navBtn").show()
  $("#navBtn1").hide()
  $("#content").hide()
  $("#login").show()
}

const loginBtn = () => {
  $("#content").hide()
  $("#login").show()
  $("#register").hide()
}