jQuery(document).ready(function(){    

    $.datepicker.setDefaults($.extend({showMonthAfterYear: false}, $.datepicker.regional['pt-BR']));
    $("#txtDataInicio").datepicker($.datepicker.regional['pt-BR']);
    $("#txtDataFim").datepicker($.datepicker.regional['pt-BR']);
    $("#txtDataVersao").datepicker($.datepicker.regional['pt-BR']);
    
});

function salvarExperimento(){
	if (! isDadosValidos() ){
		$.prompt("Informe nome, local, versão, data inicio, data fim e data da versao");
		return false;
	}
	return true;
}


function isDadosValidos(){
	
	if ($('#txtNome').val() == '' || 
		$("#txtLocal").val()=='' || 
		$("#txtVersao").val() =='' || 
		$("#txtDataInicio").val()==''||
		$("#txtDataInicio").val()==''|| 
		$("#txtDataVersao").val()=='') {
		return false;
	};    
	
	return true;
	
}

function excluir(codigo)
{
    var deletarReg = 
	function (v,m,f){
		if( v == true )
		{
			$.ajax({
				url:'../experiment.do?acao=excluir',
				dataType:'text',
				data:{idAtividade:codigo},
				type:'POST',
				success: function( data, textStatus ){
					if( data == 'sucesso' ){
						$.prompt( 'Registro excluido com sucesso!'); 
												
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
	$.prompt( 'Deseja realmente excluir este experimento?', {buttons: {'Sim':true, 'N&atilde;o':false}, callback: deletarReg} );	
}

function limparTela(){
	$("#txtNome").val("");		
	$("#txtLocal").val("");		
	$("#txtVersao").val("");		
	$("#txtDataInicio").val("");				
	$("#txtDataFim").val("");
	$("#txtDataVersao").val("");				
}


