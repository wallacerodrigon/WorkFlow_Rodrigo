package servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import entidades.Usuario;

/**
 * Servlet implementation class LoginServlet
 */
public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	private static final String USUARIO_PADRAO = "fulano";
	private static final String SENHA_PADRAO = "123";
	private static final String NOME_USR_PADRAO = "Rodrigo Pinheiro";
	
	private static final String NOME_USUARIO_NA_SESSAO= "usuarioLogado";
	private static final String NOME_LISTA_USUARIOS = "listaUsuarios";
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Usuario usuario = montarUsuario(request);
		String acao =request.getParameter("acao");
		if (acao != null ){ 
			if (acao.equalsIgnoreCase("login")){
				tratarLoginUsuario(request, response, usuario);
			} else if (acao.equalsIgnoreCase("cadastro")){
				this.cadastrarUsuario(request, response, usuario);
			} else if (acao.equalsIgnoreCase("logoff")) {
				request.getSession().invalidate();
				retornarResposta(true, response);
			}
		}
	}

	private void cadastrarUsuario(HttpServletRequest request, HttpServletResponse response, Usuario usuario) throws IOException {
		List<Usuario> listaUsuariosCadastrados = this.listarUsuarios(request);
		
		if (listaUsuariosCadastrados.contains(usuario)){
			throw new IOException("Usuario ja cadastrado");
		} else {
			listaUsuariosCadastrados.add(usuario);
			request.getSession().setAttribute(NOME_LISTA_USUARIOS, listaUsuariosCadastrados);
			this.retornarResposta(true, response);	
		}
	}

	/**
	 * @param request
	 * @param response
	 * @param usuario
	 * @throws IOException
	 */
	private void tratarLoginUsuario(HttpServletRequest request,HttpServletResponse response, Usuario usuario) throws IOException {
		if (isUsuarioValido(usuario, this.listarUsuarios(request))){
			usuario.setNome(NOME_USR_PADRAO);
			this.colocarUsuarioNaSessao(usuario, request);
			this.retornarResposta(true, response);
		} else {
			this.retornarResposta(false, response);
		}
	}

	/**
	 * @param request
	 * @return
	 */
	private Usuario montarUsuario(HttpServletRequest request) {
		Usuario usuario = new Usuario();
		usuario.setNome(request.getParameter("nome"));
		usuario.setUsuario(request.getParameter("login"));
		usuario.setSenha(request.getParameter("senha"));
		return usuario;
	}
	
	private void retornarResposta(boolean b, HttpServletResponse response) throws IOException {
		response.getWriter().print((b)?"sucesso":"erro");
	}

	private void colocarUsuarioNaSessao(Usuario usuario, HttpServletRequest request) {
		HttpSession sessao = request.getSession();
		sessao.setAttribute(NOME_USUARIO_NA_SESSAO, usuario);
	}

	private boolean isUsuarioValido(Usuario usuario, List<Usuario> listaUsuarios){
		for(Usuario u : listaUsuarios){
			if (u.getUsuario().equalsIgnoreCase(usuario.getUsuario()) && 
				u.getSenha().equalsIgnoreCase(usuario.getSenha())	
				){
				return true;
			}
		}
		return false;
	}
	
	@SuppressWarnings("unchecked")
	private List<Usuario> listarUsuarios(HttpServletRequest request){
		List<Usuario> usuarios = new ArrayList<Usuario>();
		HttpSession sessao = request.getSession();
		if (sessao.getAttribute(NOME_LISTA_USUARIOS) != null){
			usuarios = (List<Usuario>) sessao.getAttribute(NOME_LISTA_USUARIOS);
		} else {
			sessao.setAttribute(NOME_LISTA_USUARIOS, usuarios);
		}
		return usuarios;
	}

}
