describe('API testing with Cypress', () => {
  
  beforeEach('Login to application', () => {
    cy.intercept('GET', 'https://api.realworld.io/api/tags', {fixture: 'tags.json'})
    cy.loginToApplication()
  })
  
  it('Verify correct request and response', () => {
    cy.intercept('POST', 'https://api.realworld.io/api/articles/').as('postArticles')

    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').type('This is a title 255')
    cy.get('[formcontrolname="description"]').type('This is a description') 
    cy.get('[formcontrolname="body"]').type('This is a body of the article')
    cy.contains('Publish Article').click()

    cy.wait('@postArticles').then(xhr => {
      console.log(xhr)
      expect(xhr.response.statusCode).to.equal(200)
      expect(xhr.request.body.article.body).to.equal('This is a body of the article')
      expect(xhr.response.body.article.description).to.equal('This is a description')
    })
  })


  it.only('Verify popular tags are displayed', () => {
    cy.get('.tag-list')
      .should('contain', 'cypress')
      .and('contain', 'automation')
      .and('contain', 'testing')
  })
})