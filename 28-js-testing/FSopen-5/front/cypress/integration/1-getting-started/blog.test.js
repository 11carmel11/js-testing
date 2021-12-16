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

describe("blog tests", function () {
  beforeEach(() => {
    cy.init(mock);
    cy.login(mock.username, mock.password);
  });
  it("should let a valid user add blog", function () {
    cy.contains("want to add blog?").click();

    cy.get("#title").type(mock.title);
    cy.get("#author").type(mock.author);
    cy.get("#url").type(mock.url);

    cy.get("#create-btn").click();

    cy.get(".notyf__toast--success");

    cy.contains("view more");
  });
});
