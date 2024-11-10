/* eslint-disable no-undef */

const usermail = "aljaz@flare.network"
const userpass = "superduper123"

describe('base checks', () => {
  it('loads admin page', () => {
    cy.visit("/admin")

    cy.get("body", { log: false }).then(body => {
      if (body.find('form[action="/api/users/first-register"]').length == 1) {
        cy.url().should("include", "/admin/create-first-user")

        cy.get('input#field-email').type(usermail)
        cy.get('input#field-password').type(userpass)
        cy.get('input#field-confirm-password').type(userpass)
        cy.get('form[action="/api/users/first-register"]').submit()

      } else {
        cy.url().should("include", "/admin/login")
        cy.get('form[action="/api/users/login"]')
        cy.get('input#field-email').type(usermail)
        cy.get('input#field-password').type(userpass)
        cy.get('form[action="/api/users/login"]').submit()
    
        cy.url().should('contain', '/admin')
      }

      cy.get('a[href="/admin/logout"]').should('exist').wait(1500).click()
      cy.get('button[type="submit"]').contains('Login')

      cy.url().should('contain', '/admin/login')

  
    })    
  })



})