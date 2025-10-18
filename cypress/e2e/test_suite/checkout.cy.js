describe('Customer Flow', () => {

    it('Test case 1: Checkout', () => {  
       cy.visit('https://www.saucedemo.com')

         //Login
       cy.get('#user-name').type('standard_user')
       cy.get('#password').type('secret_sauce')
       cy.get('#login-button').click()

       cy.url().should('include','/inventory.html')
       cy.get('.title').should('contain','Products')

         //Choose items
      cy.get('[class="btn btn_primary btn_small btn_inventory "]').then(($elements) => {
      const elementsArray = $elements.toArray();
      // get 3 random elements
      const randomElements = Cypress._.sampleSize(elementsArray, 3);
      // iterate 
      randomElements.forEach((element) => {
         cy.wrap(element).click(); 
    });
  });
         //Cart
      cy.get('.shopping_cart_link').click()
      cy.url().should('include','/cart.html')

         //Checkout
      cy.get('#checkout').click()
      cy.get('#first-name').type('Jean')
      cy.get('#last-name').type('Claude')
      cy.get('#postal-code').type('12345')
      cy.wait(2000)
      cy.get('#continue').click();

         //Finish
      cy.get('.title').should('be.visible')
      cy.url().should('include','/checkout-step-two.html')
      cy.get('.summary_total_label').should('contain','Total')
      cy.get('#finish').click()
      cy.url().should('include','/checkout-complete.html')
      cy.get('.complete-header').should('contain','Thank you for your order!')


    })
  
  })