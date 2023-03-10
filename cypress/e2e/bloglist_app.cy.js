describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Jark Manzer',
      username: 'testuser',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('log in to application')
  })

  it('user can login', function() {
    cy.get('#username').type('testuser')
    cy.get('#password').type('password')
    cy.get('#login-button').click()

    cy.contains('Jark Manzer logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.get('#create-button').click()

      cy.contains('Test title Test author')
    })
  })
})