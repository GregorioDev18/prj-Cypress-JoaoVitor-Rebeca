/// <reference types="cypress" />

//Suíte de Testes: Transações
describe("Transações", () => {
  beforeEach(() => {
    cy.visit("https://dev-finance.netlify.app/");
  });

  //Caso de Teste 01: Cadastrar Nova Transação - Entrada
  it("Cadastrar Nova Transação - Entrada", () => {
    criarTrasacao("Manutenção no Site do IFSP-SBV", 500, "2023-10-20");

    //Assertion para verificar se tivemos sucesso ou falha
    cy.get("tbody tr td.description").should(
      "have.text",
      "Manutenção no Site do IFSP-SBV",
    );
  });

  //Caso de Teste 02: Cadastrar Nova Transação - Saída
  it("Cadastrar Nova Transação - Saída", () => {
    //Selecionando a Opção para se Cadastrar Nova Transação - Saída
    cy.contains("Nova Transação").click();

    //Inserindo o Conteúdo da Descrição
    cy.get("#description").type("Pagamento da Infraestrutura");

    //Inserindo o Conteúdo do Valor
    cy.get("#amount").type("-270");

    //Inserindo o Conteúdo da Data -> Máscara obrigatória: yyyy-mm-dd
    cy.get("#date").type("2023-10-21");

    //Selecionando a opção para Salvar a Transação
    cy.contains("button", "Salvar").click();

    //Assertion para verificar se tivemos sucesso ou falha
    cy.get("tbody tr td.description").should(
      "have.text",
      "Pagamento da Infraestrutura",
    );
  });

  //Caso de Teste 03: Cadastrar Nova Transação - Saída Refatorada - Functiona
  it("Cadastrar Nova Transação - Saída Refatorada - Function", () => {
    criarTrasacao("Pagamento do Curso Frontend", -50, "2023-10-22");

    cy.get("tbody tr td.description").should(
      "have.text",
      "Pagamento do Curso Frontend",
    );
  });

  //Caso de Teste 04: Excluir Transação - Opção 1
  it("Excluir Transação - Opção 1", () => {
    criarTrasacao("Refatoração da Aplicação XPTO", 170, "2023-10-23");
    criarTrasacao("Tercerizando o servico de Backend", -100, "2023-10-23");

    cy.contains(".description", "Refatoração da Aplicação XPTO")
      .parent()
      .find("img")
      .click();

    cy.get("tbody tr").should("have.length", 1);
  });

  //Caso de Teste 05: Excluir Transação - Opção 2
  it("Excluir Transação - Opção 2", () => {
    criarTrasacao("Refatoração da Aplicação XPTO", 170, "2023-10-23");
    criarTrasacao("Tercerizando o servico de Backend", -100, "2023-10-23");

    cy.contains(".description", "Refatoração da Aplicação XPTO")
      .siblings()
      .children("img")
      .click();

    cy.get("tbody tr").should("have.length", 1);
  });

  //Caso de Teste 06: Somatório do Card de Entrada
  it("Somatório do Card de Entrada", () => {
    criarTrasacao("Desenvolvimento de Landing Page", 500, "2023-10-24");
    criarTrasacao("Consultoria de SEO", 150, "2023-10-24");

    //Uma saída para garantir que ela NÃO entra no card de Entradas
    criarTrasacao("Compra de Domínio", -40, "2023-10-24");

    //Entradas esperadas: 500 + 150 = 650
    cy.get("#incomeDisplay")
      .invoke("text")
      .then((texto) => {
        expect(converterValor(texto)).to.eq(650);
      });
  });

  //Caso de Teste 07: Somatório do Card de Saída
  it("Somatório do Card de Saída", () => {
    criarTrasacao("Pagamento da Infraestrutura", -270, "2023-10-25");
    criarTrasacao("Pagamento do Curso Frontend", -50, "2023-10-25");

    //Uma entrada para garantir que ela NÃO entra no card de Saídas
    criarTrasacao("Manutenção no Site", 300, "2023-10-25");

    //Saídas esperadas: -270 + -50 = -320
    cy.get("#expenseDisplay")
      .invoke("text")
      .then((texto) => {
        expect(converterValor(texto)).to.eq(-320);
      });
  });

  //Caso de Teste 08: Somatório do Card de Total
  it("Somatório do Card de Total", () => {
    criarTrasacao("Manutenção no Site do IFSP-SBV", 500, "2023-10-26");
    criarTrasacao("Consultoria de SEO", 150, "2023-10-26");
    criarTrasacao("Pagamento da Infraestrutura", -270, "2023-10-26");

    //Total esperado: 500 + 150 - 270 = 380
    cy.get("#totalDisplay")
      .invoke("text")
      .then((texto) => {
        expect(converterValor(texto)).to.eq(380);
      });

    //Validação extra: Total = Entradas + Saídas
    cy.get("#incomeDisplay")
      .invoke("text")
      .then((entradas) => {
        cy.get("#expenseDisplay")
          .invoke("text")
          .then((saidas) => {
            cy.get("#totalDisplay")
              .invoke("text")
              .then((total) => {
                expect(converterValor(total)).to.eq(
                  converterValor(entradas) + converterValor(saidas),
                );
              });
          });
      });
  });

  //Caso de Teste 09: Cadastrar Nova Transação com Valores Nulos
  it("Cadastrar Nova Transação com Valores Nulos", () => {
    //Intercepta o alert disparado pela aplicação
    cy.window().then((win) => {
      cy.stub(win, "alert").as("alerta");
    });

    cy.contains("Nova Transação").click();

    //Tenta salvar sem preencher nenhum campo
    cy.contains("button", "Salvar").click();

    //Assertion: a aplicação deve avisar que os campos são obrigatórios
    cy.get("@alerta").should(
      "have.been.calledWithMatch",
      /preencha todos os campos/i,
    );

    //Assertion: nenhuma transação deve ter sido cadastrada
    cy.get("tbody tr").should("have.length", 0);

    //Assertion: os cards devem continuar zerados
    cy.get("#incomeDisplay")
      .invoke("text")
      .then((t) => expect(converterValor(t)).to.eq(0));
    cy.get("#expenseDisplay")
      .invoke("text")
      .then((t) => expect(converterValor(t)).to.eq(0));
    cy.get("#totalDisplay")
      .invoke("text")
      .then((t) => expect(converterValor(t)).to.eq(0));
  });
});

// Método para Cadastrar novas Transações
function criarTrasacao(descricao, valor, data_transacao) {
  //Selecionando a Opção para se Cadastrar Nova Transação - Entrada
  cy.contains("Nova Transação").click();

  //Inserindo o Conteúdo da Descrição
  cy.get("#description").type(descricao);

  //Inserindo o Conteúdo do Valor
  cy.get("#amount").type(valor);

  //Inserindo o Conteúdo da Data -> Máscara obrigatória: yyyy-mm-dd
  cy.get("#date").type(data_transacao);

  //Selecionando a opção para Salvar a Transação
  cy.contains("button", "Salvar").click();
}

// Método para converter o texto do card ("R$ 1.500,00" / "-R$ 270,00") em número
function converterValor(texto) {
  const limpo = texto
    .replace(/[^\d,-]/g, "") // remove "R$", &nbsp;, espaços e pontos de milhar
    .replace(",", "."); // vírgula decimal -> ponto
  return Number(limpo);
}
