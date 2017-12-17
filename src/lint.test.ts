import { lint } from "./lint";

describe("Lint", () => {
  test("Lint", () => {
    expect(lint({ text: 'var foo = "bar"' })).toMatchSnapshot();
  });
});
