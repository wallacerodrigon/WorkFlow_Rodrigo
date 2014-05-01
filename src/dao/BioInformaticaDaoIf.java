package dao;

import java.util.List;

/**
 *Interface padrao para registro em banco de dados.
 * 
 *
 * @param <T>
 */
public interface BioInformaticaDaoIf<T> {

	public Boolean incluir(T object);
	public Boolean alterar(T object);
	public List<T> listar();
	public Boolean excluir(T object);
	public T recuperar(Object objetoFiltro);
	
	
}
