import HeaderDash from '../../../../components/headerDash/HeaderDashComponent';
import MainComponent from '../../../../components/main/MainComponent';
import StepComponent from '../../../../components/steps/StepComponent';
import styles from './conclusao.module.css';
import BotaoSalvar from '../../../../components/botaoSalvar/BotaoSalvarComponent'
import { useState } from 'react'
import { errorMessage, responseMessage } from "../../../../utils/alert";
import { atualizarUsuario } from '../../../../provider/api';
import { useNavigate } from 'react-router-dom'
import { cadastrarEndereco, cadastrarTelefone } from '../../../../provider/api';

const Conclusao = () => {

    const [motivoConsulta, setMotivoConsulta] = useState('');
    const navigate = useNavigate()

    async function salvarInformacoes(e) {
        e.preventDefault();

        if (motivoConsulta.length <= 5) {
            errorMessage("Motivo da consulta deve ter mais de 5 caracteres.")
            return
        }

        localStorage.setItem('motivoConsulta', motivoConsulta);
        const idUsuario = localStorage.getItem('idUsuario');
        const paciente = await buscarPacientePorId(idUsuario)
        const dadosPessoais = JSON.parse(localStorage.getItem('dadosPessoais'));
        const contatoEmergencia = JSON.parse(localStorage.getItem('contatoEmergencia'));
        const endereco = JSON.parse(localStorage.getItem('endereco'));

        try {
            const enderecoResponse = await cadastrarEndereco(endereco)

            await cadastrarTelefone({
                ddd: dadosPessoais.ddd,
                numero: dadosPessoais.telefonePaciente,
                nomeContato: dadosPessoais.nomeContato,
                tipo: dadosPessoais.tipo,
                fkPaciente: {
                    id: idUsuario,
                    nome: paciente.nome,
                    cpf: dadosPessoais.cpf,
                    email: paciente.email,
                    status: paciente.status,
                    fkPlano: {
                        id: paciente.fkPlano.id,
                        categoria: paciente.fkPlano.nome,
                        preco: paciente.fkPlano.valor,
                    }
                }
            })

            await cadastrarTelefone({
                ddd: contatoEmergencia.ddd,
                numero: contatoEmergencia.telefone,
                nomeContato: contatoEmergencia.nomeContato,
                tipo: contatoEmergencia.tipo,
                fkPaciente: {
                    id: idUsuario,
                    nome: paciente.nome,
                    cpf: dadosPessoais.cpf,
                    email: paciente.email,
                    status: paciente.status,
                    fkPlano: {
                        id: paciente.fkPlano.id,
                        categoria: paciente.fkPlano.nome,
                        preco: paciente.fkPlano.valor,
                    }
                }
            })

            const body = {
                dataNasc: dadosPessoais.dataNasc,
                cpf: dadosPessoais.cpf,
                motivoConsulta: motivoConsulta,
                fkEndereco: enderecoResponse.id,
            };
            await atualizarUsuario(idUsuario, body);

            responseMessage("Dados atualizados com sucesso!");
            navigate('/dashboard/meus-agendamentos');

        } catch (error) {
            console.error("Erro ao salvar informações: ", error);
            errorMessage("Erro ao salvar informações. ");
        }
    };

    return (
        <>
            <HeaderDash showSettingsIcon={false} />
            <form onSubmit={salvarInformacoes} className={styles.conclusao}>
                <StepComponent stepAtual={4} />
                <MainComponent stepAtual={4} showBackItem={true}>
                    <div className={styles.inputs_content_conclusao}>
                        <label className='font-bold' htmlFor="motivo_consulta">Explique o motivo da sua consulta</label>
                        <textarea required={true}
                            name="motivo_consulta"
                            value={motivoConsulta}
                            onChange={(e) => setMotivoConsulta(e.target.value)}
                        >

                        </textarea>
                    </div>
                    <div className={styles.div_botao}>
                        <BotaoSalvar
                            texto="Salvar dados"
                            type="submit"
                        />
                    </div>
                </MainComponent>

            </form>
        </>
    );
}


export default Conclusao;