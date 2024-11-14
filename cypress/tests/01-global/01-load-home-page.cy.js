/* eslint-disable no-undef */

describe('base page checks', () => {
  it('loads home page', () => {
    cy.visit("/")
    cy.screenshot()
    cy.scrollTo('bottom').wait(1000)
    cy.screenshot()
  })
})
