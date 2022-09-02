describe('Blog app', function() {

  beforeEach(function() {
    cy.request('GET', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      'username': 'suabid',
      'name': 'sulaiman abid',
      'password': 'qwerty'
    })
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Log in').click()
  })

  describe('login',function(){
    it('succeeds with correct credentials', function() {
      cy.contains('Log in').click()
      cy.get('#inUser').type('suabid')
      cy.get('#inPassword').type('qwerty')
      cy.get('#btnSubmit').click()
      cy.contains('sulaiman abid logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Log in').click()
      cy.get('#inUser').type('suabid')
      cy.get('#inPassword').type('abc')
      cy.get('#btnSubmit').click()
      cy.contains('invalid username')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })

  describe('When logged in', function(){
    beforeEach(function(){
      cy.login({ username:'suabid',password:'qwerty' })
    })

    it('A blog can be created', function() {
      cy.contains('Create New Entries').click()
      cy.get('.title').type('Getting new bike')
      cy.get('.author').type('laila nasir')
      cy.get('.url').type('http://bike.com')
      cy.contains('Submit').click()

      cy.contains('Getting new bike')
    })

    it('other user cannot remove other user blog', function() {
      cy.createBlog({ title:'Django Framework', url:'http://django.com', author:'toby diaz' })
      cy.contains('log out').click()
      cy.createUser({
        'username': 'linda12',
        'name': 'linda hamilton',
        'password': '1123'
      })
      cy.login({ username:'linda12',password:'1123' })
      cy.createBlog({ title:'when the sun shine', url:'http://getlife', author:'melissa joan' })
      cy.contains('view').click()
      cy.get('#name').contains('sulaiman abid')
      cy.get('#btnRemove').should('not.be.visible')
    })

    describe('many blogs',function() {
      beforeEach(function(){
        cy.createBlog({ title:'The imperial', url:'http://royalbritish', author:'harry markle' })
        cy.createBlog({ title:'when the sun shine', url:'http://getlife', author:'melissa joan' })
        cy.createBlog({ title:'going to the west', url:'http://nationalgeography', author:'choo mei soo' })
      })

      it('user can like a blog',function() {
        cy.contains('when the sun shine')
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('#likes')
          .invoke('text')
          .then(Number)
          .then((n) => {
            cy.get('#btnLikes').click()
            cy.contains('#likes',String(n+1))
          })
      })

      it('blogs are ordered according to likes', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('.blog').eq(0).should('contain', 'The imperial')
        cy.get('.blog').eq(1).should('contain', 'when the sun shine')
      })

      it('user who created blog can remove it', function() {
        cy.createBlog({ title:'when the sun shine', url:'http://getlife', author:'melissa joan' })
        cy.contains('view').click()
        cy.get('#name').contains('sulaiman abid')
        cy.get('#btnRemove').click()
      })

    })
  })

})