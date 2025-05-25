import styles from "./MeusDados.module.css";
import HeaderDash from '../../../components/headerDash/HeaderDashComponent';
import Titulo from '../../../components/titulo/TituloComponent';
import { FaLock } from 'react-icons/fa6';
import Input from '../../../components/inputs/InputComponent';
import Accordion from "../../../components/accordion/AccordionComponent";
import { useState, useEffect } from 'react';
import { buscarPacientePorId, buscarTelefonePorIdPaciente } from "../../../provider/api";

const MeusDados = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [cpf, setCpf] = useState('');
    const [cidade, setCidade] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nomeContatoEmergencia, setNomeContatoEmergencia] = useState('');
    const [telefoneContatoEmergencia, setTelefoneContatoEmergencia] = useState('');
    const [diaConsultas, setDiaConsultas] = useState('');
    const [horarioConsultas, setHorarioConsultas] = useState('');
    const [motivoConsulta, setMotivoConsulta] = useState('');

    function handleCpfChange(cpf) {
        return cpf
            .replace(/\D/g, '') 
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .slice(0, 15);
    }

    async function fetchPacienteData() {
        try {
            const response = await buscarTelefonePorIdPaciente(localStorage.getItem('idUsuario'));
            const responseEndereco = await buscarPacientePorId(localStorage.getItem('idUsuario'));
            const paciente = response[0]?.fkPaciente;

            setNome(paciente?.nome || '');
            setEmail(paciente?.email || '');
            setDataNasc(paciente?.data_nascimento || '');
            setCpf(paciente?.cpf ? handleCpfChange(paciente.cpf) : '');
            setCidade(responseEndereco?.fkEndereco?.cidade || '');

            const telefonePessoal = response.find(t => t.tipo === "PESSOAL");
            const telefoneEmergencial = response.find(t => t.tipo === "EMERGENCIAL");

            setTelefone(telefonePessoal ? `(${telefonePessoal.ddd}) ${telefonePessoal.numero}` : '');
            setTelefoneContatoEmergencia(telefoneEmergencial ? `(${telefoneEmergencial.ddd}) ${telefoneEmergencial.numero}` : '');

            setNomeContatoEmergencia(paciente?.nome_contato_emergencia || '');
            setDiaConsultas(paciente?.dia_consultas || '');
            setHorarioConsultas(paciente?.horario_consultas || '');
            setMotivoConsulta(paciente?.motivo_consulta || '');

        } catch (error) {
            console.error("Erro ao buscar dados do paciente:", error);
        }
    }

    useEffect(() => {
        fetchPacienteData();
    }, [])

    const handleTelefoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const formattedValue = value
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
        setTelefone(formattedValue);
    };

    const handleTelefoneEmergenciaChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const formattedValue = value
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
        setTelefoneContatoEmergencia(formattedValue);
    };

    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <>
            <HeaderDash telaAtual="meus-dados" showSettingsIcon={true} showBackButton={true} />
            <section className={styles.container_meus_dados}>
                <div className='flex flex-row items-center justify-around w-[80em]'>
                    <Titulo titulo="Meus Dados" />
                    <button onClick={() => window.location.href = '/dashboard/alterar-senha'} className={styles.botao_senha}><FaLock /> Alterar Senha</button>
                </div>
                <div className={styles.box_infos}>
                    <figure className="flex flex-col items-center justify-center h-[15em] w-[10em] rounded-xl">
                        <img className="rounded-xl" src="https://placehold.co/300x300" alt="Foto de perfil paciente" />
                        <span className="text-[#643BA1]">Upload</span> imagem
                    </figure>
                    <div className={styles.box_inputs_dados}>
                        <Accordion texto="Dados Pessoais"
                            background="#C5A8FA">
                            <Input
                                label="Nome:"
                                name="nome"
                                type="text"
                                value={nome}
                                width="w-[50%]"
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Nome completo"
                                fontSize="0.8rem"
                            />
                            <Input
                                label="Email:"
                                name="email"
                                type="email"
                                value={email}
                                width="w-[70%]"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@email.com"
                                fontSize="0.8rem"
                                fontSizeInput="0.8rem"
                            />
                            <Input
                                label="Data de Nascimento:"
                                name="data_nascimento"
                                type="date"
                                value={dataNasc}
                                onChange={(e) => setDataNasc(e.target.value)}
                                fontSize="0.8rem"
                            />
                            <Input
                                label="Cidade:"
                                name="cidade"
                                type="text"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                placeholder="Cidade"
                                fontSize="0.8rem"
                            />
                            <Input
                                label="CPF:"
                                name="cpf"
                                type="text"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                onKeyUp
                                placeholder="000.000.000-00"
                                fontSize="0.8rem"
                            />
                        </Accordion>
                        <Accordion texto="Contato"
                            background="#C5A8FA">
                            <Input
                                label="Telefone:"
                                name="telefone"
                                type="tel"
                                value={telefone}
                                onChange={handleTelefoneChange}
                                onKeyUp={handleKeyPress}
                                placeholder="(00) 00000-0000"
                                fontSize="0.8rem"
                            />
                            <Input
                                label="Nome do contato de emergência:"
                                name="nome_contato_emergencia"
                                type="text"
                                value={nomeContatoEmergencia}
                                onChange={(e) => setNomeContatoEmergencia(e.target.value)}
                                placeholder="Contato de emergência"
                                fontSize="0.8rem"
                            />
                            <Input
                                label="Telefone de emergência:"
                                name="telefone_contato_emergencia"
                                type="tel"
                                value={telefoneContatoEmergencia}
                                onChange={handleTelefoneEmergenciaChange}
                                onKeyUp={handleKeyPress}
                                placeholder="(00) 00000-0000"
                                fontSize="0.8rem"
                            />
                        </Accordion>
                        <Accordion texto="Consulta"
                            background="#C5A8FA">
                            <div className="flex flex-wrap gap-2.5 w-max">
                                <div className="flex flex-col gap-2.5 w-[20em] h-17">
                                    <label className="font-bold text-[0.8rem]">Dia consultas:</label>
                                    <select className="border-3 rounded-[20px] border-[#C5A8FA] h-[85%]" name="dia_consultas">
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
                                    type="time"
                                    value={horarioConsultas}
                                    width="w-[10em]"
                                    onChange={(e) => setHorarioConsultas(e.target.value)}
                                    fontSize="0.8rem"
                                />
                            </div>
                            <div className="flex flex-col gap-2.5 h-fit">
                                <label className="font-bold text-[0.8rem]">Motivo de consulta</label>
                                <textarea
                                    name="motivo_consulta"
                                    value={motivoConsulta}
                                    style={{ padding: '0.4em' }}
                                    className="border-3 rounded-[20px] border-[#C5A8FA] min-h-10 resize max-w-[30em] h-[5em]"
                                    onChange={(e) => setMotivoConsulta(e.target.value)}
                                ></textarea>
                            </div>
                        </Accordion>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MeusDados;