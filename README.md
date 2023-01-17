# Instruções para a execução do projeto.
### Backend

OBS: O NodeJS e o MongoDB (caso não vá utilizar um banco externo) devem estar instalados no ambiente onde será executado o projeto.


1° passo - Com o MongoDB em execução, crie um banco onde serão salvas as informações referentes aos usuários e clientes.


2° passo - Crie um arquivo com o nome `.env`na raiz da aplicação e insira o conteúdo abaixo.

```bash
# a string de conexão com o banco que será usado, seja o mongoDB instalado localmente ou com o Atlas.
URL_CONNECTION=

# vários caracteres aleatórios para que o bcryptjs possa gerar o hash a partir da senha do usuário.
TOKEN_SECRET=

# tempo de expiração do token do usuário (exemplos: 7d, 24h; para 7 dias e 24 horas respectivamente).
TOKEN_EXPIRATION=

# porta local onde o backend estará onvindo as requisições
APP_PORT= 
```
* OBS: Coloque no arquivo `.env`somente as linhas com letras maiúsculas, as linhas que começam com `#` NÃO deve ser colocadas no arquivo, elas estão aqui apenas para explicação de cada trecho do arquivo.


3° passo - Preencha o arquivo `.env`criado no passo anterior com as informações que ele pede, colocando os valores logo após o sinal de igualdade, sem aspas e sem espaços.

4° passo - Abra um terminal e navegue a pasta `backend`, e em seguida execute o comando `npm i`, e quando terminar execute `npm run dev`, para instalar as dependências e executar a aplicação.



### Frontend

1° passo - Abra um terminal e navegue a pasta `frontend`, e em seguida execute o comando `npm i`, e quando terminar execute `npm run dev`, para instalar as dependências e executar a aplicação.

2° passo - Abra seu navegador no endereço `http://localhost:5173/` para acessá-la localmente.

### Vídeo
O vídeo para mais alguns detalhes sobre a aplicação se encontra nesse [Link](https://youtu.be/LbxGhUm_rVc)
