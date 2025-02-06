function register() {
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const user = {
    name,
    email,
    password
  }

  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(response => {
    response.json().then(data => {
      console.log("Usuário cadastrado com sucesso: ", data)
      window.location.href = '/entrar.html'
    })
  }).catch(error => {
    console.log("Erro ao cadastrar usuário: ", error)
  })

}

function login() {
  const email = document.querySelector('#e-mail').value;
  const password = document.querySelector('#senha').value;

  const user = {
    email,
    password
  }

  console.log(user)

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(response => {
    response.json().then(data => {
      console.log("Usuário logado com sucesso: ", data)
      const { user, token } = data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      window.location.href = '/formulario.html'
    })
  }).catch(error => {
    console.log("Erro ao logar usuário: ", error)
  })
}

function getUsers() {
  const user = JSON.parse(localStorage.getItem('user'))
  const userH1 = document.querySelector('h1')
  userH1.innerHTML = `Bem vindo, ${user.name}`

  fetch('http://localhost:3000/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }).then(response => {
    response.json().then(data => {
      console.log("Usuários: ", data)
      const users = document.querySelector('#users')
      users.innerHTML = ''
      data.forEach(user => {
        users.innerHTML += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
          </tr>`
      })
    })
  }).catch(error => {
    console.log("Erro ao buscar usuários: ", error)
  })
}