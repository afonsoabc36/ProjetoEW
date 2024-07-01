# Relatório de Engenharia Web - Gerador de Websites para UC

## **Autores**

Afonso Oliveira e Silva, A100604 <br />
Eduardo Miguel Pacheco Silva, A95345 <br />
Martim de Oliveira e Melo Ferreia, A100653 <br />

## **Introdução**

Este relatório surge no âmbito da Unidade Curricular de Engenharia Web, em que nos foi proposto a concepção de uma aplicação _Web_.
A proposta escolhida pelo grupo foi a proposta 5, Gerador de Websites para UC.
De maneira a realizar o projeto, decidimos usar _stack_ tecnológica MERN (MongoDB, Express, React, Node.js), devido a sua flexibilidade e eficiência no desenvolvimento de aplicações _Web_.

## **Objectivos**

- Analisar o dataset de uma UC fornecido e tratá-lo de modo a criar um modelo em MongoDB para o guardar.
- Criar uma interface web de navegação em toda a informação disponibilizada, semelhante ao das UC que se listam no slide seguinte (há espaço para melhorar/alterar o design e até sugerir novas funcionalidades).
- Criar uma funcionalidade para a criação de novas UC (devem implementar todas as operações de CRUD sobre uma UC).
- Ter várias possibilidades de pesquisa sobre as UC criadas e ter uma interface centralizada para aceder ao site de cada uma.
- Permitir que o utilizador que criou a UC edite a informação desta.

## **API de dados** (Backend)

### **Base de dados**

A base de dados da nossa aplicação foi construída baseia-se num sistema NoSQL, o MongoDB.

Criamos 2 coleções, **ucs** e **users**.

A coleção **ucs** armazena toda a informação sobre cada unidade curricular criado na aplicação, como o título e sigla, a equipa docente, os horários e sumários de aulas, datas importantes como exames e entregas de projetos, e ainda conteúdo adicionado pela equipa docente.

A coleção **users** armazena toda a informação sobre os utilizadores da aplicação, como o seu _role_ (administrador, docente ou estudante), o seu _nome_, _email_, e outras informações pessoais, e ainda informações como a _data de criação_ da conta, a _data de modificação_ de informações pessoais e a _data do último acesso_ à aplicação.

### **Rotas**

A nossa api de dados responde às seguintes rotas para obter as informações das _ucs_ e dos _users_ no URL `http://localhost:4000`.

#### /auth

- `POST /auth/register` : Esta rota permite o registo de novos utilizadores na aplicação.
- `POST /auth/login` : Esta rota permite o login a utilizadores já registados na aplicação, mediante as credenciais corretas.
- `POST /auth/googleLogin` : Esta rota utiliza o sistema da Google OAuth 2.0 para realizar o login do utilizador.
- `POST /auth/githubLogin` : Esta rota utiliza o sistema do GitHub Authentication para realizar o login do utilizador.

#### /users

- `GET /users/` : Esta rota permite obter uma lista de todos os utilizadores da aplicação.
- `GET /users/me` : Esta rota permite obter as informações que tem login feito na aplicação, através do seu token.
- `GET /users/:email` : Esta rota permite obter as informações do usuário cujo email corresponde ao email passado na rota.
- `GET /users/:email/favorites` : Esta rota permite obter apenas as ucs favoritas do utilizador com o email passado na rota.
- `POST /users/` : Esta rota permite o registo de novos utilizadores na aplicação.
- `PUT /users/:email` : Esta rota permite a atualização dos dados do utilizador com o email passado na rota.
- `PUT /users/:email/favorites` : Esta rota permite a atualização das ucs favoritas do utilizador com o email passado na rota.
- `DELETE /users/:email` : Esta rota permite eliminar da base de dados o utilizador com o email passado na rota.

#### /UCs

