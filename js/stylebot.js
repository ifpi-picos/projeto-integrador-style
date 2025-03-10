// Respostas do StyleBot (agora mais completas)
const respostas = {
    "Como funciona o app Style?": 
        "🛍️ O Style é um aplicativo inovador que ajuda você a encontrar as melhores tendências de moda. " +
        "Com ele, você pode receber sugestões personalizadas, acompanhar as últimas novidades do mundo fashion " +
        "e até mesmo comprar peças diretamente pelo app! Quer saber mais sobre alguma funcionalidade específica?",

    "Criar uma conta no Style": 
        "📌 Criar uma conta no Style é bem simples! Basta acessar o site oficial ou baixar o aplicativo. " +
        "Depois, clique em 'Criar Conta' e preencha seu nome, e-mail e senha. Você também pode conectar sua conta " +
        "com o Google ou Facebook para facilitar o acesso. Após isso, personalize seu perfil com seus gostos " +
        "e preferências para receber recomendações personalizadas! Quer ajuda com alguma etapa?",

    "O app é gratuito?": 
        "💰 O Style oferece uma versão gratuita e uma versão premium. \n\n" +
        "🔹 **Versão Gratuita**: Você pode explorar tendências, receber sugestões básicas e visualizar conteúdos da comunidade. \n" +
        "🔹 **Versão Premium**: Acesso a sugestões avançadas, descontos exclusivos em lojas parceiras e um suporte personalizado. \n\n" +
        "Caso queira experimentar a versão premium, há um período de teste gratuito! Quer saber mais detalhes sobre os planos?",

    "Instagram do Style": 
        "📸 O Instagram oficial do Style é **@style_oficial**. \n\n" +
        "Lá você encontra dicas de moda, looks inspiradores e pode interagir com a comunidade fashion! " +
        "Acompanhe os stories para ficar por dentro das promoções exclusivas e eventos especiais. \n\n" +
        "Se quiser, posso te ajudar a seguir o perfil pelo link direto. 😊",

    "Novidades do Style": 
        "🚀 As últimas novidades do Style incluem:\n\n" +
        "🔹 **Nova parceria com grandes marcas**: Agora você pode comprar diretamente pelo app com desconto exclusivo. \n" +
        "🔹 **Recomendações por IA**: O StyleBot sugere roupas baseadas no seu estilo e preferências. \n" +
        "🔹 **Feeds personalizados**: Descubra tendências que combinam com você sem precisar procurar! \n\n" +
        "Quer saber mais sobre alguma dessas novidades?"
};

// Função para enviar mensagem
function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;

    addMessage(userInput, "user-message");

    // Adiciona a animação de digitação
    showTypingAnimation();

    // Simula tempo de resposta
    setTimeout(() => {
        removeTypingAnimation();
        const resposta = respostas[userInput] || "🤖 Não entendi! Escolha uma opção no menu ou reformule sua pergunta.";
        addMessage(resposta, "bot-message");
    }, 1500);

    document.getElementById("userInput").value = "";
}

// Adicionar mensagens no chat
function addMessage(text, className) {
    const chatBox = document.getElementById("chatBox");
    const message = document.createElement("div");
    message.classList.add(className);
    message.innerHTML = `<p>${text.replace(/\n/g, "<br>")}</p>`; // Mantém quebras de linha
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Animação de digitação do bot
function showTypingAnimation() {
    const chatBox = document.getElementById("chatBox");
    const typingMessage = document.createElement("div");
    typingMessage.classList.add("bot-message", "typing-animation");
    typingMessage.innerHTML = `<p>Digitando...</p>`;
    typingMessage.id = "typing";
    chatBox.appendChild(typingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Remover animação de digitação
function removeTypingAnimation() {
    const typingMessage = document.getElementById("typing");
    if (typingMessage) typingMessage.remove();
}

// Evento de clique para os itens do menu
document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", function() {
        const pergunta = this.textContent.replace("📌 ", "").trim();
        sendQuestion(pergunta);
    });
});

// Função para iniciar chat ao clicar em uma pergunta do menu
function sendQuestion(question) {
    addMessage(question, "user-message");

    showTypingAnimation();

    setTimeout(() => {
        removeTypingAnimation();
        addMessage(respostas[question] || "🤖 Não entendi! Escolha outra opção.", "bot-message");
    }, 1500);
}
