import { Entity } from '@lib/models/dm-helper/Entity';
import { Room } from '@lib/models/dm-helper/Room';

describe('DMHelper E2E Tests', () => {
  beforeEach(() => {
    // Login to firebase without needing to do all of the modal workkflow crap, then visit the page
    cy.login();
    cy.visit('/dm-helper');

    // Set `cypressTesting` in localStorage to true so we can bypass the auth modal
    cy.window().then((win) => {
      win.localStorage.setItem('cypressTesting', 'true');
    });
  });

  it('should add a mob and verify it in the database', () => {
    // Wait for the room to be retrieved from the database
    cy.wait(2000);

    // let cypressUserHasRoom = false;
    // cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
    //   cypressUserHasRoom = rooms.some((room) => {
    //     return room.ownerUID === Cypress.env('TEST_UID');
    //   });
    // })

    // if (!cypressUserHasRoom) {
    cy.get('[data-testid="invite-others-panel"]').click();
    cy.get('[data-testid="create-room-button"]').click();

    // Wait for the room to be created/retrieved from the database
    cy.wait(2000);
    // }

    cy.get('[data-testid="combat-panel"]').click();

    // Add a mob
    cy.get('[data-testid="mob-name-input"]').type('Goblin');
    cy.get('[data-testid="mob-health-input"]').type('30');
    cy.get('[data-testid="mob-initiative-input"]').type('15');
    cy.get('[data-testid="submit-mob-button"]').click();

    // Verify the mob is added in the UI
    cy.get('[data-testid="entity-list"]').should('contain', 'Goblin');

    // Wait for the mob to be added to the database
    cy.wait(2000);

    cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
      const testUID = Cypress.env('TEST_UID');
      const myRoom = rooms.find((room) => {
        return room.ownerUID === Cypress.env('TEST_UID');
      });

      expect(myRoom).to.exist;
      expect(myRoom.combat.entities).to.exist;
      expect(myRoom.combat.entities).to.satisfy((entities: Entity[]) =>
        entities.some((entity) => {
          return entity.name === 'Goblin' && entity.health === 30 && entity.initiative === 15;
        })
      );
    });
  });

  // it('should add a hero and verify it in the database', () => {
  //   // Interact with the UI to add a hero
  //   cy.get('[data-testid="hero-name-input"]').type('Warrior');
  //   cy.get('[data-testid="hero-health-input"]').type('100');
  //   cy.get('[data-testid="hero-initiative-input"]').type('10');
  //   cy.get('[data-testid="submit-hero-button"]').click();

  //   // Verify the hero is added in the UI
  //   cy.get('[data-testid="hero-list"]').should('contain', 'Warrior');

  //   // Verify the hero is added in the database
  //   cy.task('getRoomFromFirebase', 'Warrior').then((room: Room) => {
  //     // expect(hero).to.exist;
  //     // expect(hero.name).to.equal('Warrior');
  //     // expect(hero.health).to.equal(100);
  //     // expect(hero.initiative).to.equal(10);
  //   });
  // });
});
