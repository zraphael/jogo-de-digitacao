var tempoInicial = $("#tempo").text();
var campo = $(".campo-digitacao");

$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var  frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanhoFrase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on("input",function() {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}


function inicializaCronometro() {
    var tempoRestante = $("#tempo").text();
    campo.one("focus", function() {
        var cronometroId = setInterval(function() {
            tempoRestante--;
            $("#tempo").text(tempoRestante);
            if(tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroId);
                campo.toggleClass("campo-desativado");
            }
        },1000);
    });
}

var frase = $(".frase").text();
campo.on("input", function() {
    var digitado = campo.val();
    var comparavel = frase.substr(0, digitado.length);
    console.log("Digitado:" + digitado);
    console.log("Frase C.:" + comparavel);
    if(digitado == comparavel) {
        campo.addClass("borda-verde");
        campo.removeClass("borda-vermelha");
    }else{
        campo.addClass("borda-vermelha");
        campo.removeClass("borda-verde");
    }
})

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}
