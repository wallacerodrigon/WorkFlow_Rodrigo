package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.thoughtworks.xstream.XStream;

import dao.BioInformaticaDaoIf;
import dao.impl.ProjetoDao;
import entidades.Projeto;

/**
 * Servlet implementation class ProjectServlet
 */
public class ProjectServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private static final String NOME_LISTA_PROJETOS = "listaProjetos";
	private BioInformaticaDaoIf<Projeto> daoProjeto;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProjectServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);		
	}
	
	@SuppressWarnings("unchecked")
	private void criarProjetoDao(HttpServletRequest request) throws IOException {
		if (daoProjeto == null){
			request.getSession().setAttribute(NOME_LISTA_PROJETOS, new ArrayList<Projeto>());
	        daoProjeto = new ProjetoDao((List<Projeto>) request.getSession().getAttribute(NOME_LISTA_PROJETOS));
		}		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		criarProjetoDao(request);
		Projeto projeto = montarProjeto(request);
		
		String acao = request.getParameter("acao");
		
		if (acao.equalsIgnoreCase("salvar")){
			tratarSalvamentoDoProjeto(request, projeto, response.getWriter());
		} else if (acao.equalsIgnoreCase("consultar") ){
			listarProjetos(projeto, response);
		} else if (acao.equalsIgnoreCase("excluir")){
			tratarExclusaoProjeto(projeto, request);
			retornarSucesso(response.getWriter());
		} else if (acao.equalsIgnoreCase("listar") ){
			response.getWriter().write(this.montarXml(daoProjeto.listar()));
		}
	}

	private void tratarExclusaoProjeto(Projeto projeto, HttpServletRequest request) {
		if (daoProjeto.excluir(projeto)){
			atualizarSessao(request);
		}
	}
	
	private void tratarSalvamentoDoProjeto(HttpServletRequest request, Projeto projeto, PrintWriter writer) {
		if (projeto.getIdProjeto() != null && projeto.getIdProjeto() > 0){
			daoProjeto.alterar(projeto);
		} else {
			projeto.setIdProjeto(daoProjeto.listar().size()+1);
			boolean ok = daoProjeto.incluir(projeto);
			if (!ok){
				retornarErro(writer);
				return;
			}
		}
		atualizarSessao(request);
		retornarSucesso(writer);
	}

	/**
	 * @param request
	 */
	private void atualizarSessao(HttpServletRequest request) {
		request.getSession().setAttribute(NOME_LISTA_PROJETOS, daoProjeto.listar());
	}

	private void retornarSucesso(PrintWriter writer) {
		writer.write("sucesso");
		
	}

	private void retornarErro(PrintWriter writer) {
		writer.write("erro");
	}


	private Projeto montarProjeto(HttpServletRequest request) {
		Projeto projeto = new Projeto();
		String idProjeto = request.getParameter("idProjeto");
		String dataInicio = request.getParameter("dataHoraInicio");
		String dataFim = request.getParameter("dataHoraFim");
		
		projeto.setIdProjeto((idProjeto != null && !idProjeto.equals("0"))? Integer.valueOf(idProjeto) : null);
		projeto.setNome(request.getParameter("nome"));
		
		projeto.setCoordenador(request.getParameter("coordenador"));
		projeto.setDescricao(request.getParameter("descricao"));
		
		try {
			if (dataInicio != null && !dataInicio.isEmpty()){
				projeto.setDataHoraInicio(new SimpleDateFormat("dd/MM/yyyy").parse(dataInicio));
			}
			if (dataFim != null && !dataFim.isEmpty()){
				projeto.setDataHoraFim(new SimpleDateFormat("dd/MM/yyyy").parse(dataFim));	
			}
		} catch (ParseException e) {
			projeto.setDataHoraInicio(null);
			projeto.setDataHoraFim(null);
		}	
		projeto.setObservacao(request.getParameter("observacao"));
		projeto.setNomesInstituicoesParticipantes(montarSetInstituicoes(request.getParameterValues("nomesInstituicoesParticipantes")));
		projeto.setNomesInstituicoesFinanciadoras(montarSetInstituicoes(request.getParameterValues("nomesInstituicoesFinanciadoras")));
		return projeto;
	}
	
	private Set<String> montarSetInstituicoes(String[] parameterValues) {
		if (parameterValues != null){
			Set<String> conjunto = new HashSet<String>();
			if (parameterValues.length > 0){
				conjunto.addAll(Arrays.asList(parameterValues));
			}
			return conjunto;
		} else {
			return null;
		}
	}

	private void listarProjetos(Projeto projetoFiltro, HttpServletResponse response) throws IOException {
		List<Projeto> listaRetorno = new ArrayList<Projeto>();
		for(Projeto projeto : daoProjeto.listar()){
			if (projetoFiltro.getIdProjeto()!=null && projetoFiltro.getIdProjeto().equals(projeto.getIdProjeto())){
				listaRetorno.add(projeto);
				break;
			} else if (projetoFiltro.getNome() != null && projetoFiltro.getNome().length() > 0 && projeto.getNome().toLowerCase().contains(projetoFiltro.getNome().toLowerCase()) ){
				listaRetorno.add(projeto);
			}
			
		}
		
		//montar retorno da lista com xml
		response.getWriter().write(this.montarXml(listaRetorno));
	}

	private String montarXml(List<Projeto> listaProjetos) {
		StringBuilder builder = new StringBuilder();
		builder.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		
		XStream x = new XStream();
		x.alias("projetos", List.class);
		x.alias("projeto", Projeto.class);
		builder.append(x.toXML(listaProjetos));
		
		System.out.println(builder.toString());
		
		return builder.toString();
	}
}
