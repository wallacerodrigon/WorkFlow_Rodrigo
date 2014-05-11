$(document).ready(function(){

	$("#projetos").treeview();
	
	$("#formInclusaoItem").dialog({
		
		autoOpen:false,
		width: 300, 
		height: 50,
		modal:false
	});
	
	
}); 

function abrirTela(nome, id){
	var nomeServlet = "";
	var paramsServlet = new Object();
	
	if (nome == "projeto"){
		nomeServlet = "../project.do";
		paramsServlet = "idProjeto="+id;
		nome = "project.jsp";
	} else if (nome == "experimento"){
		nomeServlet = "../experiment.do";
		paramsServlet = "idExperimento="+id;
		nome = "experiments.jsp";
	} else if (nome == "atividade"){
		nomeServlet = "../activity.do";
		paramsServlet = "idAtividade="+id;
		nome = "activity.jsp";
	} else {
		$.prompt("Página inválida!");
		return;
	}
	
	nomeServlet += "?acao=consultar&"+paramsServlet; 
	enviar(nomeServlet, nome, true, "exibicao_conteudo");
}

function efetuarLogoff(){
	enviar('../login.do?acao=logoff', '../index.jsp', false, "");
}

function novoProjeto(){
	enviar("../project.do?acao=novo", "project.jsp", true, "exibicao_conteudo");
}

function novoExperimento(idProjeto){
	enviar("../experiment.do?acao=novo&idProjeto="+idProjeto, "experiments.jsp", true, "exibicao_conteudo");
}

function novaAtividade(idExperimento){
	enviar("../activity.do?acao=novo&idExperimento="+idExperimento, "activity.jsp", true, "exibicao_conteudo");
}


function enviar(pUrl, pNomeTelaAbrir, pAbreNoFrame, pIdTela ){
	$.ajax({
		url:pUrl,
		dataType:'html',
		type:'POST',
		success: function( data ){
			if (data == "sucesso"){
				if (pAbreNoFrame){
					$("#"+pIdTela).load(pNomeTelaAbrir);
				} else {
					window.location.href= pNomeTelaAbrir;
				}
			} else {
				$.prompt("Erro ao efetuar acao para a tela:" + pNomeTelaAbrir);
			}
		},
		error: function( xhr, er ){
			$.prompt('Os dados n&atilde;o for&atilde;o enviados. Motivo: ' + xhr.status + ', ' + xhr.statusText + ' | ' + er);
		}
	});	
	
}

