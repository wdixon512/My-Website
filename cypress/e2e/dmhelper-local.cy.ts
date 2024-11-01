import { Hero } from './../../lib/models/dm-helper/Hero';
import { Room } from './../../lib/models/dm-helper/Room';
import { Entity, EntityType } from './../../lib/models/dm-helper/Entity';
import { CombatState } from './../../lib/models/dm-helper/Combat';

describe('DMHelper E2E Tests', () => {
  beforeEach(() => {
    // Login to firebase without needing to do all of the modal workkflow crap, then visit the page
    cy.login();
    cy.visit('/dm-helper');

    // Set `cypressTesting` in localStorage to true so we can bypass the auth modal
    cy.window().then((win) => {
      win.localStorage.setItem('cypressTesting', 'true');
    });

    // Wait for the page and data to load
    cy.wait(2000);
  });

  after(() => {
    // Wait to delete so the last step of each test can run
    cy.wait(2000);

    cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
      const myRoom = rooms.find((room) => {
        return room.ownerUID === Cypress.env('TEST_UID');
      });

      if (!myRoom) {
        return;
      }

      cy.callFirestore('delete', `rooms/${myRoom.id}`);
    });
  });

  it('should create a room, add a mob, and verify it in the database', () => {
    cy.get('[data-testid="invite-others-panel"]').click();
    cy.get('[data-testid="create-room-button"]').click();

    // Wait for the room to be created/retrieved from the database
    cy.wait(2000);

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

  it('should add a hero and verify it in the database', () => {
    // Interact with the UI to add a hero
    cy.get('[data-testid="heroes-panel"]').click();
    cy.get('[data-testid="hero-name-input"]').type('Warrior');
    cy.get('[data-testid="add-hero-btn"]').click();

    // Verify the hero is added in the UI
    cy.get('[data-testid="hero-list"]').should('contain', 'Warrior');

    // Wait for the hero to be added to the database
    cy.wait(2000);

    cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
      const myRoom = rooms.find((room) => {
        return room.ownerUID === Cypress.env('TEST_UID');
      });

      expect(myRoom).to.exist;
      expect(myRoom.combat.entities).to.exist;
      expect(myRoom.heroes).to.satisfy((heroes: Hero[]) => {
        return heroes.some((hero) => hero.name === 'Warrior');
      });
    });
  });

  it('should start combat, enter initiative and verify the combat state in the database', () => {
    // Start combat
    cy.get('[data-testid="combat-panel"]').click();
    cy.get('[data-testid="start-combat-button"]').click();

    cy.wait(1000);

    cy.get('[data-testid="initiative-input"]').type('21{enter}');

    // Wait for the combat state to be updated in the database
    cy.wait(2000);

    cy.get('[data-testid="entity-list"]').should('contain', 'Warrior').should('contain', 'Goblin');

    cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
      const myRoom = rooms.find((room) => {
        return room.ownerUID === Cypress.env('TEST_UID');
      });

      expect(myRoom).to.exist;
      expect(myRoom.combat.combatState).to.equal(CombatState.IN_PROGRESS);
      expect(myRoom.combat.entities).to.satisfy((entities: Entity[]) => {
        return (
          entities.some(
            (entity) => entity.initiative === 21 && entity.id === 'Warrior_1' && entity.type === EntityType.HERO
          ) &&
          entities.some(
            (entity) => entity.initiative === 15 && entity.id === 'Goblin_1' && entity.type === EntityType.MOB
          )
        );
      });
    });
  });

  it('should update a mob entirely and verify it in the database', () => {
    // Interact with the UI to update the mob
    cy.get('[data-testid="goblin_1_edit"]').click();

    cy.get('[data-testid="name-edit-modal-input"]').clear().type('Orc');
    cy.get('[data-testid="health-edit-modal-input"]').clear().type('50');
    cy.get('[data-testid="initiative-edit-modal-input"]').clear().type('10');
    cy.get('[data-testid="done-edit-modal-btn"]').click();

    // Wait for the mob to be updated in the database
    cy.wait(2000);

    cy.get('[data-testid="entity-list"]').should('contain', 'Orc');

    cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
      const myRoom = rooms.find((room) => {
        return room.ownerUID === Cypress.env('TEST_UID');
      });

      expect(myRoom).to.exist;
      expect(myRoom.combat.entities).to.exist;
      expect(myRoom.combat.entities).to.satisfy((entities: Entity[]) => {
        return entities.some((entity) => {
          return entity.name === 'Orc' && entity.health === 50 && entity.initiative === 10;
        });
      });
    });
  });

  it('should update a hero initiative and verify it in the database', () => {
    // Interact with the UI to update the hero initiative
    cy.get('[data-testid="warrior_1_edit"]').click();

    cy.get('[data-testid="initiative-edit-modal-input"]').clear().type('25');
    cy.get('[data-testid="done-edit-modal-btn"]').click();

    // Wait for the hero initiative to be updated in the database
    cy.wait(2000);

    cy.get('[data-testid="entity-list"]').should('contain', 'Warrior');

    cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
      const myRoom = rooms.find((room) => {
        return room.ownerUID === Cypress.env('TEST_UID');
      });

      expect(myRoom).to.exist;
      expect(myRoom.combat.entities).to.exist;
      expect(myRoom.combat.entities).to.satisfy((entities: Entity[]) => {
        return entities.some((entity) => {
          return entity.name === 'Warrior' && entity.initiative === 25;
        });
      });
    });
  });

  it('should add quick add mobs and verify them in the database', () => {
    // Add Orc to Mobs + Favorites
    cy.get('[data-testid="mob-name-input"]').type('Orc');
    cy.get('[data-testid="mob-health-input"]').type('50');
    cy.get('[data-testid="mob-initiative-input"]').type('10');
    cy.get('[data-testid="submit-mob-button"]').click();

    // Verify the mobs are added in the UI
    cy.get('[data-testid="entity-list"]').should('contain', 'Orc');

    // Add 3 Goblins and 2 Orcs
    cy.pause();
    cy.get('[data-testid="goblin_1-quickadd-btn"]').click();
    cy.get('[data-testid="goblin_1-quickadd-btn"]').click();
    cy.get('[data-testid="goblin_1-quickadd-btn"]').click();
    cy.get('[data-testid="orc_2-quickadd-btn"]').click();
    cy.get('[data-testid="orc_2-quickadd-btn"]').click();

    // Verify UI of multiple entities
    cy.get('[data-testid="entity-list"]').within(() => {
      cy.get('[data-testid="entity-item"]').should('have.length', 6);
      cy.get('[data-testid="entity-item"]').should('contain', 'Goblin').should('have.length', 3);
      cy.get('[data-testid="entity-item"]').should('contain', 'Orc').should('have.length', 3);
    });

    // Wait for the mobs to be added to the database
    cy.wait(2000);

    cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
      const myRoom = rooms.find((room) => {
        return room.ownerUID === Cypress.env('TEST_UID');
      });

      expect(myRoom).to.exist;
      expect(myRoom.combat.entities).to.exist;
      expect(myRoom.combat.entities).to.satisfy((entities: Entity[]) => {
        return (
          entities.some((entity) => entity.name === 'Goblin' && entity.health === 30 && entity.initiative === 15) &&
          entities.some((entity) => entity.name === 'Orc' && entity.health === 50 && entity.initiative === 10)
        );
      });
    });
  });

  it('should end combat and verify the combat state in the database', () => {
    // End combat
    cy.get('[data-testid="end-combat-btn"]').click();
    cy.get('[data-testid="end-combat-no-btn"]').click();

    cy.get('[data-testid="end-combat-btn"]').click();
    cy.get('[data-testid="end-combat-yes-btn"]').click();

    // Wait for the combat state to be updated in the database
    cy.wait(2000);

    cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
      const myRoom = rooms.find((room) => {
        return room.ownerUID === Cypress.env('TEST_UID');
      });

      expect(myRoom).to.exist;
      expect(myRoom.combat.combatState).to.equal(CombatState.NOT_IN_PROGRESS);
    });
  });

  it('should remove a hero and verify it is removed from the database', () => {
    // Interact with the UI to remove the hero
    cy.get('[data-testid="heroes-panel"]').click();
    cy.get('[data-testid="warrior_1_remove"]').click();

    // Wait for the hero to be removed from the database
    cy.wait(2000);

    cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
      const myRoom = rooms.find((room) => {
        return room.ownerUID === Cypress.env('TEST_UID');
      });

      expect(myRoom).to.exist;
      expect(myRoom.heroes).to.exist;
      expect(myRoom.heroes).to.satisfy((heroes: Hero[]) => heroes.length === 0);
    });
  });

  it('should remove a mob and verify it is removed from the database', () => {
    cy.get('[data-testid="goblin_1_kill"]').click();

    // Wait for the mob to be removed from the database
    cy.wait(2000);

    cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
      const myRoom = rooms.find((room) => {
        return room.ownerUID === Cypress.env('TEST_UID');
      });

      expect(myRoom).to.exist;
      expect(myRoom.combat.entities).to.exist;
      expect(myRoom.combat.entities).to.satisfy((entities: Entity[]) => entities.length === 0);
    });
  });
});
