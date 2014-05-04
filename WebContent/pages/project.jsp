<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@include file="header.jsp" %>
<link rel="stylesheet" href="../_css/project.css"/>	
<link rel="stylesheet" type="text/css" href="../jquery/tabs.css"/>

<!--jquery-->	
<script src="../jquery/ui/jquery-ui-1.7.2.custom.js" type="text/javascript"></script>
<script src="../jquery/ui/i18n/ui.datepicker-pt-BR.js" type="text/javascript"></script>    
<script src="../jquery/jquery.maskedinput-1.2.2.js" type="text/javascript"></script>
<script src="../jquery/jquery.impromptu.2.7.js" type="text/javascript"></script>
<script src="../jquery/jquery/ui/ui.tabs.js" type="text/javascript"></script>    
<script src="../_js/project.js"></script>
	
<body>

<div id="formCadProjeto">
	<form id="frmManter">
		<fieldset>
			<legend>Manuten&ccedil;&atilde;o de Projetos</legend>
			<div class="rotulo">Nome:</div>
			<input type="text" id="txtNome" name="nome" maxlength="50" size="100" value="${projeto.nome}">				
			
			<div class="rotulo">Descri&ccedil;&atilde;o:</div><input type="text" id="txtDescricao" name="descricao" maxlength="50" size="100">
			<div class="rotulo">Coordenador:</div><input type="text" id="txtCoordenador" name="coordenador" maxlength="50" size="100">
									
			<div class="rotulo">Data in&iacute;cio:</div><input type="text" id="txtInicio" name="dataHoraInicio"><br>				
		    <div class="rotulo">Data fim:</div><input type="text" id="txtFim" name="dataHoraFim" ><br>
								
			<div class="rotulo">Observa&ccedil;&otilde;es:</div><textarea id="txtObservacao" name="observacao" rows="4" cols="76"></textarea><br>
			
			<div id="abaAcesso">
				<div id="abaParticipante" class="abaAtiva" >Institui&ccedil;&otilde;es participantes</div>
				<div id="abaFinanciadora" class="abaInativa" >Institui&ccedil;&otilde;es financiadoras</div>
							
				<div id="inst_participantes"> 
					<input type="text" id="txtNomesParticipantes" size="90" maxlength="50">
					<img src="../_img/adiciona.png" id="imgAdicionaParticipante" name="imgAddParticipante" alt="Adicionar" onclick="adicionarNomeNaLista('txtNomesParticipantes','lstParticipantes')"/>
					<img src="../_img/cancel.png" id="imgRemoveParticipante" name="imgDelParticipante" alt="Remover" onclick="removerItem('lstParticipantes')"/>					
					<div>
						<select multiple class="lista_instituicoes" name="nomesInstituicoesParticipantes" id="lstParticipantes">
						</select>
					</div>
				</div>
	
				<div id="inst_financeiras">
					<input type="text" id="txtNomesFinanciadores" size="90" maxlength="50">
					<img src="../_img/adiciona.png" id="imgAdicionaFinanciadora" name="imgAddFinanciadora" alt="Adicionar" onclick="adicionarNomeNaLista('txtNomesFinanciadores','lstFinanciadoras')"/>
					<img src="../_img/cancel.png" id="imgRemoveFinanciadora" name="imgDelFinanciadora" alt="Remover" onclick="removerItem('lstFinanciadoras')"/>				
					
					<div>
						<select multiple class="lista_instituicoes" name="nomesInstituicoesFinanciadoras" id="lstFinanciadoras">
						</select>
					</div>
									
				</div>
			</div>
			<input type="hidden" name="acao" value="salvar"/>
			<input type="hidden" name="idProjeto" id="idProjeto" value="0"/>
			
			<input type="button" value="Novo" onclick="limparTela()">
			<input type="button" value="Salvar" onclick="salvarProjeto()">
		</fieldset>
	</form>
	
</div>

</body>
</html>