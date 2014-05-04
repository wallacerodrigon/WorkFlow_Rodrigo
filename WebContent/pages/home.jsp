<%@include file="header.jsp" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<body>
<div class="tela">
	<header>
		<img src="../_img/logo.png"/>
	</header>

	<aside>
		<nav id="menus">
				<div><a href="#" onClick="novoProjeto()">Novo Projeto</a></div>
				
				<c:choose>
					<c:when test="${not empty listaProjetos}">
						<div><a href="#"><span id="lstProjetos">Projetos Cadastrados</span></a></div>
						<div id="projetos_cadastrados" style="height:450px; overflow:scroll; width:100%">
							<ul class="filetree treeview-famfamfam" id="projetos">
							<c:forEach var="proj" items="${listaProjetos}">
								<li><span class="folder" onclick="abrirTela('project.jsp', <c:out value="${proj.idProjeto}"/>)"><c:out value="${proj.nome}"/></span>
								
								<c:if test="${not empty proj.experimentos}">
									<ul>
										<c:forEach var="exp" items="${proj.experimentos}">
											<li>
												<span class="folder"  onclick="abrirTela('experiments.jsp', <c:out value="${exp.idExperimento}"/>)">${exp.nome}</span>
												<c:if test="${not empty exp.atividades}">
												<ul>
												<c:forEach var="ativ" items="${exp.atividades}">
													<li><span class="file"  onclick="abrirTela('activity.jsp', <c:out value="${ativ.idAtividade}"/>)">${ativ.nomeAtividade}</span></li>
												</c:forEach>
												</ul>
												</c:if>
											</li>
										</c:forEach>
									</ul>					
								</c:if>
							</c:forEach>
							</ul>
						</div>
					</c:when>
					
					<c:otherwise>
						<span>Nenhum projeto cadastrado</span>
					</c:otherwise>
				</c:choose>
	 			<div><a href="#" onClick="efetuarLogoff()">Sair do Sistema</a></div>
		</nav>
	</aside>
	
	<section id="corpo">
		<article id="exibicao_conteudo">
			<img src="../_img/logo_inicial.png" alt="Logo do sistema" id="img_home"/>
		</article>	
		
		
	</section>
</div>

</body>
</html>