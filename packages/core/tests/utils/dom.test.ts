import { isBrowser } from "../../src/utils";

test("should return if the window object is found or not", () => {
  expect(isBrowser()).toBe(false);
});