- `GET /UCs/` : Esta rota permite obter uma lista de todas as unidades curriculares da aplicação.
- `GET /UCs/:sigla` : Esta rota permite obter as informações da unidade curricular cuja sigla corresponde à sigla passsada na rota.
- `GET /UCs/docentes/:sigla` : Esta rota permite obter uma lista dos docentes que façam parte de uma unidade curricular que corresponda à sigla passada na rota.
- `POST /UCs/` : Esta rota permite o registo de novas unidades curriculares na aplicação.
- `POST /UCs/:sigla/conteudo/:folderName` : Esta rota permite inserir conteúdo associado a uma pasta na unidade curricular que corresponde à sigla passada na rota.
- `PUT /UCs/:sigla` : Esta rota permite a atualização dos dados da unidade curricular com a sigla passada na rota.
- `DELETE /UCs/:sigla` : Esta rota permite eliminar da base de dados a unidade curricular com a sigla passada na rota.
- `DELETE /UCs/:sigla/conteudo/:folderName/:docName` : Esta rota permite eliminar da base de dados um ficheiro na secção de conteúdo da unidade curricular com a sigla passada na rota.
- `DELETE /UCs/:sigla/conteudo/:folderName` : Esta rota permite eliminar da base de dados uma pasta da secção de conteúdo da unidade curricular com a sigla passada na rota.

## Interface (Frontend)

A interface da nossa aplicação foi desenvolvida utilizando a _framework_ React.

### Rotas da Aplicação

#### **Rotas Públicas**

- **`/login`** : Página de login do usuário.
- **`/register`** : Página de registro de novos usuários.
- **`/github-callback`** : Callback para autenticação com GitHub.

#### **Rotas Privadas**

Estas rotas requerem autenticação para acesso.

- **`/`** : Página inicial de pesquisa de UCs, por nome/sigla da UC ou por nome/email do docente.
- **`/uc/:sigla`** : Página de detalhes de uma unidade curricular.
- **`/uc/:sigla/conteudo`** : Página de conteúdos de uma unidade curricular.
- **`/uc/:sigla/conteudo/:folderName/:fileName`** : Visualizador de documentos.

#### **Rotas Protegidas (Admin e Docente)**

Estas rotas requerem que o usuário tenha a _role_ de administrador ou docente.

- **`/uc/:sigla/editar`** : Página para editar uma unidade curricular.
- **`/uc/criar`** : Página para criar uma nova unidade curricular.

#### **Rotas Protegidas (Admin)**

Estas rotas requerem que o usuário tenha a _role_ de administrador.

- **`/admin`** : Página administrativa com a lista de usuários.
- **`/admin/criar`** : Página para criar um novo usuário.
- **`/admin/editar/:email`** : Página para editar os dados de um usuário.

#### **Outras Rotas**

- **`/perfil`** : Página de perfil do usuário.
- **`/perfil/editar`** : Página para editar o perfil do usuário.
- **`/unauthorized`** : Página exibida quando o usuário tenta acessar uma rota não autorizada.
- **`*`** : Página exibida para rotas não encontradas (404).

## Conclusão

Dado por concluído este projeto, achamos que este projeto nos ajudou muito na consolidação de toda a matéria e de todo o material que nos foi fornecido durante as aulas práticas e teóricas de Engenharia Web.

Foi um projeto desafiante de realizar, mas algo que gostámos de realizar e de todo o processo que o englobou.

Para além das funcionalidades básicas e dos objetivos do trabalho, adicionamos também a funcionalidade da página de Conteúdo para cada unidade curricular, permitindo aos docentes partilhar ficheiros mais facilmente com os alunos.

## Execução da aplicação

Antes de executar os próximos passos, assegure-se que tem o MongoDB a responder na porta 27017 (porta default do MongoDB).

### API de Dados

```
cd backend
npm run dev
```

### Interface

```
cd frontend
npm start
```

### Docker

Alternativamente, e se tiver Docker instalado na sua máquina, pode correr o seguinte comando:

```
docker-compose build -d
docker-compose up -d (Iniciar a aplicação)
docker-compose down (Desligar a aplicação)
```

**Nota**: Em alguns sistemas pode ser necessário utilizar o comando sudo antes.
