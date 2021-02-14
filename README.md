# Crud - Backend

Para o desenvolvimento do backend como API foram tomadas as seguintes decisões técnicas.
| O quê? | Para? |
| ------ | ------ |
| Nest.js | Construção dos endpoints. |
| Yarn | Gerenciamento de dependências. |
| Typescript | Em todo o projeto para a tipagem de valores no fluxo de dados. |
| Postgres | Banco de dados. |
| TypeORM | Mapeamento de entidades e criação do db. |
| Jest | Testes unitários. |
| Docker | Preparação de ambiente de banco e servidor. |
| Adminer | Visualização do db em browser. |

Requisitos para execução do projeto:
  - Nodejs
  - Npm
  - Yarn
  - Docker

Para preparação do ambiente e execução do servidor de API e banco, executar:
```sh
$ docker-compose up
```
Não é necessário executar scripts de banco, o TypeORM fica responsável pela criação de base e tabelas.

O adminer para visualização do banco estará disponível em:
```sh
http://localhost:8080
```

Os endpoints da aplicação estarão disponíveis em:
```sh
http://localhost:3001
```

| Método | Endpoint | Para? |
| ------ | ------ | ------ |
| GET | /developers | Listagem de desenvolvedores. |
| GET | /developers? | Filtro de desenvolvedor por parâmetros de query. |
| GET | /developers/{id} | Detalhar desenvolvedor por id. |
| POST | /developers | Inserir desenvolvedor. |
| PUT | /developers/{id} | Atualizar desenvolvedor. |
| DELETE | /developers/{id} | Remover desenvolvedor. |

## Endpoints
### GET /developers
Utilizando métodos GET retorna uma lista de objetos com os dados do desenvolvedor no formato:

```sh
[
    {
        "id": 0,
        "name": "string",
        "gender": "c",
        "age": 0,
        "hobby": "string",
        "birthdate": "0000-00-00T00:00:00.000Z"
    },
]
```

### GET /developers?
Utilizando métodos GET e informando parâmetros de query retorna uma lista de objetos com os dados do desenvolvedor que correspondam aos critérios no mesmo formato do endpoint anterior.
Os parâmetros de query permitidos são:

| Parâmetro | Tipo |
| ------ | ------ |
| name | string |
| gender | char |
| hobby | string |
| birthdate | string |
| page | number |
| limit | number |

Os parâmetros podem ser combinados da seguinte forma:

```sh
?name=xxxx&gender=x&age=0&hobby=xxxx&birthdate=xxxx&page=x&limit=x
```

### GET /developers/{id}
Informando um valor de id de usuário com o método GET, o retorno será de um objeto de usuário no formato:
```sh
{
    "id": 0,
    "name": "string",
    "gender": "c",
    "age": 0,
    "hobby": "string",
    "birthdate": "0000-00-00T00:00:00.000Z"
}
```

### POST /developers
Através do método POST e enviando a seguinte estrutura como body da requisição, este endpoint insere um novo usuário no banco.
```sh
{"name":"xxxx", "gender": "x", "age": 0, "birthdate": "0000-00-00", "hobby":"xxxx"}
```

### PUT /developers
Com o método PUT e o id de usuário na estrutura abaixo é possível atualizar os dados de um usuário.
```sh
{"name":"xxxx", "gender": "x", "age": 0, "birthdate": "0000-00-00", "hobby":"xxxx"}
```

### PUT /developers
Com o método DELETE e o id de usuário é possível remover um usuário do banco.
A remoção é física, não lógica.

[![N|Solid](http://fior.in/img/fiorin.png)](http://fior.in)
