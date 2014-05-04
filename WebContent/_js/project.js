jQuery(document).ready(function(){    
//	listarProjetos();
    $.datepicker.setDefaults($.extend({showMonthAfterYear: false}, $.datepicker.regional['pt-BR']));
    $("#txtInicio").datepicker($.datepicker.regional['pt-BR']);
    $("#txtFim").datepicker($.datepicker.regional['pt-BR']);
    
    ativaAbaParticipantes();
	$('#abaParticipante').click(function(){ ativaAbaParticipantes(); });
	$('#abaFinanciadora').click(function(){ ativaAbaFinanciadoras(); });
    
    
/*	$("#formCadastro").dialog({
    	autoOpen: false,
    	height: 600,
		width: 550,
    	modal: true,
    	resizable: false,
    	buttons: {
    		'Fechar': function() {
    			$(this).dialog('close');
    		},
			'Salvar': function(){
					$('#lstFinanciadoras option').attr("selected", "selected");
					$('#lstParticipantes option').attr("selected", "selected");

					if (!isDadosValidos()){
						$.prompt('Informe nome do projeto, data inicial e data final.');
						return;
					}
					
					if (!validarDataInicioFim($('#txtInicio').val(), $('#txtFim').val())){
						$.prompt("Data inicial maior que final!");
						return;
					}	

					
    	        	$.ajax({
    	        	    url:'../project.do',
    	        	    dataType:'html',
    	        	    data:$('#frmManter').serialize(),
    	        	    type:'POST',
    	        	    success: function( data ){
    	          	    	if (data == "sucesso"){
    	        	    		$.prompt("Cadastro salvo com sucesso!");
    	        	    		limparTela();
    	        	    		listarProjetos();
    	        	    	} else {
    	        	    		$.prompt("Erro no cadastro. Motivo:" + data);
    	        	    	}
    	        	    },	
    	        	    error: function( xhr, er ){
    	        	        $.prompt('Os dados n&atilde;o for&atilde;o salvos. Causa:' + data);
    	        	    }
    	        	});
    	        		$(this).dialog('close');
					}
    	}
    });*/
	
});


function salvarProjeto(){
	$('#lstFinanciadoras option').attr("selected", "selected");
	$('#lstParticipantes option').attr("selected", "selected");

	if (!isDadosValidos()){
		$.prompt('Informe nome do projeto, data inicial e data final.');
		return;
	}
	
	if (!validarDataInicioFim($('#txtInicio').val(), $('#txtFim').val())){
		$.prompt("Data inicial maior que final!");
		return;
	}		
	
	$.ajax({
	    url:'../project.do',
	    dataType:'html',
	    data:$('#frmManter').serialize(),
	    type:'POST',
	    success: function( data ){
  	    	if (data == "sucesso"){
	    		$.prompt("Cadastro salvo com sucesso!");
	    		limparTela();
	    		window.location.reload(true);
	    	} else {
	    		$.prompt("Erro no cadastro. Motivo:" + data);
	    	}
	    },	
	    error: function( xhr, er ){
	        $.prompt('Os dados n&atilde;o for&atilde;o salvos. Causa:' + data);
	    }
	});
}

function isDadosValidos(){
	if ($("#txtNome").val()=='' || $("#txtInicio").val()=='' || $("#txtFim").val() =='') {
		return false;
	}
	return true;
	
}

function excluir(codProjeto)
{
    var deletarReg = 
	function (v,m,f){
		if( v == true )
		{
			$.ajax({
				url:'../project.do?acao=excluir',
				dataType:'text',
				data:{idProjeto:codProjeto},
				type:'POST',
				success: function( data, textStatus ){
					if( data == 'sucesso' ){
						$.prompt( 'Registro excluido com sucesso!'); 
						listarProjetos();						
					}
					else
					{
						$.prompt( 'Os dados n&atilde;o for&atilde;o exclu&iacute;do. Favor tentar novamente' );
					}
				},
				error: function( xhr, er ){
					$.prompt('Os dados n&atilde;o for&atilde;o salvos. Motivo: ' + xhr.status + ', ' + xhr.statusText + ' | ' + er);
				}
			});
		}
	};
	$.prompt( 'Deseja realmente excluir este projeto?', {buttons: {'Sim':true, 'N&atilde;o':false}, callback: deletarReg} );	
}

function novoRegistroProjeto(){
	limparTela();
}

function abrirTelaCadastroProjeto(){
	var alteracao = ($("#idProjeto").val() == '' || $("#idProjeto").val()==0)?false:true;
	var idProjeto = $('#idProjeto').val();

	if (alteracao){
		$('#idProjeto').val(idProjeto);
	} else {
		$('#idProjeto').val(0);		
	}
/*	$('#formCadastro').dialog('open');	
    $('#formCadastro').dialog('option', 'title', 'Manter Projeto');	   
*/}

