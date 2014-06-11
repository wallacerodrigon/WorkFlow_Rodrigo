<%@page session="true" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@include file="header.jsp" %>
<link rel="stylesheet" href="../_css/experiments_relationship.css"/>	
<link rel="stylesheet" type="text/css" href="../jquery/tabs.css"/>

<!--jquery-->	
<script src="../jquery/jquery.js" type="text/javascript"></script>
<script src="../jquery/ui/jquery-ui-1.7.2.custom.js" type="text/javascript"></script>
<script src="../jquery/ui/i18n/ui.datepicker-pt-BR.js" type="text/javascript"></script>    
<script src="../jquery/jquery.maskedinput-1.2.2.js" type="text/javascript"></script>
<script src="../jquery/jquery.impromptu.2.7.js" type="text/javascript"></script>
<script src="../jquery/jquery/ui/ui.tabs.js" type="text/javascript"></script>    
<script src="../_js/experiments_relationship.js"></script>
<body>

<div id="corpo">
	<section id="experiments" >
		<header class="parte_interna">
			<fieldset>
				<legend class="legenda">Experimento</legend>
				<table class="form_dados">
					<tr>
						<th class="rotulo_formulario">ID:</th>
						<td colspan="5">${experimento.nome}</td>
					</tr>
					<tr>
						<th class="rotulo_formulario">Descri&ccedil;&atilde;o:</th>
						<td colspan="5">${experimento.descricao}</td>
					</tr>
					<tr>
						<th class="rotulo_formulario">Local:</th>
						<td colspan="5">${experimento.localExecucao}</td>
					</tr>
					<tr>
	   					 <th class="rotulo_formulario">In&iacute;cio:</th>
	   					 <td><fmt:formatDate value="${experimento.dataHoraInicio}" pattern="dd/MM/yyyy"/></td>
		   			     <th class="rotulo_formulario">Fim:</th>
		   			     <td colspan="4"><fmt:formatDate value="${experimento.dataHoraFim}" pattern="dd/MM/yyyy"/></td>
		   			</tr>
		   			<tr>
						<th class="rotulo_formulario">Observa&ccedil;&otilde;es:</th/>
						<td>&nbsp;</td>
		   				<th class="rotulo_formulario">Versão:</th>
		   				<td>${experimento.versao}</td>
		   				<th class="rotulo_formulario">Data Versão:</th>
		   				<td><fmt:formatDate value="${experimento.dataVersao}" pattern="dd/MM/yyyy HH:mm:ss"/></td>
		   			</tr>
 		   		</table>
				<div><textarea rows="5" readonly="true">${experimento.anotacoes}</textarea></div><br/>
			</fieldset>
		</header>
		
		<article class="parte_interna">
			<table id="tbl_itens_experimentos">
			<tr>
				<td>
					<fieldset class="itens_experimento">
						<legend class="legenda">Usu&aacute;rios</legend>
						<select id="lista_users" multiple class="lista">
							<option>AG001_João</option>
							<option>AG001_João</option>
						</select>
					</fieldset>
				</td>
	
				<td>
				<fieldset class="itens_experimento">
					<legend class="legenda">Arquivos</legend>
					<select id="lista_users" multiple class="lista">
					<c:if test="${not empty experimento.atividades}">
						<c:forEach var="atv" items="${experimento.atividades}">
							<option value="<c:out value="${atv.idAtividade}"/>">${atv.nomeArquivo}</option>
						</c:forEach>
					</c:if>
					</select>
				</fieldset>
				</td>
	
				<td>
				<fieldset class="itens_experimento">
					<legend class="legenda">Atividades</legend>
					<select id="lista_users" multiple class="lista">
					<c:if test="${not empty experimento.atividades}">
						<c:forEach var="atv" items="${experimento.atividades}">
							<option value="<c:out value="${atv.idAtividade}"/>">${atv.nomeAtividade}</option>
						</c:forEach>
					</c:if>
					</select>
				</fieldset>
				</td>
			</tr>
			</table>
		</article>
				
	</section>
	
	<aside id="relations_attachments" class="parte_interna">
			<fieldset id="relations">
				<legend class="legenda">Rela&ccedil;&otilde;es e anexos</legend>
				<div id="abaAcesso">
					<div id="abaUsed" class="abaAtiva">Used</div>
					<div id="abaGenerated" class="abaInativa">Generated</div>
					<div id="abaAssociated" class="abaInativa">Associated</div>
					<div id="abaAttachment" class="abaInativa">Attachment</div>		
					
					<div id="used_content" >
						<div class="div_overflow">
							<table class="tabela_relation" id="tabela_relation1">
								<tbody></tbody>
							</table>
						</div>
					</div>

					<div id="generated_content" >
						<div class="div_overflow">
							<table class="tabela_relation" id="tabela_relation2">
								<tbody></tbody>
							</table>
						</div>
					</div>

					<div id="associated_content" >
						<div class="div_overflow">
							<table class="tabela_relation" id="tabela_relation3">
								<tbody></tbody>
							</table>
						</div>
					</div>

					<div id="attachment_content" >
						<div class="div_overflow">
							<table class="tabela_relation" id="tabela_relation4">
								<tbody></tbody>
							</table>
						</div>
					</div>
							
				</div>
				
				<div id="botoes_relations">
					<input type="button" value="Detalhe" name="btnDetalhe" onclick="abrirTelaDetalhes()">
					<input type="button" value="Novo" name="btnNovo" onclick="verItemSelecionado()">
					<input type="button" value="Editar" name="btnEditar">
					<input type="button" value="Excluir" name="btnDelete">
				</div>
			</fieldset>
			
			<fieldset id="attachments">
				<legend class="legenda">Deriva&ccedil;&otilde;es</legend>
				<div class="div_overflow2">
					<table class="tabela_relation" id="tabela_relation5" border="0">
						<tbody></tbody>
					</table>
				</div>	
				<div id="botoes_derived">
					<input type="button" value="Detalhe" name="btnDetalhe" onclick="abrirTelaDerivacoes()">
				</div>							
			</fieldset>
			
	
	</aside>
</div>

<!-- <div id="rodape">
	<footer id="botoes">
		<input class="botao" type="button" value="Fechar" name="btnFechar">
		<input class="botao" type="button" value="Criar Grafo" name="btnGrafo">
	</footer>
</div>
 -->
<!-- POPUP DE DETALHES -->
<div id="users-contain" class="ui-widget">
	<div id="telaDetalhes">
		<form id="frmDetalhes">
			<div>
				<label id="lblRotulo1">Rotulo 1:</label><br/>
				<input type="text" id="txtValor1" style="width: 250px"/>
			</div><br/>
 			<div>
				<label id="lblRotulo2">Rotulo 2:</label><br/>
				<input type="text" id="txtValor2" style="width: 250px"/>
			</div><br/>
    	</form>
	</div>
</div>

</body>
</html>