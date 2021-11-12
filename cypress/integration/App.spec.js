
describe ('Test App', () => {
    it ('launches', () => {
        cy.visit ('/');
    });

    it ('opens with LocateMe Button', () => {
        cy.visit ('/');
        cy.get('[data-cy=LocateMe]').should('contain', 'Use My Location');
    });
});