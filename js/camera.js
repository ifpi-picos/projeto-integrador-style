function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show-menu');
}

function showFileName(input) {
    const fileName = input.files[0]?.name || 'Nenhum arquivo escolhido';
    const fileLabel = input.nextElementSibling;
    fileLabel.textContent = fileName;
}

function showSuccess(buttonType) {
    const message = buttonType === 'salvar' ? 'Dados salvos com sucesso!' : 'Finalização concluída!';
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 2000);
}

function animateButton(icon) {
    const allIcons = document.querySelectorAll('.icon');
    allIcons.forEach(i => i.classList.remove('active'));
    icon.classList.add('active');
}
