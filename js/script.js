// script.js
function validateForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === "" || password === "") {
        alert("Todos os campos devem ser preenchidos!");
        return false;
    }
    // Mais validações podem ser adicionadas aqui
    return true;
}
