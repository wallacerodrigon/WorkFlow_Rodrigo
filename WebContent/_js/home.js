$(document).ready(function(){

	$("#projetos").treeview();
}); 

function abrirTela(nome, id){
	$("#exibicao_conteudo").load(nome);
}

function efetuarLogoff(){
	$.ajax({
		url:'../login.do?acao=logoff',
		dataType:'html',
		type:'POST',
		success: function( data ){
			if (data == "sucesso"){
				window.location.href = '../index.jsp';
			} else {
				$.prompt("Erro ao efetuar logoff.");
			}
		},
		error: function( xhr, er ){
			$.prompt('Os dados n&atilde;o for&atilde;o salvos. Motivo: ' + xhr.status + ', ' + xhr.statusText + ' | ' + er);
		}
	});	
}


function novoProjeto(){
	$("#exibicao_conteudo").load("project.jsp?acao=novo");
}