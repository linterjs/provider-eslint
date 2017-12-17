const exit = jest.spyOn(process, "exit");

describe("Register linter adapter", () => {
  test("Success", () => {
    expect(() => {
      require("./index");
    }).not.toThrow();
    jest.resetModules();
  });

  // TODO: Test error
});
