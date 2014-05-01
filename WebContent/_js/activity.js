jQuery(document).ready(function(){    

    $.datepicker.setDefaults($.extend({showMonthAfterYear: false}, $.datepicker.regional['pt-BR']));
    $("#txtInicioAtividade").datepicker($.datepicker.regional['pt-BR']);
    $("#txtFimAtividade").datepicker($.datepicker.regional['pt-BR']);
    $("#txtHoraInicioAtividade").mask("99:99");    
    $("#txtHoraFimAtividade").mask("99:99");
	
	$("#formCadastroAtividade").dialog({
    	autoOpen: false,
    	height: 550,
		width: 550,
		resizable:false,
    	modal: true,
    	buttons: {
    		'Fechar': function() {
    			$(this).dialog('close');
    		},
			'Salvar': function(){
				
				if (! isDadosValidosDaAtividade()){
					$.prompt("Informe arquivo do programa, data e horas inicio e fim.");
					return;
				}
				
				//validar data e hora
				if (!validarDataInicioFim($('#txtInicioAtividade').val() + ' ' +$("#txtHoraInicioAtividade").val(), $('#txtFimAtividade').val() + ' ' +$("#txtHoraFimAtividade").val())){
					$.prompt("Data/hora iniciais maior que finais!");
					return;
				}	
				mostrarNomeArquivo();
				
	        	$.ajax({
	        	    url:'../activity.do?acao=salvar',
	        	    dataType:'html',
	        	    data:$('#frmManterAtividade').serialize(),
	        	    type:'POST',
	        	    success: function( data ){
	          	    	if (data == "sucesso"){
	        	    		$.prompt("Cadastro salvo com sucesso!");
	        	    		limparTelaAtividade();
	        	    		listarAtividades($('#idProjetoAtual').val());
	        	    	} else {
	        	    		$.prompt("Erro no cadastro. Motivo:" + data);
	        	    	}
	        	    },	
	        	    error: function( xhr, er ){
	        	        $.prompt('Os dados n&atilde;o for&atilde;o salvos. Causa:' + data);
	        	    }
	        	});
	        	$(this).dialog('close');				
			},
    		'Executar': function(){
    			executarComando($("#txtComando").val(), $("#txtNomeArquivo").val());
    		}

    	}
    });
	
	$("#telaResultadoComando").dialog({
    	autoOpen: false,
    	height: 500,
		width: 500,
    	modal: true,
    	buttons: {
    		'Fechar': function() {
    			$(this).dialog('close');
    		},
    	}
	});
	
	$("#divProcessando").dialog({
    	autoOpen: false,
    	height: 200,
		width: 500,
    	modal: true,
	});		
	
});


function executarComando(pLinhaComando, pNomeArquivo){
	$.ajax({
		url:'../activity.do?acao=executar',
		data:{linhaComando:pLinhaComando, nomeArquivo:pNomeArquivo},
        dataType: 'html',
	    beforeSend: function(){
	    	$("#divProcessando").dialog('open');
	    },  
	    success: function(data){
			$("#divProcessando").dialog('close');
			exibirResultadoNaTela(data);			
	    },
		error: function( xhr, er ){
			$.prompt('Ocorreu o seguinte problema na execu&ccedil;&atilde;o desse comando. Motivo: ' + xhr.status + ', ' + xhr.statusText + ' | ' + er);
			$("#divProcessando").dialog('close');
		}
	});		
}


function exibirResultadoNaTela(dadosAExibir){
	$('#telaResultadoComando').dialog('open');	
    $('#telaResultadoComando').dialog('option', 'title', 'Saida do resultado do comando');
    $('#telaResultadoComando #txtResultadoComando').val(dadosAExibir);
}

function isDadosValidosDaAtividade(){
	
	if ($('#txtPrograma').val() == '' || 
		$("#txtInicioAtividade").val()=='' || 
		$("#txtFimAtividade").val() =='' || 
		$("#txtHoraInicioAtividade").val()==''|| 
		$("#txtHoraFimAtividade").val()=='') {
		return false;
	};    
	
	return true;
	
}

function excluirAtividade(codAtividade)
{
    var deletarReg = 
	function (v,m,f){
		if( v == true )
		{
			$.ajax({
				url:'../activity.do?acao=excluir',
				dataType:'text',
				data:{idAtividade:codAtividade},
				type:'POST',
				success: function( data, textStatus ){
					if( data == 'sucesso' ){
						$.prompt( 'Registro excluido com sucesso!'); 
						listarAtividades($("#idProjetoDaAtividade").val());						
					}
					else
					{
						$.prompt( 'Os dados n&atilde;o foram exclu&iacute;dos. Favor tentar novamente' );
					}
				},
				error: function( xhr, er ){
					$.prompt('Os dados n&atilde;o for&atilde;o salvos. Motivo: ' + xhr.status + ', ' + xhr.statusText + ' | ' + er);
				}
			});
		}
	};
	$.prompt( 'Deseja realmente excluir esta atividade?', {buttons: {'Sim':true, 'N&atilde;o':false}, callback: deletarReg} );	
}

