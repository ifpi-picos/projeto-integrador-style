function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.left = (sidebar.style.left === "0px") ? "-250px" : "0px";
}

// Função para os botões do StyleFeed
function verLook(numero) {
    alert("Você clicou no Look " + numero);
}
