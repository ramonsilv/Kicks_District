# Kicks District

Site estático em HTML5, CSS3 e JavaScript puro (sem frameworks, sem build).

## Estrutura
- `index.html`, `produtos.html`, `contato.html`
- `css/style.css` (cores e medidas em `:root`)
- `js/dados.js` (catálogo), `main.js` (menu, carrossel, destaques), `produtos.js` (busca/filtro/modal), `contato.js` (validação)
- `assets/img/{logo,banners,produtos}`, `assets/favicon`

## Como executar
Abra `index.html` no navegador. Para testes mais fiéis: `python -m http.server 8000` na pasta do projeto e acesse `http://localhost:8000`.

## Imagens
| Arquivo | Uso | Página |
|---|---|---|
| `logo/logo-kicks-district.png` (logo branca, recortada) | cabeçalho e rodapé; só funciona sobre fundo escuro | todas |
| `banners/carrossel-01..03.svg` | carrossel | index |
| `produtos/produto-01..05.png` | catálogo, destaques; `produto-05` também no hero | index, produtos |
| `favicon/favicon.png` | ícone da aba (gerado a partir da logo) | todas |

## Atualizar produtos
Edite `js/dados.js`. Preço e estoque não foram informados e por isso não existem filtro nem ordenação por preço.

## Formulário de contato
O envio **não está conectado**: o formulário só valida e avisa isso. Para ativar, defina `ENDPOINT` em `js/contato.js` com a URL de um serviço de formulários. Preencha os canais de atendimento em `contato.html` (trechos marcados `[Preencher]`).

## Não utilizados (decisão do proprietário pendente)
`carrosel-01.svg` ("Drop 01 / Nova coleção"), `carrossel-04.svg` ("Limited Drop") e o arquivo `_avif` (fotografia de corredores com tênis de outra marca).
