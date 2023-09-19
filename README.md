
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/MatheusW166/mega-shoestore-backend/blob/main/LICENCE)

# MegaShoestore - Backend

API utilizada no e-commerce MegaShoestore. Possui as funcionalidades básicas de um e-commerce:

- Login
- Cadastro
- Listagem de produtos
- Listagem de pedidos
- Baixa de itens
- Controle de estoque
- Registro de pedidos

## Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Autores

- [@MatheusW166](https://github.com/MatheusW166)
- [@lgmacedo](https://github.com/lgmacedo)
- [@aabenjamin](https://github.com/aabenjamim)

## Modelo de dados

<div align="center">
  <img src="https://github.com/MatheusW166/mega-shoestore-backend/blob/main/refs/modelo.png" alt="Modelo" />
</div>

## Endpoints

### Cadastro

```curl
POST /cadastro
```

#### Requisição
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nome`      | `string` | Nome do usuário |
| `email`      | `string` | Email no formato `xxxx@xxxx.xx` |
| `senha`      | `string` | Senha com pelo menos 6 caracteres |

#### Resposta
Nenhuma

<hr/>

### Login

```curl
POST /
```

#### Requisição
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | Email no formato `xxxx@xxxx.xx` |
| `senha`      | `string` | Senha com pelo menos 6 caracteres |

#### Resposta
| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `_id`      | `string` | Identificação do usuário |
| `email`      | `string` | Email no formato `xxxx@xxxx.xx` |
| `nome`      | `string` | Nome do usuário |
| `token` | `string` | Token de autenticação para rotas privadas |

<hr/>

```diff
-Todas as rotas abaixo necessitam do header Authorization: "Bearer ${token}"
```

### Listar produtos

```curl
GET /produtos
```

#### Requisição
Nada

#### Resposta

| Tipo       | Descrição                                   |
| :--------- | :------------------------------------------ |
| `Array`<[Produto](#produto)> | Array de produtos |

##### Produto
| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `_id`      | `string` | Identificação do produto |
| `nome`      | `string` | Nome registrado |
| `descricao`      | `string` | Breve descrição do produto |
| `imagem` | `string` | Imagem em PNG |
| `quantidade` | `number` | Quantidade disponível em estoque |
| `preco` | `number` | Preço do produto em reais |

<hr />

### Listar produtos por IDs

```curl
GET /produtos/muitos
```

#### Requisição
| Query   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `ids`      | `Array<string>` | Array com os ids dos produtos |

#### Resposta
| Tipo       | Descrição                                   |
| :--------- | :------------------------------------------ |
| `Array`<[Produto](#produto)> | Array de produtos |

<hr />

### Obter produto por ID

```curl
GET /produtos/:idProduto
```

#### Requisição

| Parâmetro | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `idProduto`      | `string` | ID do produto desejado |

#### Resposta
| Tipo       | Descrição                                   |
| :--------- | :------------------------------------------ |
| [Produto](#produto) | Produto encontrado no estoque |

<hr />

### Checar se um produto está disponível

```curl
GET /produtos/checar/:idProduto
```

#### Requisição

| Parâmetro | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `idProduto`      | `string` | ID do produto que deseja checar |

#### Resposta
| Tipo       | Descrição                                   |
| :--------- | :------------------------------------------ |
| `bool` | Indica se o produto está disponível ou não |

<hr />

### Listar pedidos

```curl
GET /pedidos
```

#### Requisição
Nada

#### Resposta
| Tipo       | Descrição                                   |
| :--------- | :------------------------------------------ |
| `Array`<[Pedido](#pedido)> | Array dos pedidos do usuário |

##### Pedido
| Campo | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `_id`      | `string` | ID do pedido |
| `idUsuario`      | `string` | ID do usuário que fez o pedido |
| `produtos`      | `Array`<[Produto](#produto)> | Produtos inclusos no pedido |
| `criadoEm`      | `number` | Timestamp da criação |

<hr/>

### Obter pedido por ID
```curl
GET /pedidos/:idPedido
```
#### Requisição
| Parâmetro | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `idPedido`      | `string` | ID do pedido |

#### Resposta
| Tipo       | Descrição                                   |
| :--------- | :------------------------------------------ |
| [Pedido](#pedido)| Pedido encontrado |

<hr/>

### Criar pedido
```curl
POST /pedidos
```

#### Requisição
| Body | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `produtos`      | `Array`<[Item](#item)> | Array composto pelo id dos produtos e a quantidade |

##### Item
| Campo | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `idProduto`      | `string` | ID do produto |
| `quantidadeSelecionada`      | `number` | Quantidade selecionada pelo usuário |

#### Resposta
Nada

## Rodando localmente

Pré-requisitos: NodeJS e MongoDB na última versão estável.

#### Clonando repositório

```bash
git clone https://github.com/MatheusW166/mega-shoestore-backend.git
```

#### Configurando .env

- Crie um arquivo com o nome .env no seguinte formato:
```
DATABASE_URL="sua url de conexão com o mongodb"
```

#### Rodando em modo dev

```bash
npm install
npm run dev
```

🚀 Divirta-se!
