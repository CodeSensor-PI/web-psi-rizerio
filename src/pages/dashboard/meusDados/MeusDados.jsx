import styles from "./meusDados.module.css";
import HeaderDash from "../../../components/headerDash/HeaderDashComponent";
import Titulo from "../../../components/titulo/TituloComponent";
import { FaLock, FaPen } from "react-icons/fa6";
import Loading from "../../../components/loading/Loading";
import DadosPessoaisCard from "./components/DadosPessoaisCard";
import EnderecoCard from "./components/EnderecoCard";
import ContatoCard from "./components/ContatoCard";
import ConsultaCard from "./components/ConsultaCard";
import TabMenu from "./components/TabMenu";
import { useState, useEffect } from "react";
import {
  atualizarDados,
  buscarPacientePorId,
  buscarTelefonePorIdPaciente,
  getPreferenciasPorId,
  buscarEnderecoPorCep,
  buscarEnderecoPorCepNumero,
  cadastrarEndereco,
  atualizarEndereco,
  atualizarTelefone,
} from "../../../provider/api";
import { FaSave } from "react-icons/fa";
import {
  confirmEdit,
  responseMessage,
  errorMessage,
} from "../../../utils/alert";

const MeusDados = () => {
  const [loading, setLoading] = useState(true);
  const [editing, isEditing] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [cpf, setCpf] = useState("");
  const [cidade, setCidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nomeContatoEmergencia, setNomeContatoEmergencia] = useState("");
  const [telefoneContatoEmergencia, setTelefoneContatoEmergencia] =
    useState("");
  const [diaConsultas, setDiaConsultas] = useState("");
  const [horarioConsultas, setHorarioConsultas] = useState("");
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [activeTab, setActiveTab] = useState('dados-pessoais');

  const diasSemanaMap = {
    SEGUNDA: "segunda",
    TERCA: "terca",
    QUARTA: "quarta",
    QUINTA: "quinta",
    SEXTA: "sexta",
  };

  const handleBuscarEndereco = async () => {
    try {
      setLoading(true);
      const cepSemFormatacao = cep.replace(/\D/g, "");

      if (cepSemFormatacao.length !== 8) {
        errorMessage("Formato de CEP inválido.");
        return;
      }

      const endereco = await buscarEnderecoPorCep(cepSemFormatacao);
      setLogradouro(endereco.logradouro || "");
      setBairro(endereco.bairro || "");
      setCidade(endereco.localidade || "");
      setEstado(endereco.uf || "");
    } catch (error) {
      errorMessage(error.message || "CEP não encontrado.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editing) {
      isEditing(true);
    } else {
      const result = await confirmEdit(
        "Salvar alterações?",
        "Deseja salvar as alterações?",
        "small"
      );
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const idUsuario = localStorage.getItem("idUsuario");
          const usuarioAtual = await buscarPacientePorId(idUsuario);

          // Monta o payload do endereço
          const enderecoPayload = {
            cep: (cep || usuarioAtual.fkEndereco?.cep)?.replace(/\D/g, ""),
            logradouro: logradouro || usuarioAtual.fkEndereco?.logradouro,
            bairro: bairro || usuarioAtual.fkEndereco?.bairro,
            numero: numero || usuarioAtual.fkEndereco?.numero,
            cidade: cidade || usuarioAtual.fkEndereco?.cidade,
            uf: estado || usuarioAtual.fkEndereco?.uf,
            complemento: complemento || usuarioAtual.fkEndereco?.complemento,
          };

          let enderecoResponse;
          try {
            enderecoResponse = await buscarEnderecoPorCepNumero(
              enderecoPayload.cep,
              enderecoPayload.numero
            );
          } catch (error) {
            if (error?.response?.status === 404) {
              enderecoResponse = await cadastrarEndereco(enderecoPayload);
            } else {
              errorMessage("Erro ao buscar endereço. Tente novamente.");
              setLoading(false);
              return;
            }
          }

          const body = {
            fkPlano: usuarioAtual.fkPlano,
            status: usuarioAtual.status || "ATIVO",
            nome: nome || usuarioAtual.nome,
            cpf: usuarioAtual.cpf,
            email: email || usuarioAtual.email,
            fkEndereco: {
              id: enderecoResponse.id,
              cep: enderecoResponse.cep,
              logradouro: enderecoResponse.logradouro,
              bairro: enderecoResponse.bairro,
              numero: enderecoResponse.numero,
              cidade: enderecoResponse.cidade,
              uf: enderecoResponse.uf,
              complemento: enderecoResponse.complemento,
              createdAt: enderecoResponse.createdAt,
              updatedAt: enderecoResponse.updatedAt,
            },
          };

          await atualizarDados(idUsuario, body);

          const telefones = await buscarTelefonePorIdPaciente(idUsuario);
          const telefonePessoal = telefones.find((t) => t.tipo === "PESSOAL");
          const telefoneEmergencial = telefones.find(
            (t) => t.tipo === "EMERGENCIAL"
          );

          if (telefonePessoal) {
            await atualizarTelefone(telefonePessoal.id, {
              ddd: telefone.slice(1, 3),
              numero: telefone.replace(/\D/g, "").slice(2),
              tipo: "PESSOAL",
              nomeContato: usuarioAtual.nome,
              fkPaciente: {
                id: usuarioAtual.id,
                nome: usuarioAtual.nome,
                cpf: usuarioAtual.cpf,
                email: usuarioAtual.email,
                status: usuarioAtual.status || "ATIVO",
                fkPlano: {
                  id: usuarioAtual.fkPlano?.id,
                  categoria:
                    usuarioAtual.fkPlano?.categoria ||
                    usuarioAtual.fkPlano?.nome,
                  preco:
                    usuarioAtual.fkPlano?.preco || usuarioAtual.fkPlano?.valor,
                },
              },
            });
          }
          if (telefoneEmergencial) {
            await atualizarTelefone(telefoneEmergencial.id, {
              ddd: telefoneContatoEmergencia.slice(1, 3),
              numero: telefoneContatoEmergencia.replace(/\D/g, "").slice(2),
              tipo: "EMERGENCIAL",
              nomeContato: nomeContatoEmergencia,
              fkPaciente: {
                id: usuarioAtual.id,
                nome: usuarioAtual.nome,
                cpf: usuarioAtual.cpf,
                email: usuarioAtual.email,
                status: usuarioAtual.status || "ATIVO",
                fkPlano: {
                  id: usuarioAtual.fkPlano?.id,
                  categoria:
                    usuarioAtual.fkPlano?.categoria ||
                    usuarioAtual.fkPlano?.nome,
                  preco:
                    usuarioAtual.fkPlano?.preco || usuarioAtual.fkPlano?.valor,
                },
              },
            });
          }

          fetchPacienteData();
          responseMessage("Dados atualizados com sucesso!");
          isEditing(false);
        } catch (err) {
          errorMessage("Erro ao atualizar dados!");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  function handleCpfChange(cpf) {
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 15);
  }

  async function fetchPacienteData() {
    try {
      setLoading(true);
      const response = await buscarTelefonePorIdPaciente(
        localStorage.getItem("idUsuario")
      );
      const responseEndereco = await buscarPacientePorId(
        localStorage.getItem("idUsuario")
      );
      const paciente = response[0]?.fkPaciente;
      const preferencias = await getPreferenciasPorId(
        localStorage.getItem("idUsuario")
      );

      // Preenchendo os campos com os dados do paciente
      setNome(paciente?.nome || "");
      setEmail(paciente?.email || "");
      setDataNasc(responseEndereco.dataNasc || "");
      setCpf(paciente?.cpf ? handleCpfChange(paciente.cpf) : "");

      //Preenchendo os campos de telefone
      const telefonePessoal = response.find((t) => t.tipo === "PESSOAL");
      const telefoneEmergencial = response.find(
        (t) => t.tipo === "EMERGENCIAL"
      );

      setTelefone(
        telefonePessoal
          ? `(${telefonePessoal.ddd}) ${telefonePessoal.numero}`
          : ""
      );
      setTelefoneContatoEmergencia(
        telefoneEmergencial
          ? `(${telefoneEmergencial.ddd}) ${telefoneEmergencial.numero}`
          : ""
      );
      setNomeContatoEmergencia(telefoneEmergencial?.nomeContato || "");

      // Preenchendo os campos de endereço
      setCep(
        responseEndereco?.fkEndereco?.cep
          ? handleCepChange(responseEndereco.fkEndereco.cep)
          : ""
      );
      setLogradouro(responseEndereco?.fkEndereco?.logradouro || "");
      setBairro(responseEndereco?.fkEndereco?.bairro || "");
      setCidade(responseEndereco?.fkEndereco?.cidade || "");
      setEstado(responseEndereco?.fkEndereco?.uf || "");
      setNumero(responseEndereco?.fkEndereco?.numero || "");
      setComplemento(responseEndereco?.fkEndereco?.complemento || "");

      // Preenchendo os dados da consulta/preferências
      setDiaConsultas(diasSemanaMap[preferencias?.diaSemana] || "");
      setHorarioConsultas(preferencias?.horario || "");
      setMotivoConsulta(responseEndereco?.motivoConsulta || "");
    } catch (error) {
      console.error("Erro ao buscar dados do paciente:", error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  }

  useEffect(() => {
    fetchPacienteData();
  }, []);

  const handleTelefoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
    setTelefone(formattedValue);
  };

  const handleTelefoneEmergenciaChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
    setTelefoneContatoEmergencia(formattedValue);
  };

  const handleCepChange = (cep) => {
    return cep
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  const handleEstadoChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, "");
    setEstado(value);
  };

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <HeaderDash
        telaAtual="meus-dados"
        showSettingsIcon={false}
        showBackButton={true}
      />
      {loading && <Loading />}
      <section className={styles.container_meus_dados}>
        <div className={styles.titulo_senha_row}>
          <Titulo titulo="Meus Dados" />
          <button
            onClick={() => (window.location.href = "/dashboard/alterar-senha")}
            className={styles.botao_senha}
          >
            <FaLock /> Alterar Senha
          </button>
        </div>
        <div className={styles.box_infos}>
          <div className={styles.box_inputs_dados}>
            <div className={styles.tab_menu_container}>
              <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            
            <div className={styles.content_container}>
              {activeTab === 'dados-pessoais' && (
                <DadosPessoaisCard
                  nome={nome}
                  setNome={setNome}
                  email={email}
                  setEmail={setEmail}
                  dataNasc={dataNasc}
                  setDataNasc={setDataNasc}
                  cpf={cpf}
                  setCpf={setCpf}
                  editing={editing}
                />
              )}
              
              {activeTab === 'endereco' && (
                <EnderecoCard
                  cep={cep}
                  setCep={setCep}
                  logradouro={logradouro}
                  setLogradouro={setLogradouro}
                  bairro={bairro}
                  setBairro={setBairro}
                  cidade={cidade}
                  setCidade={setCidade}
                  estado={estado}
                  setEstado={setEstado}
                  numero={numero}
                  setNumero={setNumero}
                  complemento={complemento}
                  setComplemento={setComplemento}
                  handleCepChange={handleCepChange}
                  handleBuscarEndereco={handleBuscarEndereco}
                  handleEstadoChange={handleEstadoChange}
                  editing={editing}
                />
              )}
              
              {activeTab === 'contato' && (
                <ContatoCard
                  telefone={telefone}
                  handleTelefoneChange={handleTelefoneChange}
                  nomeContatoEmergencia={nomeContatoEmergencia}
                  setNomeContatoEmergencia={setNomeContatoEmergencia}
                  telefoneContatoEmergencia={telefoneContatoEmergencia}
                  handleTelefoneEmergenciaChange={handleTelefoneEmergenciaChange}
                  handleKeyPress={handleKeyPress}
                  editing={editing}
                />
              )}
              
              {activeTab === 'consulta' && (
                <ConsultaCard
                  diaConsultas={diaConsultas}
                  setDiaConsultas={setDiaConsultas}
                  horarioConsultas={horarioConsultas}
                  setHorarioConsultas={setHorarioConsultas}
                  motivoConsulta={motivoConsulta}
                  setMotivoConsulta={setMotivoConsulta}
                />
              )}
            </div>
          </div>
        </div>
        <button onClick={handleEdit} className={styles.botao_editar}>
          {" "}
          {editing ? <FaSave /> : <FaPen />} {editing ? "Salvar" : "Editar"}{" "}
        </button>
      </section>
    </>
  );
};

export default MeusDados;
