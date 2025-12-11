document.getElementById("formLogin").addEventListener("submit", async function (e) {
    e.preventDefault(); // evita que a página recarregue

    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    msg.textContent = "Verificando...";
    msg.style.color = "black";

    try {
        const resposta = await fetch("http://127.0.0.1:8000/auth/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login_shema: {
                    email: email,
                    senha: senha
                }
            })

        });

        if (!resposta.ok) {
            msg.textContent = "Email ou senha inválidos.";
            msg.style.color = "red";
            return;
        }

        const dados = await resposta.json();

        console.log("Resposta da API:", dados);

        // Salva o token no navegador
        localStorage.setItem("access_token", dados.access_token);
        localStorage.setItem("refresh_token", dados.refresh_token);

        msg.textContent = "Login realizado!";
        msg.style.color = "green";

        // Redireciona após 1 segundo
        setTimeout(() => {
            window.location.href = "main_page.html";
        }, 1000);

    } catch (erro) {
        console.error(erro);
        msg.textContent = "Erro ao conectar com o servidor.";
        msg.style.color = "red";
    }
});


document.getElementById('formCadastro').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    // Mapeando os IDs do seu HTML
    const nome = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    const msgElement = document.getElementById('msg');

    const dadosUsuario = {
        nome: nome,
        email: email,
        senha: senha,
        ativo: true,
        admin: false
    };

    console.log("Tentando enviar para:", 'http://127.0.0.1:8000/auth/auth/criar_conta');

    try {
        // ROTA DUPLA CONFIRMADA PELO USUÁRIO
        const response = await fetch('http://127.0.0.1:8000/auth/auth/criar_conta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosUsuario)
        });

        if (response.ok) {
            const resultado = await response.json();
            msgElement.style.color = "green";
            msgElement.innerText = "Sucesso: " + resultado.mensagem;
            // Opcional: document.getElementById('formCadastro').reset();
        } else {
            // Erro vindo do Python (ex: Email já existe)
            const erro = await response.json();
            console.error("Erro do Backend:", erro);
            msgElement.style.color = "red";
            msgElement.innerText = erro.detail || "Erro ao processar cadastro.";
        }

    } catch (error) {
        // Erro de Conexão ou CORS
        console.error("ERRO CRÍTICO (FETCH):", error);
        msgElement.style.color = "red";
        msgElement.innerText = "Erro de conexão. Verifique o Console (F12) para detalhes.";
    }
});


// Arquivo: script.js

function openTab(tabId, element) {
    // 1. Esconde todo o conteúdo das abas
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // 2. Remove a classe 'active' de todos os links do menu
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // 3. Mostra o conteúdo da aba selecionada
    document.getElementById(tabId).classList.add('active');

    // 4. Adiciona a classe 'active' no link clicado
    // Verifica se 'element' foi passado (para evitar erro se chamar via código)
    if (element) {
        element.classList.add('active');
    }

    // 5. Atualiza o título da página
    const headerTitle = document.querySelector('#page-header h2');
    if(headerTitle) {
        if(tabId === 'criar') headerTitle.innerText = "O que vamos ensinar hoje?";
        if(tabId === 'perfil') headerTitle.innerText = "Configurações da Conta";
        if(tabId === 'meus-planos') headerTitle.innerText = "Biblioteca de Aulas";
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if(sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

function closeSidebarMobile() {
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}