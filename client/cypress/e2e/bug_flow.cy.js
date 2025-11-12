describe('Bug Tracker E2E', () => {
  it('creates, updates, and deletes a bug', () => {
    cy.visit('/');

    // Create
    cy.get('[data-testid=title-input]').type('E2E bug');
    cy.get('button').contains('Report Bug').click();
    cy.contains('Bug created');

    // Ensure it appears in list
    cy.get('body').contains('E2E bug');

    // Update to in-progress
    cy.contains('E2E bug').parent().within(() => {
      cy.contains('In progress').click();
    });
    // Check status updates after refresh
    cy.reload();
    cy.contains('E2E bug').parent().contains('(in-progress)');

    // Delete
    cy.contains('E2E bug').parent().within(() => {
      cy.contains('Delete').click();
    });
    cy.on('window:confirm', () => true); // accept confirm
    cy.contains('E2E bug').should('not.exist');
  });
});
