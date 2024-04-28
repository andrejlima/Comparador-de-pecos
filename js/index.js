let body = document.querySelector('body');

let valorA = document.querySelector('#valorA');
let valorB = document.querySelector('#valorB');
let qtA = document.querySelector('#qtA');
let qtB = document.querySelector('#qtB');

let resultA = document.querySelector('#resultA');
let resultB = document.querySelector('#resultB');
let finalResult = document.querySelector('#finalResult');

// Função para formatar o campo conforme o usuário digita

function formatarCampo(inputId) {
    // Pegar o valor do campo
    let campo = document.getElementById(inputId).value;

    // Remover qualquer caractere que não seja dígito
    campo = campo.replace(/[^\d]/g, '');

    // Verificar se há dígitos suficientes para representar os centavos
    if (campo.length > 1) {
        // Formatar o valor dos centavos
        let centavos = campo.slice(-2); // Pegar os dois últimos dígitos
        let reais = campo.slice(0, -2) || '0'; // Pegar os dígitos restantes ou '0' se não houver
        campo = reais + '.' + centavos; // Inserir ponto decimal após os dois primeiros dígitos
    } else if (campo.length === 1) {
        campo = '0.0' + campo; // Adicionar zeros para formatar corretamente (exemplo: 1 -> 0.01)
    } else {
        campo = '0.00'; // Caso não haja dígitos, definir como '0.00'
    }

    // Converter para número
    let numero = parseFloat(campo);

    // Verificar se é um número válido
    if (!isNaN(numero)) {
        // Formatar para reais com vírgulas e pontos
        let valorFormatado = (numero.toFixed(2)).toLocaleString('pt-BR');

        // Atualizar o valor do campo
        document.getElementById(inputId).value = valorFormatado;
    }
}

// Adicionar evento de entrada ao campo para chamar a função de formatação
document.getElementById("valorA").addEventListener("input", function () {
    formatarCampo("valorA");
});

document.getElementById("valorB").addEventListener("input", function () {
    formatarCampo("valorB");
});

function calculo() {
    // Pegando os valores dos inputs e convertendo para números
    let valorAFloat = Number(valorA.value);
    let qtAInt = Number(qtA.value);
    let valorBFloat = Number(valorB.value);
    let qtBInt = Number(qtB.value);

    // Verificando se algum produto tem valor zero ou negativo, ou se a quantidade é zero
    if (valorAFloat <= 0 || qtAInt <= 0 || valorBFloat <= 0 || qtBInt <= 0) {
        finalResult.innerHTML = `Os campos não podem ser vazios, com valores negativos ou zero`;
        return; // Encerra a execução da função se algum valor for zero ou negativo
    }

    // Calculando os valores por unidade
    let calcA = valorAFloat / qtAInt;
    let calcB = valorBFloat / qtBInt;

    // Calculando e exibindo qual produto é mais vantajoso
    if (calcA < calcB) {
        finalResult.innerHTML = `Levar o Produto A por R$ ${valorA.value}`;
    } else {
        finalResult.innerHTML = `Levar o Produto B por R$ ${valorB.value}`;
    }

    // Exibindo os resultados
    resultA.innerHTML = `R$ ${calcA.toFixed(2)}`;
    resultB.innerHTML = `R$ ${calcB.toFixed(2)}`;
}

//Correção exibição de data no firefox

const avisoHTML = `
    <div class="aviso" id="aviso">
        <p>Este site funciona melhor no Google Chrome ou Edge.</p>
    </div>
`;

function detectarNavegador() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Firefox") !== -1) {
        body.innerHTML += avisoHTML;
        document.getElementById("aviso").style.display = "flex";
    }
}

detectarNavegador();