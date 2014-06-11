<%@include file="header.jsp" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<body>
<div class="tela">
	<header>
		<img src="../_img/logo.png"/>
	</header>

	<aside>
		<a href="#" onClick="efetuarLogoff()"><img src="../_img/exit.png">&lt&lt Sa�da</img></a>	
	
		<nav id="menus">
			 
				<ul>
					<div class="item_menu">
					<li><img src="../_img/menu_projetos.png" width="100%" id="menu_projetos" oncontextmenu="mostrarContexto(this, 'novo_projeto'); return false;"></li>
						<span class="menu_contexto" id="novo_projeto"><a href="#" onClick="novoProjeto()"><img src="../_img/adiciona.png">Novo Projeto</img></a></span>					
					</div>
					<li class="item_menu">
					<c:choose>
						<c:when test="${not empty listaProjetos}">
							<div id="projetos_cadastrados" style="height:450px; overflow:scroll; width:100%">
								<ul class="filetree" id="projetos">
								<c:forEach var="proj" items="${listaProjetos}">
									<li><span class="folder"  oncontextmenu="mostrarContexto(this, 'novo_experimento<c:out value="${proj.idProjeto}"/>'); return false;" onclick="abrirTela('projeto', <c:out value="${proj.idProjeto}"/>)"><c:out value="${proj.nome}"/></span>
							 		    <span class="menu_contexto" id="novo_experimento<c:out value="${proj.idProjeto}"/>">
						 		    		<a href="javascript:void(0)" onclick="novoExperimento(<c:out value="${proj.idProjeto}"/>)"><img src="../_img/adiciona.png"> Adicionar Experimento </img></a>
							 		    </span>
									
									<c:if test="${not empty proj.experimentos}">
										<ul>
											<c:forEach var="exp" items="${proj.experimentos}">
												<li>
													<span class="folder" oncontextmenu="mostrarContexto(this, 'nova_atividade<c:out value="${exp.idExperimento}"/>'); return false;" onclick="abrirTela('experimento', <c:out value="${exp.idExperimento}"/>)">${exp.nome}</span>
											 		<span class="menu_contexto" id="nova_atividade<c:out value="${exp.idExperimento}"/>">
											 			<ul>
											 				<li><a href="javascript:void(0)" onclick="novaAtividade(<c:out value="${exp.idExperimento}"/>)"><img src="../_img/adiciona.png">Adicionar Atividade </img></a></li>
											 				<li><a href="javascript:void(0)" onclick="visualizarExperimento(<c:out value="${exp.idExperimento}"/>)"><img src="../_img/eye.png">Visualizar Experimento</img></a></li>
											 			</ul>
											 		</span>
													<c:if test="${not empty exp.atividades}">
													<ul>
													<c:forEach var="ativ" items="${exp.atividades}">
														<li><span class="file" oncontextmenu="mostrarContexto(this, 'nova_atividade2'); return false;" onclick="abrirTela('atividade', <c:out value="${ativ.idAtividade}"/>)">${ativ.nomeAtividade}</span></li>
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
							<h1>Nenhum projeto cadastrado</h1>
						</c:otherwise>
					</c:choose>
					</li>
					<div class="menu_contexto">
						<li><img src="../_img/menu_sistemas.png" width="100%"></li>

					</div>
	 			</ul>
		</nav>
	</aside>
	
	<section id="corpo">
		<article id="exibicao_conteudo" >
			<img src="../_img/logo_inicial.png" alt="Logo do sistema" id="img_home"/>
		</article>	
	</section>
	
</div>



<!-- POPUP DE DETALHES -->
<div id="users-contain" class="ui-widget">
	<div id="telaPopup">
		<form id="frmPopup">
    	</form>
	</div>
</div>

</body>
</html>