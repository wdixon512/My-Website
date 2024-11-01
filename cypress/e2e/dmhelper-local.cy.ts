import { Hero } from './../../lib/models/dm-helper/Hero';
import { Room } from './../../lib/models/dm-helper/Room';
import { Mob } from './../../lib/models/dm-helper/Mob';
import { Entity, EntityType } from './../../lib/models/dm-helper/Entity';
import { CombatState } from './../../lib/models/dm-helper/Combat';

describe('DMHelper E2E Tests', () => {
  beforeEach(() => {
    // Login and visit the page once before all tests
    cy.login();
    cy.visit('/dm-helper');
    cy.window().then((win) => {
      win.localStorage.setItem('cypressTesting', 'true');
    });
    cy.wait(2000); // Wait for initial load
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

  describe('Room and Entity Management', () => {
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
            return (
              entity.id === 'goblin-1' && entity.name === 'Goblin' && entity.health === 30 && entity.initiative === 15
            );
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
        expect(myRoom.heroes).to.satisfy((heroes: Hero[]) => {
          return heroes.some((hero) => hero.id === 'warrior-1' && hero.name === 'Warrior');
        });
      });
    });
  });

  describe('Combat Management', () => {
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
              (entity) => entity.initiative === 21 && entity.id === 'warrior-1' && entity.type === EntityType.HERO
            ) &&
            entities.some(
              (entity) => entity.initiative === 15 && entity.id === 'goblin-1' && entity.type === EntityType.MOB
            )
          );
        });
      });
    });

    it('should update a mob entirely and verify it in the database', () => {
      // Interact with the UI to update the mob
      cy.get('[data-testid="goblin-1-edit"]').click();

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
            return entity.id === 'orc-1' && entity.name === 'Orc' && entity.health === 50 && entity.initiative === 10;
          });
        });
      });

      // Test inline health editor
      cy.get('[data-testid="orc-1-health"]').clear().type('25');

      // Wait for the mob to be updated in the database
      cy.wait(2000);

      cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
        const myRoom = rooms.find((room) => {
          return room.ownerUID === Cypress.env('TEST_UID');
        });

        expect(myRoom).to.exist;
        expect(myRoom.combat.entities).to.exist;
        expect(myRoom.combat.entities).to.satisfy((entities: Entity[]) => {
          return entities.some((entity) => {
            return entity.id === 'orc-1' && entity.health === 25;
          });
        });
      });

      cy.get('[data-testid="orc-1-health"]').clear().type('50');
    });

    it('should update a hero initiative and verify it in the database', () => {
      // Interact with the UI to update the hero initiative
      cy.get('[data-testid="warrior-1-edit"]').click();

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
      cy.get('[data-testid="goblin-1-quickadd-btn"]').click();
      cy.get('[data-testid="goblin-1-quickadd-btn"]').click();
      cy.get('[data-testid="goblin-1-quickadd-btn"]').click();
      cy.get('[data-testid="orc-2-quickadd-btn"]').click();

      // Verify UI of multiple entities
      cy.get('[data-testid="entity-list"]').within(() => {
        cy.get('[data-testid="entity-item"]').should('have.length', 7);
        cy.get('[data-testid="entity-item"]').filter(':contains("Goblin")').should('have.length', 3);
        cy.get('[data-testid="entity-item"]').filter(':contains("Orc")').should('have.length', 3);
        cy.get('[data-testid="entity-item"]').filter(':contains("Warrior")').should('have.length', 1);
      });

      // Wait for the mobs to be added to the database
      cy.wait(2000);

      cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
        // Find the room owned by the test user
        const myRoom = rooms.find((room) => room.ownerUID === Cypress.env('TEST_UID'));

        // Assert that the room and combat entities exist
        expect(myRoom).to.exist;
        expect(myRoom.combat.entities).to.exist;

        // Define expected entities for clarity
        const expectedEntities = [
          { name: 'Goblin', health: 30, initiative: 15, count: 3 },
          { name: 'Orc', health: 50, initiative: 10, count: 3 },
        ];

        // Validate each expected entity in the database
        expectedEntities.forEach(({ name, health, initiative, count }) => {
          const matchingEntities = myRoom.combat.entities.filter(
            (entity) => entity.name === name && entity.health === health && entity.initiative === initiative
          );
          expect(matchingEntities.length).to.equal(count);
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
  });

  describe('Removal', () => {
    it('should remove a hero and verify it is removed from the database', () => {
      // Interact with the UI to remove the hero
      cy.get('[data-testid="heroes-panel"]').click();
      cy.get('[data-testid="warrior-1_remove"]').click();

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
      cy.get('[data-testid="goblin-1-kill"]').click();

      // Wait for the mob to be removed from the database
      cy.wait(2000);

      cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
        const myRoom = rooms.find((room) => {
          return room.ownerUID === Cypress.env('TEST_UID');
        });

        expect(myRoom).to.exist;
        expect(myRoom.combat.entities).to.exist;
        expect(myRoom.combat.entities).to.satisfy((entities: Entity[]) => entities.length === 5);
      });
    });

    it('should remove a quickadded mob and verify it is removed from the database', () => {
      cy.get('[data-testid="goblin-1-quickadd-remove-btn"]').click();

      // Wait for the mob to be removed from the database
      cy.wait(2000);

      cy.callFirestore('get', 'rooms').then((rooms: Room[]) => {
        const myRoom = rooms.find((room) => {
          return room.ownerUID === Cypress.env('TEST_UID');
        });

        expect(myRoom).to.exist;
        expect(myRoom.mobFavorites).to.exist;
        expect(myRoom.mobFavorites).to.satisfy(
          (favorites: Mob[]) => favorites.length === 1 && !favorites.some((m) => m.id === 'goblin-1')
        );
      });
    });
  });
});
