<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@include file="header.jsp" %>

<link rel="stylesheet" type="text/css" href="../jquery/tabs.css"/>

<!--jquery-->	
<script src="../jquery/ui/i18n/ui.datepicker-pt-BR.js" type="text/javascript"></script>    
<script src="../jquery/jquery.impromptu.2.7.js" type="text/javascript"></script>
<script src="../jquery/ui/jquery-ui-1.7.2.custom.js" type="text/javascript"></script>
<script src="../jquery/ui/i18n/ui.datepicker-pt-BR.js" type="text/javascript"></script>    
<script src="../jquery/jquery.maskedinput-1.2.2.js" type="text/javascript"></script>
<script src="../jquery/jquery.impromptu.2.7.js" type="text/javascript"></script>
<script src="../_js/experiment.js"></script>
    	
<body>

<div id="formCadExperimento">
	<form id="frmManter">
		<fieldset>
			<legend>Manuten&ccedil;&atilde;o de Experimentos</legend>
				<div class="rotulo">Nome:</div>
				<input type="text" id="txtNome" name="nomeExperimento" maxlength="50" size="100">				
				
				<div class="rotulo">Descri&ccedil;&atilde;o:</div><input type="text" id="txtDescricao" name="descricao" maxlength="50" size="100">
				<div class="rotulo">Local:</div><input type="text" id="txtLocal" name="localExecucao" maxlength="50" size="100">
				<div class="rotulo">Vers&atilde;o:</div><input type="text" id="txtVersao" name="versao" maxlength="50" size="100">
										
				<div class="rotulo">Data in&iacute;cio:</div><input type="text" id="txtDataInicio" name="dataInicio"><br>				
			    <div class="rotulo">Data fim:</div><input type="text" id="txtDataFim" name="dataFim" ><br>
			    <div class="rotulo">Data vers&atilde;o:</div><input type="text" id="txtDataVersao" name="dataVersao"><br>
									
				<div class="rotulo">Anota&ccedil;&otilde;es:</div><textarea id="txtObservacao" name="anotacoes" rows="4" cols="76"></textarea><br>			
			
				<input type="hidden" name="acao" value="salvar"/>
				<input type="hidden" name="idProjeto" id="idProjeto" value="0"/>
				<input type="hidden" name="idExperimento" id="idExperimento" value="0"/>
				
				<input type="button" value="Novo" onclick="limparTela()">
				<input type="button" value="Salvar" onclick="salvarExperimento()">				
		</fieldset>	
	</form>	
</div>

</body>
</html>