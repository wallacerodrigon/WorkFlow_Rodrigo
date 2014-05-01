package entidades;

import java.io.Serializable;
import java.util.Date;

public class Atividade implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer idAtividade;
	private Projeto projeto;
	private String nomePrograma;
	private String versaoPrograma;
	private String linhaComando;
	private String funcao;
	private Date dataHoraInicio;
	private Date dataHoraFim;
	private String nomeArquivo;
	
	/**
	 * @return the id
	 */
	public Integer getIdAtividade() {
		return idAtividade;
	}
	/**
	 * @param id the id to set
	 */
	public void setIdAtividade(Integer idAtividade) {
		this.idAtividade = idAtividade;
	}
	/**
	 * @return the projeto
	 */
	public Projeto getProjeto() {
		return projeto;
	}
	/**
	 * @param projeto the projeto to set
	 */
	public void setProjeto(Projeto projeto) {
		this.projeto = projeto;
	}
	/**
	 * @return the nomePrograma
	 */
	public String getNomePrograma() {
		return nomePrograma;
	}
	/**
	 * @param nomePrograma the nomePrograma to set
	 */
	public void setNomePrograma(String nomePrograma) {
		this.nomePrograma = nomePrograma;
	}
	/**
	 * @return the versaoPrograma
	 */
	public String getVersaoPrograma() {
		return versaoPrograma;
	}
	/**
	 * @param versaoPrograma the versaoPrograma to set
	 */
	public void setVersaoPrograma(String versaoPrograma) {
		this.versaoPrograma = versaoPrograma;
	}
	/**
	 * @return the linhaComando
	 */
	public String getLinhaComando() {
		return linhaComando;
	}
	/**
	 * @param linhaComando the linhaComando to set
	 */
	public void setLinhaComando(String linhaComando) {
		this.linhaComando = linhaComando;
	}
	/**
	 * @return the funcao
	 */
	public String getFuncao() {
		return funcao;
	}
	/**
	 * @param funcao the funcao to set
	 */
	public void setFuncao(String funcao) {
		this.funcao = funcao;
	}
	/**
	 * @return the dataHoraInicio
	 */
	public Date getDataHoraInicio() {
		return dataHoraInicio;
	}
	/**
	 * @param dataHoraInicio the dataHoraInicio to set
	 */
	public void setDataHoraInicio(Date dataHoraInicio) {
		this.dataHoraInicio = dataHoraInicio;
	}
	/**
	 * @return the dataHoraFim
	 */
	public Date getDataHoraFim() {
		return dataHoraFim;
	}
	/**
	 * @param dataHoraFim the dataHoraFim to set
	 */
	public void setDataHoraFim(Date dataHoraFim) {
		this.dataHoraFim = dataHoraFim;
	}
	/**
	 * @return the nomeArquivo
	 */
	public String getNomeArquivo() {
		return nomeArquivo;
	}
	/**
	 * @param nomeArquivo the nomeArquivo to set
	 */
	public void setNomeArquivo(String nomeArquivo) {
		this.nomeArquivo = nomeArquivo;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idAtividade == null) ? 0 : idAtividade.hashCode());
		return result;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof Atividade)) {
			return false;
		}
		Atividade other = (Atividade) obj;
		if (idAtividade == null) {
			if (other.idAtividade != null) {
				return false;
			}
		} else if (!idAtividade.equals(other.idAtividade)) {
			return false;
		}
		return true;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Atividade [projeto=" + projeto + ", nomePrograma="
				+ nomePrograma + ", versaoPrograma=" + versaoPrograma
				+ ", funcao=" + funcao + "]";
	}
	

}