function mostrarDadosNaTela(xml){
	limparTela();
	$(xml).find('projeto').each(function(){
		$("#txtNome").val($(this).find('nome').text());
		$("#txtDescricao").val($(this).find('descricao').text());		
		$("#txtCoordenador").val($(this).find('coordenador').text());		
		$("#txtInicio").val(formatarData($(this).find('dataHoraInicio').text()));		
		$("#txtFim").val(formatarData($(this).find('dataHoraFim').text()));				
		$("#idProjeto").val($(this).find('idProjeto').text());
		$("#txtObservacao").val($(this).find('observacao').text());
	});
	
	$(xml).find('nomesInstituicoesParticipantes').each(function(){
		$(this).find('string').each(function(){
			var item = $(this).text();
			$('#lstParticipantes').append(new Option(item, item, true, true));
		});
	});
	
	$(xml).find('nomesInstituicoesFinanciadoras').each(function(){
		$(this).find('string').each(function(){
			var item = $(this).text();
			$('#lstFinanciadoras').append(new Option(item, item, true, true));
		});
	});	
}

/*function montarTabela(xml){
	$('#corpo_conteudo').html("");	
	var html = "";	
	$(xml).find('projeto').each(function(){
		html += "<tr>";			
		html += "<td><a href='javascript:void(0)' onclick='atividadesDoProjeto("+$(this).find('idProjeto').text()+")'>" +$(this).find('nome').text()+ "</a></td>";
		html += "<td>" +$(this).find('descricao').text() + "</td>";		
		html += "<td>" +$(this).find('coordenador').text()  + "</td>";		
		html += "<td>"+formatarData($(this).find('dataHoraInicio').text()) +"</td>";		
		html += "<td>"+formatarData($(this).find('dataHoraFim').text()) +"</td>";				
		html+= "<td><img src='../_img/edit.png' alt='Editar registro' onClick='mostrarDadosParaEditar("+$(this).find('idProjeto').text()+");'/></td>";																											
		html+= "<td><img src='../_img/cancelar.png' alt='Excluir registro' onClick='excluir("+$(this).find('idProjeto').text()+");'/></td>";		
		html +="</tr>";		
	});
	$('#corpo_conteudo').html(html);		
}
*/
function ativaAbaParticipantes(){
	$('#inst_participantes').show('normal');
	$('#inst_financeiras').hide('normal');
	$('#abaParticipante').attr('class','abaAtiva');
	$('#abaFinanciadora').attr('class','abaInativa');	
	
}

function ativaAbaFinanciadoras(){
	$('#inst_financeiras').show('normal');
	$('#inst_participantes').hide('normal');
	$('#abaFinanciadora').attr('class','abaAtiva');
	$('#abaParticipante').attr('class','abaInativa');	
}


function adicionarNomeNaLista(pIdNome, pIdLista){
	var nome = $("#"+pIdNome).val();
	
	if (nome == ''){
		$.prompt("Informe um nome para adicionar!");
		return;
	}
	
	var tamLista = $("#"+pIdLista).find('option').size();
	var jaExiste = temRegistroNaLista(pIdLista, nome);
	if (tamLista == 0 || !jaExiste){
		var option = new Option(nome, nome);
		$("#"+pIdLista).append(option);
		$("#"+pIdNome).val('');
	} 
}

function temRegistroNaLista(pIdLista, pValue){
	var achou = false;
	$("#"+pIdLista + " option").each(function(){
		if ($(this).val() == pValue){
			$.prompt("Registro j&aacute; cadastrado na lista");
			achou = true;
		}
	});
	return achou;
}

function removerItem(pIdItem){
	$("#"+pIdItem + " option").each(function(){
		if ($(this).is(":selected")){
			$(this).remove();
		}
	});
}


function limparTela(){
	$("#txtNome").val("");
	$("#txtDescricao").val("");		
	$("#txtCoordenador").val("");		
	$("#txtInicio").val("");		
	$("#txtFim").val("");				
	$("#idProjeto").val("0");	
	$("#txtObservacao").val("");	
	$("#lstFinanciadoras option").remove();
	$("#lstParticipantes option").remove();
}

//formata uma data no formato do Java para o formato pt-br
function formatarData(dataString){
	//2014-03-01 00:00:00.0 BRT
	if (dataString != null && dataString != ''){
		var dadosData = dataString.substring(0,10).split("-");
		var horas     = dataString.substring(11, 19);
		var novaData = dadosData[2]+"/"+dadosData[1]+'/'+dadosData[0];
		
		if (horas != '00:00:00'){
			novaData += ' ' +horas; 
		}
		return novaData;
	} else {
		return dataString;
	}
}

function stringParaDate(pDataHoraStringPadraoBrasil){
	if (pDataHoraStringPadraoBrasil != null && pDataHoraStringPadraoBrasil != ''){
		var dadosData = pDataHoraStringPadraoBrasil.substring(0,10).split("/");
		var horas     = pDataHoraStringPadraoBrasil.substring(11, 19);
		var novaData = dadosData[2]+"-"+dadosData[1]+"-"+dadosData[0];
		
		if (horas != '00:00:00'){
			novaData += ' ' +horas; 
		}
		return new Date(novaData);
	} else {
		return null;
	}
	
}

function validarDataInicioFim(pDataInicio, pDataFim){
	var dataHoraInicio = stringParaDate(pDataInicio); 
	var dataHoraFim    = stringParaDate(pDataFim);

	if (dataHoraInicio.getTime() > dataHoraFim.getTime()){
		return false;
	}
	return true;
	
}


