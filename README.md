# 🧮 Projeto: Calculadora Web

Este projeto é a implementação de uma calculadora funcional na tela, criada como projeto final do Curso de Fundamentos (Foundations Course). Utiliza HTML, CSS e JavaScript puro para simular a lógica e o comportamento de uma calculadora padrão.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura da calculadora e dos botões.
* **CSS3:** Estilização da interface, tornando-a responsiva e agradável.
* **JavaScript (ES6+):** Implementação de toda a lógica de estado, operações e manipulação de eventos (cliques e teclado).

## ✨ Funcionalidades Implementadas

O projeto foi desenvolvido para cumprir todos os requisitos do desafio, incluindo os "Gotchas" e os itens de "Crédito Extra".

### Lógica Essencial
* **Operações Básicas:** Funções `add`, `subtract`, `multiply`, `divide` e `operate` implementadas.
* **Encadeamento de Operações:** Permite cálculos contínuos (ex: `10 + 5 - 2 = 13`).
* **Atualização do Display:** O display é atualizado em tempo real com a entrada e os resultados.
* **Botão AC (Clear):** Limpa o estado da calculadora completamente.
* **Botão DEL (Backspace):** Permite apagar o último dígito inserido.

### Tratamento de Erros e Gotchas
* **Divisão por Zero:** Exibe a mensagem "Erro: / 0" e reseta o estado após o erro.
* **Operadores Consecutivos:** Pressionar operadores seguidos (ex: `5 + -`) apenas usa o último operador (`-`).
* **Arredondamento:** Resultados com longos decimais são arredondados para evitar overflow no display.
* **Entrada Pós-Resultado:** Digitar um número após ver um resultado inicia um novo cálculo automaticamente.

### Crédito Extra (Recursos Avançados)
* **Suporte a Decimais:** Adicionado o botão `.` (ponto decimal). A entrada é restrita a um único ponto por número.
* **Suporte ao Teclado:** A calculadora pode ser operada usando o teclado do computador para números, operadores e ações (Enter/=/Backspace/C).

## 🚀 Como Executar o Projeto

1.  **Clone o repositório** ou baixe os arquivos:
    ```bash
    git clone [link suspeito removido]
    ```
2.  **Navegue** até a pasta do projeto.
3.  **Abra o arquivo `index.html`** no seu navegador (clique duas vezes ou use a extensão Live Server).

## 🗺️ Roadmap de Versionamento (Histórico de Commits Sugerido)

Este projeto foi construído seguindo um fluxo de trabalho modular com foco em commits atômicos (utilizando a convenção [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)).

| Commit | Descrição |
| :--- | :--- |
| `feat: setup inicial do projeto com html e css` | Criação da estrutura básica de arquivos e layout inicial. |
| `feat: implementa funcoes matematicas e operate()` | Lógica inicial para `add, subtract, multiply, divide` e a função central `operate`. |
| `feat: implementa entrada de digitos e clear (AC)` | Adiciona a funcionalidade de preencher o display e limpar o estado. |
| `feat: armazena numeros e opera com o botao equals (=)` | Implementação da lógica de estado (`firstNumber`, `operator`, `displayValue`) para cálculo. |
| `feat: permite encadeamento de operacoes` | Ajusta a lógica de operadores para resolver a operação pendente ao pressionar um novo operador (ex: `12 + 7 -`). |
| `fix: trata divisao por zero com mensagem de erro` | Implementação do *Gotcha*: exibe "Erro: / 0" e reseta o estado. |
| `fix: arredonda resultados decimais longos` | Implementação do *Gotcha*: arredonda o resultado para 8 casas decimais. |
| `feat: adiciona botao backspace (DEL)` | Implementação do Crédito Extra: `deleteLast()` para apagar o último dígito. |
| `feat: adiciona suporte a numeros decimais (.)` | Implementação do Crédito Extra: permite `.` e restringe a um por número. |
| `feat: adiciona suporte completo ao teclado` | Implementação do Crédito Extra: mapeia teclas para todas as ações da calculadora. |
| `fix: garante que digitacao apos resultado limpa o display` | Polimento do *Gotcha*: garante que um novo cálculo comece após um resultado ser exibido. |
| `refactor: organiza a logica de operadores consecutivos` | Refinamento da lógica para garantir que o último operador pressionado seja o usado. |