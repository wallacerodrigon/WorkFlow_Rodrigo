/**
 * 
 */
package dao.impl;


import java.io.IOException;
import java.io.Serializable;
import java.util.List;

import dao.BioInformaticaDaoIf;

/**
 * Implementacao dos metodos de salvamento de dados em banco de dados.
 * @param <T>
 *
 */
public abstract class BioInformaticaDaoImpl<T> implements BioInformaticaDaoIf<T>, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<T> listaDados; 
	
	public BioInformaticaDaoImpl(List<T> listaDados) throws IOException {
		this.listaDados = listaDados;
	}
	

	public Boolean incluir(T object) {
		if (exists(object)){
			return false;
		}
		listaDados.add(object);
		return true;
	}
	

	public Boolean alterar(T object) {
		int indiceFound = -1;
		for(int indice = 0; indice < listaDados.size(); indice++){
			T objeto = listaDados.get(indice);
			if (objeto.equals(object)){
				indiceFound = indice;
				break;
			}
		}
		
		if (indiceFound > -1){
			listaDados.set(indiceFound, object);
			return true;
		} else {
			return false;
		}
	}	
	
	private boolean exists(T object){
		for(T objeto : listaDados){
			if (objeto.equals(object)){
				return true;
			}
		}
		return false;
	}

	@SuppressWarnings("unchecked")
	public List<T> listar() {
		return listaDados;
	}

	public Boolean excluir(T object) {
		int indiceFound = -1;
		for(int indice = 0; indice < listaDados.size(); indice++){
			T objeto = listaDados.get(indice);
			if (objeto.equals(object)){
				indiceFound = indice;
				break;
			}
		}
		if (indiceFound > -1){
			listaDados.remove(indiceFound);
			return true;
		} else {
			return false;
		}
		
	}

	public T recuperar(Object objetoFiltro) {
		for(T objeto : listaDados){
			if (objeto.equals(objetoFiltro)){
				return objeto;
			}
		}
		return null;
	}

}
