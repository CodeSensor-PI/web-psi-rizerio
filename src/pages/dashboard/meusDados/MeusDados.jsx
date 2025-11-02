import styles from "./meusDados.module.css";
import HeaderDash from "../../../components/headerDash/HeaderDashComponent";
import Titulo from "../../../components/titulo/TituloComponent";
import { FaLock, FaPen } from "react-icons/fa6";
import Input from "../../../components/inputs/InputComponent";
import Accordion from "../../../components/accordion/AccordionComponent";
import Loading from "../../../components/loading/Loading";
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
  const [imagem, setImagem] = useState(null);
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

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <HeaderDash
        telaAtual="meus-dados"
        showSettingsIcon={true}
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
          <figure className="flex flex-col items-center justify-center h-[15em] w-[10em] rounded-xl">
            <img
              className="rounded-xl"
              src={imagem || "https://placehold.co/300x300"}
              alt="Foto de perfil paciente"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            <label className="text-[#643BA1] cursor-pointer mt-2">
              Upload
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImagemChange}
              />
            </label>
            <span>image</span>
          </figure>
          <div className={styles.box_inputs_dados}>
            <Accordion
              texto="Dados Pessoais"
              background="#C5A8FA"
              className="flex flex-wrap"
            >
              <Input
                label="Nome:"
                name="nome"
                type="text"
                value={nome}
                width="w-[20em]"
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome completo"
                fontSize="0.8rem"
                disabled={!editing}
              />
              <Input
                label="Email:"
                name="email"
                type="email"
                value={email}
                width="w-[23em]"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@email.com"
                fontSize="0.8rem"
                disabled={!editing}
              />
              <Input
                label="Data de Nascimento:"
                name="data_nascimento"
                type="date"
                width="w-[12em]"
                value={dataNasc}
                onChange={(e) => setDataNasc(e.target.value)}
                fontSize="0.8rem"
                disabled={true}
              />
              <Input
                label="CPF:"
                name="cpf"
                type="text"
                width="w-[12em]"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                fontSize="0.8rem"
                disabled={true}
              />
            </Accordion>
            <Accordion
              texto="Endereço"
              background="#C5A8FA"
              className="flex flex-wrap"
            >
              <Input
                name="cep"
                value={cep}
                width="w-[8em]"
                label="CEP"
                type="text"
                onChange={(e) => setCep(handleCepChange(e.target.value))}
                onBlur={handleBuscarEndereco}
                placeholder="00000-000"
                fontSize="0.8rem"
                disabled={!editing}
              />
              <Input
                name="logradouro"
                value={logradouro}
                width="w-[20em]"
                label="Logradouro"
                type="text"
                onChange={(e) => setLogradouro(e.target.value)}
                placeholder="Rua, Avenida, Estrada"
                fontSize="0.8rem"
                disabled={!editing}
              />
              <Input
                name="bairro"
                value={bairro}
                width="w-[20em]"
                label="Bairro"
                type="text"
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Insira seu bairro"
                fontSize="0.8rem"
                disabled={!editing}
              />
              <Input
                name="cidade"
                value={cidade}
                width="w-[15em]"
                label="Cidade"
                type="text"
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Insira sua cidade"
                fontSize="0.8rem"
                disabled={!editing}
              />
              <Input
                name="estado"
                value={estado}
                width="w-[12em]"
                label="Estado"
                type="text"
                onChange={handleEstadoChange}
                placeholder="Insira seu estado"
                fontSize="0.8rem"
                className="my-2"
                disabled={!editing}
              />
              <Input
                name="numero"
                width="w-[11em]"
                label="Número"
                value={numero}
                type="text"
                onChange={(e) => setNumero(e.target.value)}
                placeholder="Insira o número"
                max="5"
                fontSize="0.8rem"
                className="my-2"
                disabled={!editing}
              />
              <Input
                name="complemento"
                width="w-[15em]"
                label="Complemento"
                value={complemento}
                type="text"
                onChange={(e) => setComplemento(e.target.value)}
                placeholder="Insira o complemento"
                fontSize="0.8rem"
                className="my-20"
                disabled={!editing}
              />
            </Accordion>
            <Accordion
              texto="Contato"
              background="#C5A8FA"
              className="flex flex-wrap"
            >
              <Input
                label="Telefone:"
                name="telefone"
                type="tel"
                width="w-[12em]"
                value={telefone}
                onChange={handleTelefoneChange}
                onKeyUp={handleKeyPress}
                placeholder="(00) 00000-0000"
                fontSize="0.8rem"
                disabled={!editing}
              />
              <Input
                label="Nome do contato de emergência:"
                name="nome_contato_emergencia"
                type="text"
                width="w-[20em]"
                value={nomeContatoEmergencia}
                onChange={(e) => setNomeContatoEmergencia(e.target.value)}
                placeholder="Contato de emergência"
                fontSize="0.8rem"
                disabled={!editing}
              />
              <Input
                label="Telefone de emergência:"
                name="telefone_contato_emergencia"
                type="tel"
                width="w-[12em]"
                value={telefoneContatoEmergencia}
                onChange={handleTelefoneEmergenciaChange}
                onKeyUp={handleKeyPress}
                placeholder="(00) 00000-0000"
                fontSize="0.8rem"
                disabled={!editing}
              />
            </Accordion>
            <Accordion
              texto="Consulta"
              background="#C5A8FA"
              className="flex flex-wrap"
            >
              <div className="flex flex-wrap gap-2.5 w-max">
                <div className="flex flex-col gap-2.5 w-[20em] h-17">
                  <label className="font-bold text-[0.8rem]">
                    Dia consultas:
                  </label>
                  <select
                    className="border-3 rounded-[20px] border-[#C5A8FA] h-[85%]"
                    name="dia_consultas"
                    value={diaConsultas}
                    disabled={true}
                    onChange={(e) => setDiaConsultas(e.target.value)}
                  >
                    <option value="segunda">Segunda-Feira</option>
                    <option value="terca">Terça-Feira</option>
                    <option value="quarta">Quarta-Feira</option>
                    <option value="quinta">Quinta-Feira</option>
                    <option value="sexta">Sexta-Feira</option>
                  </select>
                </div>
                <Input
                  label="Horário consultas:"
                  name="horario_consultas"
                  placeholder="00:00"
                  type="text"
                  value={horarioConsultas}
                  width="w-[10em]"
                  onChange={(e) => setHorarioConsultas(e.target.value)}
                  fontSize="0.8rem"
                  disabled={true}
                />
              </div>
              <div className="flex flex-col gap-2.5 w-120">
                <label className="font-bold text-[0.8rem]">
                  Motivo de consulta
                </label>
                <textarea
                  name="motivo_consulta"
                  value={motivoConsulta}
                  style={{ padding: "0.4em" }}
                  className="border-3 rounded-[20px] border-[#C5A8FA] min-h-20 resize-y max-w-[30em] h-[5em] overflow-auto"
                  onChange={(e) => setMotivoConsulta(e.target.value)}
                  disabled={true}
                ></textarea>
              </div>
            </Accordion>
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
