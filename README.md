## RentX API

RentX é uma API para um serviço de alugueis de carros, permitindo a criação de usuários(clientes e admin), criação de carros, alugueis etc, além do gerenciamento de tudo.


## Requisitos
* Node

Como instalar o node: https://nodejs.org/en/

* Yarn

Como instalar o yarn: https://yarnpkg.com/lang/en/docs/install/


## Download e Instalação das Dependências

Primeiro clone o projeto na sua máquina por meio do comando:

~~~git
$ git clone https://github.com/silvavinicyus/ignite-rentx.git
~~~

Depois de clonar o projeto instale as dependências e packages utilizados no projeto por meio do comando. **o comando precisa ser dado na raiz do projeto** :

~~~git
$ yarn
~~~


## Rodando o projeto

Para iniciar a API basta executar o comando:

~~~git
$ yarn dev
~~~


## Arquitetura do projeto:

O projeto foi baseado nos conceitos de Arquitetura limpa, Injeção de Dependências e no SOLID proposto por Robert C. Martin (ou Uncle Bob).


## Rodando os testes:
 
(Os testes estão em desenvolvimento nesse momento)
Para rodar os testes feitos para a aplicação basta executar o comando:

~~~git
$ yarn test
~~~


## Documentação

A documentação do projeto foi feita por meio do pacote Swagger UI, para ter acesso a ela basta executar o servidor **yarn dev** e verificar o seguinte endereço no seu browser:

~~~git
$ http://localhost:3333/api-docs
~~~


## Pacotes Usados no projeto:

* Express
* Typescript
* uuid
* Swagger-ui-express
* jest
* TypeORM
* PostgresSQL
* Tsyringe
* multer
* JsonWebToken - JWT
* Bcrypt


## A próxima milha:

O próximo passo na aplicação será a implementação da verificação dos dados vindos das requisições http.


## Contato

Caso tenha ficado alguma dúvida fique livre para entrar em contato comigo por meio do meu email e linkedin:

* Email: vinicyus346@gmail.com
* Linkedin: https://www.linkedin.com/in/vinicyus-silva/


