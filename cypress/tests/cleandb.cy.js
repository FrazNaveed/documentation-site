/* eslint-disable no-undef */
const usermail = "aljaz@flare.network"
const userpass = "superduper123"


Cypress.Commands.add('adminlogin', (bEmail, bPass) => {
  Cypress.session.clearAllSavedSessions()
  cy.session(["admin", bEmail, bPass], () => {
    cy.visit("/admin/login")
    cy.location('pathname').should('eq', '/admin/login')
    cy.get('form[action="/api/users/login"]')
    cy.get('input#field-email').type(bEmail)
    cy.get('input#field-password').type(bPass)
    cy.get('form[action="/api/users/login"]').submit()
    cy.get('a[href="/admin/account"]')
  },
  {
    validate() {
      cy.visit("/admin")
      cy.location('pathname').should('eq', '/admin')
    }
  }
)})
  


describe('base page checks', () => {
  it('loads home page', () => {
    cy.request({ url: '/', failOnStatusCode: false }).its('status').should('equal', 404)
    cy.visit('/', {failOnStatusCode: false})
    cy.screenshot()
  })
})


describe('create admin account if missing', () => {
  it('loads admin page', () => {
    cy.visit("/admin")

    cy.get("body", { log: false }).then(body => {
      if (body.find('form[action="/api/users/first-register"]').length == 1) {
        cy.url().should("include", "/admin/create-first-user")

        cy.get('input#field-email').type(usermail)
        cy.get('input#field-password').type(userpass)
        cy.get('input#field-confirm-password').type(userpass)
        cy.get('form[action="/api/users/first-register"]').submit()

        cy.get('a[href="/admin/logout"]').should('exist').wait(1500).click()
        cy.get('button[type="submit"]').contains('Login')
  
        cy.location('pathname').should('eq', '/admin/login')
      }
    })
  })
})


describe('log into admin panel', () => {
  it('logs in and logs out', () => {
    cy.adminlogin(usermail, userpass)

    cy.visit("/admin")
    cy.location('pathname').should('eq', '/admin')

    cy.get('a[href="/admin/logout"]').should('exist').wait(1500).click()
    cy.get('button[type="submit"]').contains('Login')

    cy.location('pathname').should('eq', '/admin/login')
  })
})


describe('create pages', () => {
  it('creates home page', () => {
    cy.adminlogin(usermail, userpass)
    cy.visit("/admin")

    cy.get('a[href="/admin/collections/pages/create"]').click()
    cy.location('pathname').should('eq', '/admin/collections/pages/create')

    cy.get('input#field-title').type("Home page")
    cy.get('input#field-slug').type("home")

    cy.get('input#field-hero__headline').type("Home page")

    cy.get("div#field-components")

    cy.get("div#field-components > button").click()
    cy.get('button[title="Rich Text Block"]').click()
    cy.get('#components-row-0 div.ContentEditable__root').type("home page text in rich text content block")


    cy.get('button#action-save').click()
    cy.get('button#action-save[disabled]')



    cy.visit("/")
    cy.get('h2').contains("Home page")
    cy.get('h1').contains("Home page")
    cy.get('#mainContent p').contains("home page text in rich text content block")
  })
})