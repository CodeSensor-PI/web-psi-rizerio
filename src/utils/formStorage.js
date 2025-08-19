export const salvarDadosFormulario = (etapa, dados) => {
    
    const formularioCompleto = JSON.parse(localStorage.getItem('formulario-completo')) || {};
    if (etapa === 'dados-pessoais') {
        formularioCompleto[etapa] = {
            ...formularioCompleto[etapa], 
            ...dados,
        };
    } else {
        formularioCompleto[etapa] = dados;
    }

    localStorage.setItem('formulario-completo', JSON.stringify(formularioCompleto));
};

export const obterDadosFormulario = () => {
    return JSON.parse(localStorage.getItem('formularioCompleto')) || {};
};