const mock = {
  username: "testUser",
  wrongUsername: "wrongUsername",
  password: "testPassword",
  wrongPassword: "wrongPassword",
  name: "test test",
  title: "test title",
  author: "test author",
  url: "test url",
};

describe("blogs", function () {
  beforeEach(() => {
    cy.init(mock);
    cy.login(mock.username, mock.password);
    cy.blog(mock);
  });

  it("should let a user add blog", function () {
    cy.get(".notyf__toast--success");

    cy.contains("view more");
  });

  it("should let a user like blogs", function () {
    cy.contains("view more").click();
    cy.contains("👍").click();
    cy.contains("likes: 1");
  });

  it("should let a user delete it own blogs", function () {
    cy.contains("view more").click();
    cy.contains("remove").click();
    cy.get(".notyf__toast--success");
  });
});
