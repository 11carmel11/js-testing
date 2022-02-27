const mock = {
  username: "testUser",
  wrongUsername: "wrongUsername",
  password: "testPassword",
  wrongPassword: "wrongPassword",
  name: "test test",
  title: "test title",
  author: "test author",
  url: "test url",
  blog2: {
    title: "test title2",
    author: "test author2",
    url: "test url2",
  },
  blog3: {
    title: "test title3",
    author: "test author3",
    url: "test url3",
  },
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

  it("should sort blogs by likes", function () {
    cy.blog(mock.blog2);
    cy.blog(mock.blog3);
    cy.contains(`title: ${mock.blog2.title}`)
      .parent()
      .parent()
      .as("blog2")
      .contains("view more")
      .click()
      .parent()
      .contains("👍")
      .click();
    cy.contains("likes: 1");
    cy.get("@blog2").contains("👍").click();
    cy.contains("likes: 2");
    cy.get(".sc-bdvvtL.hEcUoY").then((list) => {
      cy.wrap(list[0]).contains("likes: 2");
    });
  });
});
