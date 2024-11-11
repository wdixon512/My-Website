import { Room, RoomResponse } from '@lib/models/dm-helper/Room';

// export const getElementByTestId = (testId: string) => {
//   return cy.get(`[data-testid="${testId}"]`, timeout)
// }

export const addGoblin = () => {
  cy.get('[data-testid="combat-panel"]').click();
  cy.get('[data-testid="mob-name-input"]').type('Goblin');
  cy.get('[data-testid="mob-health-input"]').type('30');
  cy.get('[data-testid="mob-initiative-input"]').type('15');
  cy.get('[data-testid="submit-mob-button"]').click();
};

export const addGoblinAndVerify = () => {
  addGoblin();
  cy.get('[data-testid="entity-list"]').should('contain', 'Goblin');
};

export const addKobold = () => {
  cy.get('[data-testid="combat-panel"]').click();
  cy.get('[data-testid="mob-name-input"]').type('Kobold');
  cy.get('[data-testid="mob-health-input"]').type('20');
  cy.get('[data-testid="mob-initiative-input"]').type('10');
  cy.get('[data-testid="submit-mob-button"]').click();
};

export const addKoboldAndVerify = () => {
  addKobold();
  cy.get('[data-testid="entity-list"]').should('contain', 'Kobold');
};

export const addOrc = () => {
  cy.get('[data-testid="combat-panel"]').click();
  cy.get('[data-testid="mob-name-input"]').type('Orc');
  cy.get('[data-testid="mob-health-input"]').type('50');
  cy.get('[data-testid="mob-initiative-input"]').type('10');
  cy.get('[data-testid="submit-mob-button"]').click();
};

export const addOrcAndVerify = () => {
  addOrc();
  cy.get('[data-testid="entity-list"]').should('contain', 'Orc');
};

export const quickAddById = (mobId: string) => {
  cy.get(`[data-testid="${mobId}-quickadd-btn"]`).click();
};

export const removeQuickAddByIdAndVerify = (mobId: string) => {
  cy.get(`[data-testid="${mobId}-quickadd-remove-btn"]`).click();

  // Verify the mob is removed from the UI
  cy.get(`[data-testid="${mobId}-quickadd-btn"]`).should('not.exist');
};

export const addHero = (name: string) => {
  cy.get('[data-testid="heroes-panel"]').click();
  cy.get('[data-testid="hero-name-input"]').type(name);
  cy.get('[data-testid="add-hero-btn"]').click();
};

export const addHeroAndVerify = (name: string) => {
  addHero(name);
  cy.get('[data-testid="hero-list"]').should('contain', name);
};

export const updateHeroAndVerify = (heroId: string, initiative: number) => {
  cy.get(`[data-testid="${heroId}-edit"]`).click();

  // wait for modal to open
  cy.wait(1000);

  cy.get('[data-testid="initiative-edit-modal-input"]').clear().type(initiative.toString());
  cy.get('[data-testid="done-edit-modal-btn"]').click();

  // Verify the hero initiative in the UI
  cy.get(`[data-testid="${heroId}-item"]`).should('exist');
  cy.get(`[data-testid="${heroId}-initiative"]`).should('contain', initiative.toString());
};

export const removeHeroAndVerify = (heroId: string) => {
  cy.get(`[data-testid="heroes-panel"]`).click();
  cy.get(`[data-testid="${heroId}-remove"]`).click();

  // Verify the hero is removed from the UI
  cy.get(`[data-testid="${heroId}-item"]`).should('not.exist');
};

export const updateMobAndVerify = (
  mobId: string,
  newMobId: string,
  mobName: string,
  health: number,
  initiative: number
) => {
  cy.get(`[data-testid="${mobId}-edit"]`).click();

  // wait for modal to open
  cy.wait(1000);

  cy.get('[data-testid="name-edit-modal-input"]').clear().type(mobName);
  cy.get('[data-testid="health-edit-modal-input"]').clear().type(health.toString());
  cy.get('[data-testid="initiative-edit-modal-input"]').clear().type(initiative.toString());
  cy.get('[data-testid="done-edit-modal-btn"]').click();

  // Verify the mob in the UI
  cy.get(`[data-testid="${newMobId}-item"]`).should('exist');
  cy.get(`[data-testid="${newMobId}-initiative"]`).should('contain', initiative.toString());
  cy.get(`[data-testid="${newMobId}-name"]`).should('contain', mobName);
  cy.get(`[data-testid="${newMobId}-health"]`).should('have.value', health.toString());
};

export const killMobAndVerify = (mobId: string) => {
  cy.get(`[data-testid="${mobId}-kill"]`).click();

  // Verify the mob is removed from the UI
  cy.get(`[data-testid="${mobId}-item"]`).should('not.exist');
};

export const updateMobHealthInlineAndVerify = (mobId: string, health: number) => {
  cy.get(`[data-testid="${mobId}-health"]`).clear().type(health.toString());
  cy.get(`[data-testid="${mobId}-health"]`).should('have.value', health.toString());
};

export const createRoom = () => {
  cy.get('[data-testid="invite-others-panel"]').click();
  cy.get('[data-testid="create-room-button"]').click();

  // Wait for the room to be created/retrieved from the database
  cy.wait(2000);
};

export const startCombat = () => {
  cy.get('[data-testid="combat-panel"]').click();
  cy.get('[data-testid="start-combat-button"]').click();
};

export const endCombat = (confirm: boolean = true) => {
  cy.get('[data-testid="end-combat-btn"]').click();
  if (confirm) {
    cy.get('[data-testid="end-combat-yes-btn"]').click();
  } else {
    cy.get('[data-testid="end-combat-no-btn"]').click();
  }
};

export const verifyDbRoom = (verificationCallback: (room: Room) => void) => {
  cy.callRtdb('get', 'rooms').then((response: RoomResponse) => {
    const rooms = Object.values(response) as Room[];
    console.log('rooms: ', rooms);
    const myRoom = rooms.find((room) => {
      return room.ownerUID === Cypress.env('TEST_UID');
    });

    // Execute the verification callback with the myRoom as parameter
    if (myRoom) {
      verificationCallback(myRoom);
    } else {
      throw new Error('Room not found for the given owner UID.');
    }
  });
};

export const deleteRooms = () => {
  cy.callRtdb('get', 'rooms').then((response: RoomResponse) => {
    if (!response) {
      return;
    }

    const rooms = Object.values(response) as Room[];
    const myRooms = rooms.filter((room) => {
      return room.ownerUID === Cypress.env('TEST_UID');
    });

    if (myRooms) {
      myRooms.map((myRoom) => {
        cy.callRtdb('delete', `rooms/${myRoom.id}`);
      });
    }
  });
};

export const signIn = () => {
  cy.get('[data-testid="sign-in-btn"]').click();
  cy.wait(1000);
};

export const signOut = () => {
  cy.get('[data-testid="sign-out-btn"]').click();
  cy.wait(1000);
};
