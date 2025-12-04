# Web PSI Rizerio

Repositório para Front-End do projeto PSI Rizerio

## Descrição

Este é o projeto frontend do PSI Rizerio, conectado a um backend desenvolvido em Java. O objetivo principal deste web projeto é fornecer uma landing page moderna e informativa, voltada para potenciais clientes e pacientes da psicóloga responsável pelo PSI Rizerio.

A landing page apresenta informações essenciais para o paciente, incluindo:

- **Preços de planos**
- **Metodologias utilizadas**
- **Forma de trabalho da psicóloga**
- **Informações detalhadas sobre a profissional**

Além da apresentação institucional, o sistema oferece ao usuário a possibilidade de criar sua própria conta. Com isso, o paciente pode solicitar novos agendamentos, revisar consultas já marcadas e gerenciar tudo de maneira centralizada e simples.

## Funcionalidades

- Landing page informativa sobre a psicóloga
- Exibição de planos, valores e metodologias
- Cadastro de usuários
- Sistema de login e autenticação
- Solicitação e revisão de agendamentos
- Integração com backend Java para persistência e segurança dos dados

## Tecnologias Utilizadas

- **Frontend**:
  - JavaScript
  - ReactJS
  - Tailwind CSS
  - CSS

- **Backend**:
  - Node.js (funções específicas)
  - Integração principal com backend Java usando o framework **Spring Boot**

## Como rodar o projeto

1. **Clone o repositório**
   ```sh
   git clone https://github.com/CodeSensor-PI/web-projeto.git
   cd web-projeto
   ```

2. **Instale as dependências do frontend**
   ```sh
   npm install
   ```

3. **Configure o backend**
   - Certifique-se de ter o backend Java (Spring Boot) rodando e configurado conforme instruções do projeto backend.

4. **Inicie a aplicação**
   ```sh
   npm start
   ```

## Deploy

### Preparação para Deploy

1. **Configure as variáveis de ambiente**
   - Certifique-se de que os arquivos em `environments/` estejam configurados corretamente
   - Defina a URL do backend de produção no arquivo `environment.prd.ts`

2. **Build do projeto**
   ```sh
   npm run build
   ```
   Isso gerará os arquivos otimizados na pasta `dist/`

### Deploy na AWS EC2

**Deploy em EC2 com Nginx:**

1. **Crie uma instância EC2**
   - Amazon Linux 2 ou Ubuntu
   - Tipo: t2.micro (free tier)
   - Configure Security Group: HTTP (80), HTTPS (443), SSH (22)

2. **Conecte via SSH e configure o servidor**
   ```sh
   # Atualize o sistema
   sudo yum update -y  # Amazon Linux
   # ou
   sudo apt update && sudo apt upgrade -y  # Ubuntu

   # Instale Nginx
   sudo yum install nginx -y  # Amazon Linux
   # ou
   sudo apt install nginx -y  # Ubuntu

   # Instale Node.js (para build)
   curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
   sudo yum install nodejs -y
   ```

3. **Clone e build o projeto**
   ```sh
   cd /var/www
   sudo git clone https://github.com/CodeSensor-PI/web-psi-rizerio.git
   cd web-psi-rizerio
   sudo npm install
   sudo npm run build
   ```

4. **Configure Nginx**
   ```sh
   sudo nano /etc/nginx/conf.d/psi-rizerio.conf
   ```
   
   Adicione:
   ```nginx
   server {
       listen 80;
       server_name seu-dominio.com;  # ou IP público da EC2
       root /var/www/web-psi-rizerio/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

5. **Inicie o Nginx**
   ```sh
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

### Variáveis de Ambiente

Certifique-se de configurar as seguintes variáveis no serviço de deploy escolhido:

- `VITE_API_URL` - URL do backend em produção
- Outras variáveis específicas do ambiente de produção conforme necessário

### Pós-Deploy

Após o deploy, verifique:
- ✅ A aplicação está acessível pela URL fornecida
- ✅ A integração com o backend está funcionando corretamente
- ✅ As rotas estão funcionando (verifique configuração de SPA)
- ✅ Os assets estão carregando corretamente


## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

**Agendfy** - Soluções inteligentes para o seu agendamento.