function abrirTelaCadastroAtividade(codProjeto){
	limparTelaAtividade();
	$("#idProjetoDaAtividade").val(codProjeto);
	$('#formCadastroAtividade').dialog('open');	
    $('#formCadastroAtividade').dialog('option', 'title', 'Manter Atividades');	   
}

function mostrarDadosParaEditarAtividade(codAtividade)
{
			$.ajax({
				url:'../activity.do?acao=consultar',
				data:{idAtividade:codAtividade},
		        dataType: 'xml',
		        mimeType: 'application/xml',
				success: function( xml ){
					limparTelaAtividade();
					
					$(xml).find('atividade').each(function(){
						$("#idProjetoDaAtividade").val($(this).find('idProjeto').text());
						$("#txtPrograma").val($(this).find('nomePrograma').text());		
						$("#txtVersao").val($(this).find('versaoPrograma').text());		
						$("#txtFuncao").val($(this).find('funcao').text());
						
						var dataHoraInicio = $(this).find('dataHoraInicio').text();
						var dataHoraFim    = $(this).find('dataHoraFim').text();
						
						$("#txtInicioAtividade").val(formatarData(dataHoraInicio.substring(0,10)));				
						$("#txtFimAtividade").val(formatarData(dataHoraFim.substring(0,10)));
						
						$("#txtHoraInicioAtividade").val(dataHoraInicio.substring(11,16));				
						$("#txtHoraFimAtividade").val(dataHoraFim.substring(11,16));
						
						
						$("#txtComando").val($(this).find('linhaComando').text());	
						$("#idAtividade").val($(this).find('idAtividade').text());
						
						var nomeArquivo = $(this).find('nomeArquivo').text();
						$("#txtNomeArquivo").val(nomeArquivo);
						$("#nomeArquivoSelecionado").html("Arquivo selecionado:" + nomeArquivo);
						$("#btnEnviar").hide('normal');
					});	
					$('#formCadastroAtividade').dialog('open');	
				    $('#formCadastroAtividade').dialog('option', 'title', 'Manter Atividades');	   					
				},
				error: function( xhr, er ){
					$.prompt('Os dados n&atilde;o foramo salvos. Motivo: ' + xhr.status + ', ' + xhr.statusText + ' | ' + er);
				}
			});		
}

function listarAtividades(codProjeto){
	$.ajax({
		url:'../activity.do',
        dataType: 'xml',
        mimeType: 'application/xml',
        data:{acao:'listar', idProjetoDaAtividade:codProjeto},
        type:'POST',
		success: function( xml ){
			$('#atividades_projeto').html("");	
			var html = "";	
			$(xml).find('atividade').each(function(){
				html += "<tr>";			
				html += "<td>" +$(this).find('nomePrograma').text()+ "</td>";
				html += "<td>" +$(this).find('versaoPrograma').text() + "</td>";		
				html += "<td>" +$(this).find('funcao').text()  + "</td>";		
				html += "<td>"+formatarData($(this).find('dataHoraInicio').text()) +"</td>";		
				html += "<td>"+formatarData($(this).find('dataHoraFim').text()) +"</td>";				
				html+= "<td><img src='../_img/edit.png' alt='Editar registro' onClick='mostrarDadosParaEditarAtividade("+$(this).find('idAtividade').text()+");'/></td>";																											
				html+= "<td><img src='../_img/cancelar.png' alt='Excluir registro' onClick='excluirAtividade("+$(this).find('idAtividade').text()+");'/></td>";
				html +="</tr>";		
			});
			$('#atividades_projeto').html(html);
			$('#idProjetoAtual').val(codProjeto);	
		},
		error: function( xhr, er ){
			$.prompt('Os dados n&atilde;o foram salvos. Motivo: ' + xhr.status + ', ' + xhr.statusText + ' | ' + er);
		}
	});		


}



function limparTelaAtividade(){
	$("#txtPrograma").val("");		
	$("#txtVersao").val("");		
	$("#txtFuncao").val("");		
	$("#txtInicioAtividade").val("");				
	$("#txtHoraInicioAtividade").val("");
	$("#txtFimAtividade").val("");				
	$("#txtHoraFimAtividade").val("");		
	$("#txtComando").val("");
	$("#idAtividade").val("");
	$("#idProjetoDaAtividade").val("");	
	$("#txtArquivo").val("");	
	$('#txtNomeArquivo').val("");	
	$("#nomeArquivoSelecionado").html("");
	$("#btnEnviar").hide('normal');
}


function mostrarNomeArquivo(){
	var arquivo = $('#frameUpload').contents().find('#txtArquivo').val();
	var ultimoIndiceBarra = arquivo.lastIndexOf("\\")+1;
	if (ultimoIndiceBarra == -1){
		ultimoIndiceBarra = 0;
	}
	var nomeArquivo = arquivo.substring(ultimoIndiceBarra, arquivo.length);
	
	$("#txtNomeArquivo").val(nomeArquivo);
	$("#nomeArquivoSelecionado").html("Arquivo selecionado:" + nomeArquivo);

	if(nomeArquivo != ''){
		$("#btnEnviar").show('normal');
	} else {
		$("#btnEnviar").hide('normal');
	}
}


