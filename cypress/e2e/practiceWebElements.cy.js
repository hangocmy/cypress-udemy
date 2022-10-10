describe('Cypress Udemy', () => {
  it('Type of Locators', () => {
    cy.visit('/');
    cy.contains('Form').click();
    cy.contains('Form Layouts').click();
  
    //by tag name
    cy.get('input')
  
    //by ID
    cy.get('#inputEmail')
  
    //by class name
    cy.get('.input-full-width')
  
    //by attribute name
    cy.get('[placeholder]')
  
    //by attribute name and value
    cy.get('[placeholder="Email"]')
  
    //by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')
  
    //by tag name and attribute with value
    cy.get('input[placeholder="Email"]')
  
    //by two different attributes
    cy.get('[placeholder="Email"][type="email"]')
  })


  it('Finding Web Elements', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
  })


  it('Saving Subject of the Command', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
      expect(emailLabelFirst).to.equal('Email')
      expect(passwordLabelFirst).to.equal('Password')
      
      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
        expect(passwordLabelFirst).to.equal(passwordSecondText)

        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
      })
    })
  })


  it('Invoke Command', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    describe('Example 1', () => {
      //1
      cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
    
      //2
      cy.get('[for="exampleInputEmail1"]').then(label => {
        expect(label.text()).to.equal('Email address')
      })
  
      //3 Using invoke
      cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
        expect(text).to.equal('Email address')
      })
  
      cy.contains('nb-card', 'Basic form')
        .find('nb-checkbox')
        .click()
        .find('.custom-checkbox')
        .invoke('attr', 'class')
        //.should('contain', 'class')
        .then(classValue => {
          expect(classValue).to.contain('checked')
        })
    })

    describe('Example 2', () => {
      //function
      const sumFunction = (a, b, c) => {
        return a + b + c
      }

      //check
      cy.wrap({sum: sumFunction})
        .invoke('sum', 2 ,4 ,6) //return 12
        .should('be.gt', 10)  //check greater than 
        .and('be.gte', 12)    //check greater than equal to
        .and('be.lt', 100)    //check less than equal to
        .and('be.lte', 12)    //check less than equal to
    })
  })


  it('Radio buttons', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
      //check radio button 1
      cy.wrap(radioButtons)
        .first()
        .check({force: true})
        .should('be.checked')

      //check radio button 2
      cy.wrap(radioButtons)
        .eq(1)
        .check({force: true})
        .should('be.checked')
      
      //verify radio button 1 is not checked
      cy.wrap(radioButtons)
        .first()
        .should('not.be.checked')

      //check radio button 3 is disabled
      cy.wrap(radioButtons)
        .eq(2)
        .should('be.disabled')
    })
  })


  it('Lists and Dropdowns', () => {
    cy.visit('/')

    //1. Working with lists and dropdowns
    //cy.get('nav nb-select').click()
    //cy.get('.options-list').contains('Dark').click()
    
    //cy.get('nav nb-select').should('contain', 'Dark')
    //cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')


    //2. Using each
    cy.get('nav nb-select').then(dropdown => {
      cy.wrap(dropdown).click()
      
      //sử dụng each() để lặp qua các màu background
      cy.get('.options-list nb-option').each((listItem, index) => {
        //sử dụng cú pháp jQuery để lấy ra đoạn text và cắt khoảng trắng của text bằng trim()
        const itemText = listItem.text().trim()

        //sử dụng json lưu tên và giá trị màu
        const colors = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)"
        }

        cy.wrap(listItem).click()
        cy.wrap(dropdown).should('contain', itemText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
      
        if(index < 3){
          cy.wrap(dropdown).click()
        }

      })
    })

  })

  it('Dialog box', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    });
  })
})