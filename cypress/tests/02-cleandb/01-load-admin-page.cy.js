/* eslint-disable no-undef */

const usermail = "aljaz@flare.network"
const userpass = "superduper123"

describe('base checks', () => {
  it('loads admin page', () => {
    cy.visit("/admin")
  })


  it("creates first admin user if needed", () => {
    cy.visit("/admin")

    cy.get("body", { log: false }).then(body => {
      if (body.find('form[action="/api/users/first-register"]').length == 1) {
        cy.get('input#field-email').type(usermail)
        cy.get('input#field-password').type(userpass)
        cy.get('input#field-confirm-password').type(userpass)
        cy.wait(1000)
        cy.get('form[action="/api/users/first-register"]').submit()
        cy.get('a[href="/admin/logout"]').should('exist').wait(1500).click()
        cy.get('button[type="submit"]').contains('Login')
      }
    })    
  })

  it("logs in as admin user", () => {
    cy.visit("/admin")
    cy.wait(1000)
    cy.get('form[action="/api/users/login"]')
    cy.get('input#field-email').type(usermail)
    cy.get('input#field-password').type(userpass)
    cy.get('form[action="/api/users/login"]').submit()

    cy.url().should('contain', '/admin')
  })


})