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

const hideContent = () => {
  $("#navBtn1").hide()
}

const afterLogin = () => {
  $("#logout").show()
  $("#content").show()
  $("#navBtn").hide()
  $("#navBtn1").hide()
  $("#login").hide()
  $("#register").hide()
}

const beforeLogin = () => {
  $("#login").show()
  $("#content").hide()
  $("#register").hide()
  $("#navBtn1").hide()
}

const registerBtn = () => {
  $("#register").show()
  $("#navBtn").hide()
  $("#navBtn1").show()
  $("#content").hide()
  $("#login").hide()
}

const loginNavBtn = () => {
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