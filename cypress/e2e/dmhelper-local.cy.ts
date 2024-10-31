import { Hero } from '@lib/models/dm-helper/Hero';
import { Mob } from '@lib/models/dm-helper/Mob';
import { Room } from '@lib/models/dm-helper/Room';

// cypress/integration/dmhelper.spec.js
describe('DMHelper E2E Tests', () => {
  beforeEach(() => {
    // Visit the application
    cy.visit('http://localhost:3000/dm-helper');
  });

  it('should add a mob and verify it in the database', () => {
    // Interact with the UI to add a mob
    cy.get('[data-testid="mob-name-input"]').type('Goblin');
    cy.get('[data-testid="mob-health-input"]').type('30');
    cy.get('[data-testid="mob-initiative-input"]').type('15');
    cy.get('[data-testid="submit-mob-button"]').click();

    // Verify the mob is added in the UI
    cy.get('[data-testid="entity-list"]').should('contain', 'Goblin');
    cy.get('[data-testid="invite-others-panel"]').click();
    // cy.pause();
    // cy.get('[data-testid="create-room-button"]').click();

    cy.callFirestore('add', 'test_hello_world', { some: 'value' });
    // Verify the mob is added in the database
    // cy.task('getRoomFromFirebase').then((room: Room) => {
    // expect(mob).to.exist;
    // expect(mob.name).to.equal('Goblin');
    // expect(mob.health).to.equal(30);
    // expect(mob.initiative).to.equal(15);
    // });
  });

  it('should add a hero and verify it in the database', () => {
    // Interact with the UI to add a hero
    cy.get('[data-testid="hero-name-input"]').type('Warrior');
    cy.get('[data-testid="hero-health-input"]').type('100');
    cy.get('[data-testid="hero-initiative-input"]').type('10');
    cy.get('[data-testid="submit-hero-button"]').click();

    // Verify the hero is added in the UI
    cy.get('[data-testid="hero-list"]').should('contain', 'Warrior');

    // Verify the hero is added in the database
    cy.task('getRoomFromFirebase', 'Warrior').then((room: Room) => {
      // expect(hero).to.exist;
      // expect(hero.name).to.equal('Warrior');
      // expect(hero.health).to.equal(100);
      // expect(hero.initiative).to.equal(10);
    });
  });
});
