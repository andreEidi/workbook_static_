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