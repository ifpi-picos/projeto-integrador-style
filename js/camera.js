
// Função para alternar o menu lateral
 function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('active');
        }

        // Função para fazer logout
function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            window.location.href = 'entrar.html';
        }

        // Função para carregar os dados do usuário
        async function loadUserData() {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Você precisa estar logado para acessar esta página');
                window.location.href = 'entrar.html';
                return;
            }

            try {
                // Buscar dados do usuário
                const userResponse = await fetch('https://backend-style-btm7.onrender.com/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    document.querySelector('.profile-info h2').textContent = userData.name;
                    document.querySelector('.profile-info p').textContent = `@${userData.name.toLowerCase().replace(' ', '')}`;
                }

                // Buscar preferências do usuário
                const preferencesResponse = await fetch('https://backend-style-btm7.onrender.com/preferences', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (preferencesResponse.ok) {
                    const preferencesData = await preferencesResponse.json();
                    // Atualizar a bio
                    document.querySelector('.profile-info .bio').textContent = 
                        `${preferencesData.estiloPrincipal} | ${preferencesData.ocasiaoComum}`;

                    // Preencher a seção de preferências
                    const preferencesList = document.getElementById('preferences-list');
                    preferencesList.innerHTML = `
                        <div class="preference-item">
                            <span class="preference-label">Tipo Corporal:</span>
                            <span class="preference-value">${preferencesData.tipoCorporal}</span>
                        </div>
                        <div class="preference-item">
                            <span class="preference-label">Formato Corporal:</span>
                            <span class="preference-value">${preferencesData.formatoCorporal}</span>
                        </div>
                        <div class="preference-item">
                            <span class="preference-label">Estilo Principal:</span>
                            <span class="preference-value">${preferencesData.estiloPrincipal}</span>
                        </div>
                        <div class="preference-item">
                            <span class="preference-label">Peça Frequente:</span>
                            <span class="preference-value">${preferencesData.pecaFrequente}</span>
                        </div>
                        <div class="preference-item">
                            <span class="preference-label">Cor Preferida:</span>
                            <span class="preference-value">${preferencesData.corPreferida}</span>
                        </div>
                        <div class="preference-item">
                            <span class="preference-label">Estilo a Evitar:</span>
                            <span class="preference-value">${preferencesData.estiloEvitar}</span>
                        </div>
                        <div class="preference-item">
                            <span class="preference-label">Ocasião Comum:</span>
                            <span class="preference-value">${preferencesData.ocasiaoComum}</span>
                        </div>
                    `;
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                alert('Erro ao carregar dados do perfil');
            }
        }

        // Função para ver um look específico
function verLook(lookId) {
            alert(`Em breve você poderá ver mais detalhes do Look ${lookId}!`);
        }

        // Carregar dados quando a página carregar
        document.addEventListener('DOMContentLoaded', loadUserData);




function saveCombination() {
    const file1 = document.getElementById('camera1').files[0];
    const file2 = document.getElementById('camera2').files[0];
    
    if (!file1 || !file2) {
        showError('Selecione ambas as imagens!');
        return;
    }

    const reader1 = new FileReader();
    const reader2 = new FileReader();
    
    reader1.onload = function(e) {
        reader2.onload = function(e2) {
            // Criar um objeto para a combinação
            const combination = {
                id: Date.now(), // ID único baseado no timestamp
                topImage: reader1.result,
                bottomImage: reader2.result,
                date: new Date().toLocaleDateString(),
                name: `Combinação ${localStorage.getItem('combinationCount') || 1}`
            };
            
            // Salvar no localStorage
            let combinations = JSON.parse(localStorage.getItem('combinations') || '[]');
            combinations.push(combination);
            localStorage.setItem('combinations', JSON.stringify(combinations));
            
            // Atualizar contador
            localStorage.setItem('combinationCount', combinations.length);
            
            showSuccess('Combinação salva com sucesso!');
            
            // Redirecionar após 2 segundos
            setTimeout(() => {
                window.location.href = 'perfil.html';
            }, 2000);
        };
        reader2.readAsDataURL(file2);
    };
    reader1.readAsDataURL(file1);
}

function showError(message) {
    const successMessage = document.getElementById('success-message');
    successMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>${message}</span>`;
    successMessage.style.background = '#d63031';
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}