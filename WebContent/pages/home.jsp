<%@include file="header.jsp" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<body>
<div class="tela">
	<header>
		<img src="../_img/logo.png"/>
	</header>

	<aside>
		<nav id="menus">
			
				<ul>
					<div class="item_menu">
					<li><img src="../_img/menu_projetos.png" width="100%" id="menu_projetos"></li>
					<li><a href="#" onClick="novoProjeto()"><img src="../_img/novo.png">Novo Projeto</img></a></li>
					</div>
					<li class="item_menu">
					<c:choose>
						<c:when test="${not empty listaProjetos}">
							<div id="projetos_cadastrados" style="height:370px; overflow:scroll; width:100%">
								<ul class="filetree treeview-famfamfam" id="projetos">
								<c:forEach var="proj" items="${listaProjetos}">
									<li><span class="folder" onclick="abrirTela('projeto', <c:out value="${proj.idProjeto}"/>)"><c:out value="${proj.nome}"/></span>
							 		    <p><a href="javascript:void(0)" onclick="novoExperimento(<c:out value="${proj.idProjeto}"/>)"><img src="../_img/adiciona.png"> Adicionar Experimento </img></a></p>
									
									<c:if test="${not empty proj.experimentos}">
										<ul>
											<c:forEach var="exp" items="${proj.experimentos}">
												<li>
													<span class="folder" onclick="abrirTela('experimento', <c:out value="${exp.idExperimento}"/>)">${exp.nome}</span>
													<p><a href="javascript:void(0)" onclick="novaAtividade(<c:out value="${exp.idExperimento}"/>)"><img src="../_img/adiciona.png"> Adicionar Atividade </img></a></p>
													<c:if test="${not empty exp.atividades}">
													<ul>
													<c:forEach var="ativ" items="${exp.atividades}">
														<li><span class="file"  onclick="abrirTela('atividade', <c:out value="${ativ.idAtividade}"/>)">${ativ.nomeAtividade}</span></li>
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
<%-- 						
						<c:otherwise>
							<span>Nenhum projeto cadastrado</span>
						</c:otherwise> --%>
					</c:choose>
					</li>
					<div class="item_menu">
						<li><img src="../_img/menu_sistemas.png" width="100%"></li>
						<li><a href="#" onClick="efetuarLogoff()"><img src="../_img/exit.png">Sair</img></a></li>
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
</body>
</html>