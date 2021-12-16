// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (username, password) => {
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.contains("login!").click();
});

Cypress.Commands.add("init", (body) => {
  cy.request("PUT", "http://localhost:3003/api/reset");
  cy.request({
    url: "http://localhost:3003/api/users",
    method: "POST",
    body,
  });

  cy.visit("http://localhost:3000");
});

Cypress.Commands.add("blog", (body) => {
  cy.contains("want to add blog?").click();

  cy.get("#title").type(body.title);
  cy.get("#author").type(body.author);
  cy.get("#url").type(body.url);

  cy.get("#create-btn").click();
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
