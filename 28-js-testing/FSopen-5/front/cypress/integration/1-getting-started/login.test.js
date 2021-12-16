describe("basic e2e", () => {
  beforeEach(() => {
    cy.request("PUT", "http://localhost:3003/api/reset");
    cy.visit("http://localhost:3000");
  });

  it("should get to login-page by default", () => {
    cy.contains("login here");
  });
});
