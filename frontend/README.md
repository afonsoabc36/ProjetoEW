# Relatório de Engenharia Web - Base de Dados de Acordãos

## **Autores**

Afonso Oliveira e Silva, A100604
Eduardo Miguel Pacheco Silva, A95345
Martim de Oliveira e Melo Ferreia, A100653

## **Introdução**

Este relatório surge no âmbito da Unidade Curricular de Engenharia Web, em que nos foi proposto a concepção de uma aplicação _Web_.
A proposta escolhida pelo grupo foi a proposta 5, Gerador de Websites para UC.

## **Objectivos**

- Analisar o dataset de uma UC fornecido e tratá-lo de modo a criar um modelo em MongoDB para o guardar.
- Criar uma interface web de navegação em toda a informação disponibilizada, semelhante ao das UC que se listam no slide seguinte (há espaço para melhorar/alterar o design e até sugerir novas funcionalidades).
- Criar uma funcionalidade para a criação de novas UC (devem implementar todas as operações de CRUD sobre uma UC).
- Ter várias possibilidades de pesquisa sobre as UC criadas e ter uma interface centralizada para aceder ao site de cada uma.
- Permitir que o utilizador que criou a UC edite a informação desta.

## **API de dados** (Backend)

### **Base de dados**

A base de dados da nossa aplicação foi construída baseia-se num sistema NoSQL, o MongoDB.

Criamos 2 coleções, ucs e users.

A coleção **ucs** armazena toda a informação sobre cada unidade curricular criado na aplicação, como o título e sigla, a equipa docente, os horários e sumários de aulas, datas importantes como exames e entregas de projetos, e ainda conteúdo adicionado pela equipa docente.

A coleção **users** armazena toda a informação sobre os utilizadores da aplicação, como o seu _role_ (administrador, docente ou estudante), o seu _nome_, _email_, e outras informações pessoais, e ainda informações como a _data de criação_ da conta, a _data de modificação_ de informações pessoais e a _data do último acesso_ à aplicação.

### **Rotas**

A nossa api de dados responde às seguintes rotas para obter as informações das _ucs_ e dos _users_.

#### /auth

- `POST /register` : Esta rota permite o registo de novos utilizadores na aplicação.
- `POST /login` : Esta rota permite o login a utilizadores já registados na aplicação, mediante as credenciais corretas.
- `POST /googleLogin` : Esta rota utiliza o sistema da Google OAuth 2.0 para realizar o login do utilizador.
- `POST /githubLogin` : Esta rota utiliza o sistema do GitHub Authentication para realizar o login do utilizador.

#### /users

- `GET /` : Esta rota permite obter uma lista de todos os utilizadores da aplicação.
- `GET /me` : Esta rota permite obter as informações que tem login feito na aplicação, através do seu token.
- `GET /:email` : Esta rota permite obter as informações do usuário cujo email corresponde ao email passado na rota.
- `GET /:email/favorites` : Esta rota permite obter apenas as ucs favoritas do utilizador com o email passado na rota.
- `POST /` : Esta rota permite o registo de novos utilizadores na aplicação.
- `PUT /:email` : Esta rota permite a atualização dos dados do utilizador com o email passado na rota.
- `PUT /:email/favorites` : Esta rota permite a atualização das ucs favoritas do utilizador com o email passado na rota.
- `DELETE /:email` : Esta rota permite eliminar da base de dados utilizador com o email passado na rota.

#### /UCs

- `GET /` : Esta rota permite obter uma lista de todas as unidades curriculares da aplicação.
- `GET /:sigla` : Esta rota permite obter as informações da unidade curricular cuja sigla corresponde à sigla passsada na rota.
- `GET /:email` : Esta rota permite obter as informações do usuário cujo email corresponde ao email passado na rota.
- `GET /:email/favorites` : Esta rota permite obter apenas as ucs favoritas do utilizador com o email passado na rota.
- `POST /` : Esta rota permite o registo de novos utilizadores na aplicação.
- `PUT /:email` : Esta rota permite a atualização dos dados do utilizador com o email passado na rota.
- `PUT /:email/favorites` : Esta rota permite a atualização das ucs favoritas do utilizador com o email passado na rota.
- `DELETE /:email` : Esta rota permite eliminar da base de dados utilizador com o email passado na rota.

router.get("/", getUCs);
router.get("/:sigla", getUCBySigla);
router.get("/docentes/:sigla", getDocentesBySigla);
router.post("/", insertUC);

router.post(
"/:sigla/conteudo/:folderName",
uploadDocs.single("doc"),
insertDoc
);
router.delete("/:sigla/conteudo/:folderName/:docName", deleteDoc);
router.delete("/:sigla/conteudo/:folderName", deleteFolder);

router.put("/:sigla", updateUC);
router.delete("/:sigla", deleteUC);
