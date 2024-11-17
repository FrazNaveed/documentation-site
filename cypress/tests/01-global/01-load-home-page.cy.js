/* eslint-disable no-undef */

describe('base page checks', () => {
  it('loads home page', () => {
    cy.request({ url: '/', failOnStatusCode: false }).its('status').should('equal', 404)
    cy.visit('/', {failOnStatusCode: false})
    cy.screenshot()
  })
})
