/* eslint-disable no-undef */

const usermail = "aljaz@flare.network"
const userpass = Cypress._.random(0, 1e6);

describe('base checks', () => {
  it('loads admin page', () => {
    cy.visit("/admin")
  })

  
  it("creates first admin user", () => {
    cy.visit("/admin")
    cy.get('form[action="/api/users/first-register"]')
    cy.get('input#field-email').type(usermail)
    cy.get('input#field-password').type(userpass)
    cy.get('input#field-confirm-password').type(userpass)
    cy.get('form[action="/api/users/first-register"]').submit()
  })

  it("logs in as admin user", () => {
      cy.visit("/admin")
      cy.get('form[action="/api/users/login"]')
      cy.get('input#field-email').type(usermail)
      cy.get('input#field-password').type(userpass)
      cy.get('form[action="/api/users/login"]').submit()
  })


})