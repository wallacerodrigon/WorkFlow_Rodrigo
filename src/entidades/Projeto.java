package entidades;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

public class Projeto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer idProjeto;

	private String nome;
	private String descricao;
	private String coordenador;
	private Date dataHoraInicio;
	private Date dataHoraFim;
	private String observacao;
	private Set<String> nomesInstituicoesParticipantes;
	private Set<String> nomesInstituicoesFinanciadoras;
	

	/**
	 * @return the nome
	 */
	public String getNome() {
		return nome;
	}
	/**
	 * @param nome the nome to set
	 */
	public void setNome(String nome) {
		this.nome = nome;
	}
	/**
	 * @return the descricao
	 */
	public String getDescricao() {
		return descricao;
	}
	/**
	 * @param descricao the descricao to set
	 */
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	/**
	 * @return the coordenador
	 */
	public String getCoordenador() {
		return coordenador;
	}
	/**
	 * @param coordenador the coordenador to set
	 */
	public void setCoordenador(String coordenador) {
		this.coordenador = coordenador;
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
	 * @return the observacao
	 */
	public String getObservacao() {
		return observacao;
	}
	/**
	 * @param observacao the observacao to set
	 */
	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}
	/**
	 * @return the nomesInstituicoesParticipantes
	 */
	public Set<String> getNomesInstituicoesParticipantes() {
		return nomesInstituicoesParticipantes;
	}
	/**
	 * @param nomesInstituicoesParticipantes the nomesInstituicoesParticipantes to set
	 */
	public void setNomesInstituicoesParticipantes(
			Set<String> nomesInstituicoesParticipantes) {
		this.nomesInstituicoesParticipantes = nomesInstituicoesParticipantes;
	}
	/**
	 * @return the nomesInstituicoesFinanciadoras
	 */
	public Set<String> getNomesInstituicoesFinanciadoras() {
		return nomesInstituicoesFinanciadoras;
	}
	/**
	 * @param nomesInstituicoesFinanciadoras the nomesInstituicoesFinanciadoras to set
	 */
	public void setNomesInstituicoesFinanciadoras(
			Set<String> nomesInstituicoesFinanciadoras) {
		this.nomesInstituicoesFinanciadoras = nomesInstituicoesFinanciadoras;
	}
	/**
	 * @return the idProjeto
	 */
	public Integer getIdProjeto() {
		return idProjeto;
	}
	/**
	 * @param idProjeto the idProjeto to set
	 */
	public void setIdProjeto(Integer idProjeto) {
		this.idProjeto = idProjeto;
	}	
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Projeto [nome=" + nome + ", descricao=" + descricao
				+ ", coordenador=" + coordenador + ", dataHoraInicio="
				+ dataHoraInicio + ", dataHoraFim=" + dataHoraFim + "]";
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idProjeto == null) ? 0 : idProjeto.hashCode());
		result = prime * result + ((nome == null) ? 0 : nome.hashCode());
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
		if (!(obj instanceof Projeto)) {
			return false;
		}
		Projeto other = (Projeto) obj;
		if (idProjeto == null) {
			if (other.idProjeto != null) {
				return false;
			}
		} else if (!idProjeto.equals(other.idProjeto)) {
			return false;
		}
		return true;
	}

}
