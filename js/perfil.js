function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.left = (sidebar.style.left === "0px") ? "-250px" : "0px";
}

// Função para carregar as combinações salvas
function loadCombinations() {
    const combinations = JSON.parse(localStorage.getItem('combinations') || '[]');
    const feedGrid = document.querySelector('.feed-grid');
    
    // Limpar os itens padrão se houver combinações salvas
    if (combinations.length > 0) {
        feedGrid.innerHTML = '';
    }
    
    // Adicionar cada combinação ao feed
    combinations.forEach(comb => {
        const feedItem = document.createElement('div');
        feedItem.className = 'feed-item';
        feedItem.innerHTML = `
            <img src="${comb.topImage}" alt="Combinação ${comb.id}">
            <p>${comb.name}</p>
        `;
        feedItem.onclick = () => viewCombination(comb.id);
        feedGrid.appendChild(feedItem);
    });
}

// Função para visualizar uma combinação (pode ser expandida)
function viewCombination(id) {
    const combinations = JSON.parse(localStorage.getItem('combinations')) || [];
    const combination = combinations.find(c => c.id === id);
    
    if (combination) {
        // Aqui você pode implementar um modal ou página de detalhes
        alert(`Visualizando combinação: ${combination.name}\nData: ${combination.date}`);
    }
}

// Chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    loadCombinations(); // Adicione esta linha
});