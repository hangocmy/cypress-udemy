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


  it('Verify popular tags are displayed', () => {
    cy.get('.tag-list')
      .should('contain', 'cypress')
      .and('contain', 'automation')
      .and('contain', 'testing')
  })


  it.only('API Calls Using Cypress', () => {
    /*
    const userCredentials = {
      "user": {
        "email": "artem.bondar16@gmail.com",
        "password": "CypressTest1"
      }
    }
   */
  
    const bodyRequest = {
      "article": {
        "tagList": [],
        "title": "This is a title 255",
        "description": "This is a description",
        "body": "This is a body of the article",
      }
    }

    cy.get('@token').then(token => {
    //cy.request('POST', 'https://conduit.productionready.io/api/users/login', userCredentials).its('body').then(body => {
      
      /*const token = body.user.token*/
      
      cy.request({
        method: 'POST',
        url: 'https://conduit.productionready.io/api/articles',
        headers: {authorization: `Token ${token}`},
        body: bodyRequest
      }).then(response => {
        expect(response.status).to.equal(200)
      })

      cy.contains('Global Feed').click()
      cy.get('.article-preview').first().click()
      cy.get('.article-actions').contains('Delete Article').click()


      cy.request({
        method: 'GET',
        headers: {authorization: `Token ${token}`},
        url: 'https://conduit.productionready.io/api/articles?limit=10&offset=0',
      }).its('body').then(body => {
        expect(body.articles[0].title).to.equal('This is a title 255')
      })
    })
  })
})