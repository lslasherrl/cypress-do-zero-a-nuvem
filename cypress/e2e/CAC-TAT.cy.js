describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
   cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._. repeat('Teste, ', 20)
    cy.get('#firstName').type('Leo')
    cy.get('#lastName').type('Duarte')
    cy.get('#email').type('leoduartesouza@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Leo')
    cy.get('#lastName').type('Duarte')
    cy.get('#email').type('leoduartesouza@gmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })
  
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Leo')
    cy.get('#lastName').type('Duarte')
    cy.get('#email').type('leoduartesouza@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Leo')
      .should('have.value', 'Leo')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Duarte')
      .should('have.value', 'Duarte')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('leoduartesouza@gmail.com')
      .should('have.value', 'leoduartesouza@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '')
  })  

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.contains('button', 'Enviar').click()  
      cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', () => {
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
    })

})
