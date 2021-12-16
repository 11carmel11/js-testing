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
  });

  it("should let a user add blog", function () {
    cy.blog(mock);

    cy.get(".notyf__toast--success");

    cy.contains("view more");
  });

  it("should let a user like blogs", function () {
    cy.blog(mock);
    cy.contains("view more").click();
    cy.contains("👍").click();
    cy.contains("likes: 1");
  });
});
