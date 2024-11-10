/* eslint-disable no-undef */

describe('base page checks', () => {
  it('loads home page', () => {
    cy.visit("/")
    cy.scrollTo('bottom')
    cy.scrollTo('top')
  })
})
