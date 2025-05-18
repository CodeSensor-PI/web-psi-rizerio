import styles from "./MeusDados.module.css";
import HeaderDash from '../../../components/headerDash/HeaderDashComponent';
import Titulo from '../../../components/titulo/TituloComponent';
import BotaoSalvar from '../../../components/botaoSalvar/BotaoSalvarComponent';
import { FaPencil, FaLock } from 'react-icons/fa6';
import Input from '../../../components/inputs/InputComponent';
import Accordion from "../../../components/accordion/AccordionComponent";
import { useState } from 'react';

const MeusDados = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [cidade, setCidade] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nomeContatoEmergencia, setNomeContatoEmergencia] = useState('');
    const [telefoneContatoEmergencia, setTelefoneContatoEmergencia] = useState('');
    const [diaConsultas, setDiaConsultas] = useState('');
    const [horarioConsultas, setHorarioConsultas] = useState('');
    const [motivoConsulta, setMotivoConsulta] = useState('');

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
            <HeaderDash showSettingsIcon={true} showBackButton={true} />
            <section className={styles.container_meus_dados}>
                <div className='flex flex-row items-center justify-around w-[80em]'>
                    <Titulo titulo="Meus Dados" />
                    <button className={styles.botao_editar}><FaPencil />Editar</button>
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
                            <div className="flex flex-wrap gap-2.5">
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
                                <div className="flex flex-col gap-2.5 w-[20em] h-17">
                                    <label className="font-bold text-[0.8rem]">Motivo de consulta</label>
                                    <textarea
                                        name="motivo_consulta"
                                        value={motivoConsulta}
                                        style={{ padding: '0.4em' }}
                                        className="border-3 rounded-[20px] border-[#C5A8FA] min-h-10 resize"
                                        onChange={(e) => setMotivoConsulta(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div>
                <div className="flex flex-row justify-around w-[20em]">
                    <BotaoSalvar
                        texto="Salvar"
                        onClick={() => { }}
                    />
                    <button onClick={() => window.location.href = '/dashboard/alterar-senha'} className={styles.botao_senha}><FaLock /> Alterar Senha</button>
                </div>
            </section>
        </>
    );
};

export default MeusDados;