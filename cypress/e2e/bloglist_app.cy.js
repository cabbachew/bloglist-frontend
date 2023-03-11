describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser({
      username: 'testuser',
      name: 'Jark Manzer',
      password: 'password'
    })
    cy.createUser({
      username: 'anotheruser',
      name: 'Another User',
      password: 'password'
    })
  })

  it('front page can be opened', function() {
    cy.contains('log in to application')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Jark Manzer logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(159, 0, 15)') // #9F000F to RGB

      cy.get('html').should('not.contain', 'Jark Manzer logged in')
      // Alternative:
      // cy.contains('Jark Manzer logged in').should('not.exist')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'password' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.get('#create-button').click()

      cy.contains('Test title Test author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Existing title',
          author: 'Existing author',
          url: 'Existing url'
        })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('it can be deleted by associated user', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'Exiting title Existing author')
      })

      it('it cannot be deleted by another user', function () {
        cy.contains('logout').click()

        cy.login({ username: 'anotheruser', password: 'password' })

        cy.contains('view').click()

        cy.contains('remove').should('not.exist')
      })

      it('it can be liked by another user', function () {
        cy.contains('logout').click()

        cy.login({ username: 'anotheruser', password: 'password' })

        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      describe('and another blog exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Another title',
            author: 'Another author',
            url: 'Another url'
          })
        })

        it('they are sorted by likes', function () {
          cy.contains('Another title Another author').parent().as('anotherBlog')
          cy.get('@anotherBlog').contains('view').click()
          cy.get('@anotherBlog').contains('like').click()

          cy.get('.blog').eq(0).contains('Another title Another author')

          cy.contains('Existing title Existing author').parent().as('existingBlog')
          cy.get('@existingBlog').contains('view').click()
          cy.get('@existingBlog').contains('like').click()
          cy.get('@existingBlog').contains('like').click()

          cy.get('.blog').eq(0).contains('Existing title Existing author')
        })
      })
    })
  })
})