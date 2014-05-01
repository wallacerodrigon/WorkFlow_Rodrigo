$(document).ready(function(){

	$("#projetos").treeview();
}); 

function abrirTela(nome){
	$("#exibicao_conteudo").load(nome);
}
