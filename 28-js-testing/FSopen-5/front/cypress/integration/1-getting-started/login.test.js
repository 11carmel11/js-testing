const mock = {
  username: "testUser",
  wrongUsername: "wrongUsername",
  password: "testPassword",
  wrongPassword: "wrongPassword",
  name: "test test",
};

describe("login", function () {
  beforeEach(() => {
    cy.request("PUT", "http://localhost:3003/api/reset");
    cy.request({
      url: "http://localhost:3003/api/users",
      method: "POST",
      body: mock,
    });

    cy.visit("http://localhost:3000");
  });

  it("should get to login-page by default", function () {
    cy.contains("login here");
  });

  describe("logging in", function () {
    it("should let a valid user log in", function () {
      cy.login(mock.username, mock.password);

      cy.contains("blogs:");
    });

    it("should not let an invalid user log in", function () {
      cy.login(mock.username, mock.wrongPassword);
      cy.get(".notyf__toast--error");
    });
  });
});
