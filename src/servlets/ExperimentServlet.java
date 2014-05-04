package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.thoughtworks.xstream.XStream;

import dao.BioInformaticaDaoIf;
import dao.impl.ExperimentoDaoImpl;
import entidades.Experimento;
import entidades.Projeto;

/**
 * Servlet implementation class ActivityServlet
 */
public class ExperimentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String NOME_LISTA_EXPERIMENTOS = "listaExperimentos";

	private BioInformaticaDaoIf<Experimento> daoExperimento;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ExperimentServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);		
	}
	
	@SuppressWarnings("unchecked")
	private void criarAtividadeDao(HttpServletRequest request) throws IOException {
		if (daoExperimento == null){
			request.getSession().setAttribute(NOME_LISTA_EXPERIMENTOS, new ArrayList<Projeto>());
	        daoExperimento = new ExperimentoDaoImpl((List<Experimento>) request.getSession().getAttribute(NOME_LISTA_EXPERIMENTOS));
		}		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		criarAtividadeDao(request);
		Experimento experimento = montarExperimento(request);
		
		String acao = request.getParameter("acao");
		
		if (acao.equalsIgnoreCase("salvar")){
			tratarSalvamentoDoObjeto(request, experimento, response.getWriter());
		} else if (acao.equalsIgnoreCase("consultar") ){
			listar(experimento, response);
		} else if (acao.equalsIgnoreCase("excluir")){
			tratarExclusaoProjeto(experimento, request);
			retornarSucesso(response.getWriter());
		} else if (acao.equalsIgnoreCase("listar") ){
			this.listar(experimento, response);
		} 
	}

	private void tratarExclusaoProjeto(Experimento experimento, HttpServletRequest request) {
		if (daoExperimento.excluir(experimento)){
			atualizarSessao(request);
		}
	}
	
	private void tratarSalvamentoDoObjeto(HttpServletRequest request, Experimento experimento, PrintWriter writer) {
		if (experimento.getIdExperimento() != null && experimento.getIdExperimento() > 0){
			daoExperimento.alterar(experimento);
		} else {
			experimento.setIdExperimento(daoExperimento.listar().size()+1);			
			boolean ok = daoExperimento.incluir(experimento);
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
		request.getSession().setAttribute(NOME_LISTA_EXPERIMENTOS, daoExperimento.listar());
	}

	private void retornarSucesso(PrintWriter writer) {
		writer.write("sucesso");
		
	}

	private void retornarErro(PrintWriter writer) {
		writer.write("erro");
	}


	private Experimento montarExperimento(HttpServletRequest request) {
		Experimento experimento = new Experimento();
		String idExperimento = request.getParameter("idExperimento");
		String idProjeto = request.getParameter("idProjetoDaAtividade");
		String dataInicio = request.getParameter("dataInicio");
		String dataVersao = request.getParameter("dataVersao");
		String dataFim = request.getParameter("dataFim");

		experimento.setIdExperimento(Integer.valueOf(idExperimento));
		experimento.setAnotacoes(request.getParameter("anotacoes"));
		experimento.setDescricao(request.getParameter("descricao"));
		experimento.setLocalExecucao(request.getParameter("localExecucao"));
		experimento.setNome(request.getParameter("nomeExperimento"));
		experimento.setProjeto(new Projeto());
		experimento.getProjeto().setIdProjeto(Integer.valueOf(idProjeto));
		experimento.setVersao(request.getParameter("versao"));
		
		try {
			if (dataInicio != null && !dataInicio.isEmpty()){
				experimento.setDataHoraInicio(new SimpleDateFormat("dd/MM/yyyy").parse(dataInicio));
			}
			if (dataFim != null && !dataFim.isEmpty()){
				experimento.setDataHoraFim(new SimpleDateFormat("dd/MM/yyyy").parse(dataFim));	
			}
			
			if (dataVersao != null && !dataVersao.isEmpty()){
				experimento.setDataVersao(new SimpleDateFormat("dd/MM/yyyy").parse(dataVersao));	
			}
			
		} catch (ParseException e) {
			experimento.setDataHoraInicio(null);
			experimento.setDataHoraFim(null);
			experimento.setDataVersao(null);			
		}	
		
		return experimento;
	
	}


	private void listar(Experimento objetoFiltro, HttpServletResponse response) throws IOException {
		List<Experimento> listaRetorno = new ArrayList<Experimento>();
		for(Experimento atividade : daoExperimento.listar()){
			Integer idExperimento = objetoFiltro.getIdExperimento();
			
			if (idExperimento != null && idExperimento.equals(atividade.getIdExperimento())){
				listaRetorno.add(atividade);
				break;
			}
		}
		response.getWriter().write(this.montarXml(listaRetorno));
	}

	private String montarXml(List<Experimento> listaExperimento) {
		StringBuilder builder = new StringBuilder();
		builder.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		
		XStream x = new XStream();
		x.alias(NOME_LISTA_EXPERIMENTOS, List.class);
		x.alias("experimento", Experimento.class);
		builder.append(x.toXML(listaExperimento));
		

		
		return builder.toString();
	}
	
	

}



