
describe ('Test App', () => {
    it ('launches', () => {
        cy.visit ('/');
    });

    it ('opens with LocateMe Button', () => {
        cy.visit ('/');
        cy.get('[data-cy=LocateMe]').should('contain', 'Use My Location');
    });

    it('shows Winter courses when Winter is selected', () => {
        cy.visit ('/');
        cy.get('[data-cy=LocateMe]').click();
        cy.wait(5000);
        cy.get('[data-cy=addressesList]').should('contain' ,'Person');
    });
});