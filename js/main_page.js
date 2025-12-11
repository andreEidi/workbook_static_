// --- FUNÇÕES DE NAVEGAÇÃO GERAL (Sidebar) ---

function openTab(tabId, element) {
    // 1. Esconde todo o conteúdo das abas principais
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
    if (element) {
        element.classList.add('active');
    }

    // 5. Atualiza o título da página
    const headerTitle = document.querySelector('#page-header h2');
    if (headerTitle) {
        if (tabId === 'criar') headerTitle.innerText = "O que vamos ensinar hoje?";
        if (tabId === 'perfil') headerTitle.innerText = "Configurações da Conta";
        if (tabId === 'meus-planos') headerTitle.innerText = "Biblioteca de Aulas";
    }
}

// Funções para Mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

function closeSidebarMobile() {
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}


// --- LÓGICA DO MOCK E RESULTADOS ---

// Dados Mockados (Simulando o retorno da API)
const mockApiResponse = {
    plano_aula: `
# Plano de Aula: Simple Present

**Objetivo:** Ensinar a estrutura e uso do Simple Present para rotinas.
**Duração:** 60 minutos
**Nível:** Iniciante (A1)

## Cronograma
1. **Warm-up (10 min):** Perguntar aos alunos o que eles fazem todos os dias.
2. **Explicação (20 min):**
   * Sujeito + Verbo (I work, You work)
   * He/She/It + S (She works)
3. **Prática (20 min):** Exercícios de preencher lacunas.
4. **Wrap-up (10 min):** Jogo de perguntas e respostas.

## Notas para o Professor
* Focar na pronúncia do 'S' na terceira pessoa.
* Usar exemplos da vida real dos alunos.
`,
    workbook: `
# Workbook: Simple Present Exercises

**Nome do Aluno:** _______________________
**Data:** __/__/____

## 1. Complete as frases
Preencha as lacunas com a forma correta do verbo entre parênteses.

1. She _______ (to like) pizza.
2. They _______ (to play) soccer every Sunday.
3. It _______ (to rain) a lot here.
4. I _______ (to study) English online.

## 2. Escreva sobre sua rotina
Escreva 3 frases sobre o que você faz pela manhã.
* ________________________________________________
* ________________________________________________
* ________________________________________________

**Dica:** Lembre-se de usar verbos como *wake up, brush teeth, have breakfast*.
`
};

// Função chamada ao clicar no botão "Gerar Agora"
function gerarConteudoMock() {
    // 1. Esconde os cards e mostra o loading
    document.getElementById('initial-cards').style.display = 'none';
    document.getElementById('loading-area').style.display = 'block';
    document.getElementById('results-area').style.display = 'none';

    // 2. Simula um atraso de rede (2 segundos)
    setTimeout(() => {
        // 3. Processa o retorno (renderiza Markdown para HTML)
        const htmlPlano = marked.parse(mockApiResponse.plano_aula);
        const htmlWorkbook = marked.parse(mockApiResponse.workbook);

        // 4. Injeta o HTML nas divs correspondentes
        document.getElementById('content-plano').innerHTML = htmlPlano;
        document.getElementById('content-workbook').innerHTML = htmlWorkbook;

        // 5. Esconde loading e mostra resultados
        document.getElementById('loading-area').style.display = 'none';
        document.getElementById('results-area').style.display = 'block';

        // Garante que a primeira aba (Plano) esteja ativa
        switchResultTab('plano');

    }, 2000); // 2000ms = 2 segundos
}

// Alterna entre as abas de resultado (Plano vs Workbook)
function switchResultTab(type) {
    // Remove active dos botões
    document.querySelectorAll('.result-tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Remove active dos conteúdos
    document.querySelectorAll('.markdown-content').forEach(content => content.classList.remove('active'));

    // Ativa o botão clicado (lógica simples baseada no onclick do HTML)
    const buttons = document.querySelectorAll('.result-tab-btn');
    if(type === 'plano') buttons[0].classList.add('active');
    if(type === 'workbook') buttons[1].classList.add('active');

    // Ativa o conteúdo correto
    document.getElementById(`content-${type}`).classList.add('active');
}

// Reseta a tela para gerar um novo (Voltar para os cards)
function resetarVisualizacao() {
    document.getElementById('results-area').style.display = 'none';
    document.getElementById('initial-cards').style.display = 'grid';
    
    // Limpa os conteúdos (opcional)
    document.getElementById('content-plano').innerHTML = '';
    document.getElementById('content-workbook').innerHTML = '';
}