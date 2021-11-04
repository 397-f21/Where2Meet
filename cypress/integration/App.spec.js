
describe ('Test App', () => {
    it ('launches', () => {
        cy.visit ('/');
    });

    it ('opens with LocateMe Button', () => {
        cy.visit ('/');
        cy.get('[data-cy=LocateMe]').should('contain', 'Locate Me!');
    });

    it('shows Winter courses when Winter is selected', () => {
        cy.visit ('/');
        cy.get('[data-cy=LocateMe]').click();
        cy.wait(5000);
        cy.get('[data-cy=addressesList]').should('contain' ,'2240 Campus Dr, Evanston, IL 60201, USA');
    });
});