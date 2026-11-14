/// <reference types="cypress" />

//Suíte de Testes: Transações
describe('Transações', () => {
    
    //Caso de Teste 01: Cadastrar Nova Transação - Entrada
    it('Cadastrar Nova Transação - Entrada', () => {
        //Definindo a Página a ser Testada
        cy.visit("https://dev-finance.netlify.app/")
        
        //Selecionando a Opção para se Cadastrar Nova Transação - Entrada
        cy.contains("Nova Transação").click();

        //Inserindo o Conteúdo da Descrição
        cy.get('#description').type("Manutenção no Site do IFSP-SBV");

        //Inserindo o Conteúdo do Valor
        cy.get('#amount').type("500");

        //Inserindo o Conteúdo da Data -> Máscara obrigatória: yyyy-mm-dd
        cy.get('#date').type("2023-10-20");

        //Selecionando a opção para Salvar a Transação
        cy.contains('button', 'Salvar').click();

        //Assertion para verificar se tivemos sucesso ou falha
        cy.get("tbody tr td.description").should("have.text", "Manutenção no Site do IFSP-SBV");
    });

    //Caso de Teste 02: Cadastrar Nova Transação - Saída
    it('Cadastrar Nova Transação - Saída', () => {
        //Definindo a Página a ser Testada
        cy.visit("https://dev-finance.netlify.app/")

        //Selecionando a Opção para se Cadastrar Nova Transação - Saída
        cy.contains("Nova Transação").click();
    
        //Inserindo o Conteúdo da Descrição
        cy.get('#description').type("Pagamento da Infraestrutura");
    
        //Inserindo o Conteúdo do Valor
        cy.get('#amount').type("-270");
    
        //Inserindo o Conteúdo da Data -> Máscara obrigatória: yyyy-mm-dd
        cy.get('#date').type("2023-10-21");
    
        //Selecionando a opção para Salvar a Transação
        cy.contains('button', 'Salvar').click();
    
        //Assertion para verificar se tivemos sucesso ou falha
        cy.get("tbody tr td.description").should("have.text", "Pagamento da Infraestrutura");
    });
    
    //Caso de Teste 03: Cadastrar Nova Transação - Saída Refatorada - Functiona
    it.skip('Cadastrar Nova Transação - Saída Refatorada - Function', () => {
       
    });

    //Caso de Teste 04: Excluir Transação - Opção 1
    it.skip('Excluir Transação - Opção 1', () => {
       
    });

    //Caso de Teste 05: Excluir Transação - Opção 2
    it.skip('Excluir Transação - Opção 2', () => {
        
    });
	
    //Caso de Teste 06: Somatório do Card de Entrada
	it.skip('Somatório do Card de Entrada', () => {
       
    });

    //Caso de Teste 07: Somatório do Card de Saída
    it.skip('Somatório do Card de Saída', () => {
       
    });

    //Caso de Teste 08: Somatório do Card de Total
    it.skip('Somatório do Card de Total', () => {
       
    });

    //Caso de Teste 09: Cadastrar Nova Transação com Valores Nulos
    it.skip('Cadastrar Nova Transação com Valores Nulos', () => {
        
    });
});

// Método para Cadastrar novas Transações
function criarTrasacao(descricao, valor, data_transacao) {
    
}