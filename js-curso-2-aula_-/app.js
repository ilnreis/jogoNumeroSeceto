/*
----Não é errado mas é mais prático utilizar função----

//cria vaviável e linka com o h1 do html.
let titulo = document.querySelector('h1');

//Atribui o texto da variável título dentro h1 do documento html.
titulo.innerHTML = 'Número Secreto';

//cria vaviável e linka com o p do html.
let paragrafo = document.querySelector('p');

//Atribui o texto da variável paragrafo dentro de p do documento html.
paragrafo.innerHTML = 'Escolha um número entre 1 e 5000';
*/
let listaNumeroSorteado = [];
let numlimite = 10
let numeroSecreto = gerarNumRandom();
let tentativas = 1;

function exibirTextoTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    responsiveVoice.speak(texto, 'Brazilian Portuguese Femaile', {rate:1.2});
}

function mensagemInicial(){
    exibirTextoTela('h1', 'Jogo do número secreto');
    exibirTextoTela('p', 'Escolha um número de 1 a 10');
}

mensagemInicial();


function verificarResposta(){
    let resposta = document.querySelector('input').value;

    if(resposta == numeroSecreto){
        exibirTextoTela('h1', 'Acertou!');

        let palavraTentativas =  tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        
        exibirTextoTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled'); 
    } else {
        if(resposta > numeroSecreto){
            exibirTextoTela('p', 'O número secreto é menor.');
        } else{
            exibirTextoTela('p', 'O numero secreto é maior.');
        }

        tentativas++;

        limparCampo();
    } 
}

function gerarNumRandom() {
    let numeroEscolhido = parseInt(Math.random() * numlimite.length + 1);
    let qtdElementosLista = listaNumeroSorteado.length;
    
    if (qtdElementosLista == numlimite){
        listaNumeroSorteado = [];
    }

    if(listaNumeroSorteado.includes(numeroEscolhido)){
        return gerarNumRandom();
    } else{
        listaNumeroSorteado.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    resposta = document.querySelector('input');
    resposta.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumRandom();
    
    limparCampo();

    tentativas = 1;

    mensagemInicial();

    document.getElementById('reiniciar').setAttribute('disabled', true);
    
}