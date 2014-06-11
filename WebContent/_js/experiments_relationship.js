jQuery(document).ready(function(){    
	ativaAbaUsed();

	$('#abaUsed').click(function(){ ativaAbaUsed(); });
	$('#abaGenerated').click(function(){ ativaAbaGenerated(); });
	$('#abaAssociated').click(function(){ ativaAbaAssociated(); });
	$('#abaAttachment').click(function(){ ativaAbaAttachment(); });
	
	gerarLinhasDiversas("tabela_relation1");	
	gerarLinhasDiversas("tabela_relation2");
	gerarLinhasDiversas("tabela_relation3");
	gerarLinhasDiversas("tabela_relation4");
	gerarLinhasDiversas("tabela_relation5");

	//efeito zebrado e efeito selecionado ao clicar sobre a linha
	$(".tabela_relation tbody tr:even").addClass("linha_par");
	$(".tabela_relation tbody tr:odd").addClass("linha_impar");
	$(".tabela_relation tbody tr").mouseover(function() {
		$(this).addClass("mouse_over");
	})
	.mouseout(function() {
		$(this).removeClass("mouse_over");
	})
	.click(function() {
		idLinhaSelecionada = $(this).attr("id");		
		removerTodasLinhasSelecionadas($(this).parent());
		$(this).toggleClass("mouse_click");
	});	

	
	$("#telaDetalhes").dialog({
    	autoOpen: false,
    	height: 250,
		width: 300,
    	modal: true,
    	buttons: {
    		'Fechar': function() {
    			$(this).dialog('close');
    		},
    		'Ok': function() {
    			submeterFormularioPopup();
    		}
    	}
	});	
});

var abaSelecionada = "";
var idLinhaSelecionada;


function ativaAbaUsed(){
	$('#used_content').show('normal');
	$('#generated_content').hide('normal');
	$('#associated_content').hide('normal');
	$('#attachment_content').hide('normal');	
	
	$('#abaUsed').attr('class','abaAtiva');
	$('#abaGenerated').attr('class','abaInativa');
	$('#abaAssociated').attr('class','abaInativa');	
	$('#abaAttachment').attr('class','abaInativa');
	
	abaSelecionada = "abaUsed";
}

function ativaAbaGenerated(){
	$('#used_content').hide('normal');
	$('#generated_content').show('normal');
	$('#associated_content').hide('normal');
	$('#attachment_content').hide('normal');	
	
	$('#abaUsed').attr('class','abaInativa');
	$('#abaGenerated').attr('class','abaAtiva');
	$('#abaAssociated').attr('class','abaInativa');	
	$('#abaAttachment').attr('class','abaInativa');	
	abaSelecionada = "abaGenerated";	
}

function ativaAbaAssociated(){
	$('#used_content').hide('normal');
	$('#generated_content').hide('normal');
	$('#associated_content').show('normal');
	$('#attachment_content').hide('normal');	
	
	$('#abaUsed').attr('class','abaInativa');
	$('#abaGenerated').attr('class','abaInativa');
	$('#abaAssociated').attr('class','abaAtiva');	
	$('#abaAttachment').attr('class','abaInativa');	
	abaSelecionada = "abaAssociated";	
}

function ativaAbaAttachment(){
	$('#used_content').hide('normal');
	$('#generated_content').hide('normal');
	$('#associated_content').hide('normal');
	$('#attachment_content').show('normal');	
	
	$('#abaUsed').attr('class','abaInativa');
	$('#abaGenerated').attr('class','abaInativa');
	$('#abaAssociated').attr('class','abaInativa');	
	$('#abaAttachment').attr('class','abaAtiva');	
	abaSelecionada = "abaAttachment";	
}

function gerarLinhasDiversas(idTabela){
	var html = "";
	var i = 0;
	while( i < 20){
		html+= "<tr id='"+i+"'>";
		html+= "<td>coluna 1</td><td><== coluna 2</td>";
		html+= "</tr>";
		i++;
	}
	$("#"+idTabela+" tbody").append(html);	
}

function abrirTelaDetalhes(){
	
	var titulo = montarLabelsConformeAbaClicked();
	
	$("#telaDetalhes").dialog("open");
	$("#telaDetalhes").dialog("option", "title", titulo);	
}

function abrirTelaDerivacoes(){
	$("#telaDetalhes").dialog("open");
	$("#telaDetalhes").dialog("option", "title", "Deriva&ccedil;&otilde;es");
	
	alterarRotulos("Arquivo derivado:", "Arquivo derivador:");	
}


function submeterFormularioPopup(){
	var url = recuperarUrl();
	$.ajax({
	    url:url,
	    dataType:'html',
	    data:$('#frmDetalhes').serialize(),
	    type:'POST',
	    success: function( data ){
  	    	if (data == "sucesso"){
	    		$.prompt("Cadastro salvo com sucesso!");
	    		//atualiza o conteudo da tela, como no F5
	    		window.location.reload(true);
	    		//fecha o POPUP
    			$("#frmDetalhes").dialog('close');	    		
	    	} else {
	    		$.prompt("Erro no cadastro. Motivo:" + data);
	    	}
	    },	
	    error: function( xhr, er ){
	        $.prompt('Os dados n&atilde;o for&atilde;o salvos. Causa:' + data);
	    }
	});	
}

function montarLabelsConformeAbaClicked(){
	var tituloTela = "";
	
	if (abaSelecionada == "abaUsed"){
		tituloTela = "Usados";
		label1 = "Cole&ccedil;&atilde;o:";
		label2 = "Atividade:";
	} else if (abaSelecionada == "abaGenerated") {
		tituloTela = "Gerados";
		label1 = "Cole&ccedil;&atilde;o generated:";
		label2 = "Atividade generated:";
	} else if (abaSelecionada == "abaAssociated") {
		tituloTela = "Associados";
		label1 = "Cole&ccedil;&atilde;o assoc:";
		label2 = "Atividade assoc:";
	} else  {
		tituloTela = "Anexos";
		label1 = "Cole&ccedil;&atilde;o attach:";
		label2 = "Atividade attach:";
	}
	
	alterarRotulos(label1, label2);
	
	return tituloTela;
}

function alterarRotulos(nomeRotulo1, nomeRotulo2){
	$("#frmDetalhes #lblRotulo1").html(nomeRotulo1);
	$("#frmDetalhes #lblRotulo2").html(nomeRotulo2);
}


function recuperarUrl(){
	var url = "";
	if (abaSelecionada == "abaUsed"){
		url = "URL_USED";
	} else if (abaSelecionada == "abaGenerated") {
		url = "URL_GENERATED";
	} else if (abaSelecionada == "abaAssociated") {
		url = "URL_ASSOCIATED";
	} else {
		url = "URL_ANEXOS";
	} 
	return url;
}


function verItemSelecionado(){
	alert(idLinhaSelecionada);
}

function removerTodasLinhasSelecionadas(objetoTBody){
	objetoTBody.find('tr').each(function(){
		$(this).removeClass("mouse_click");
	});
}
