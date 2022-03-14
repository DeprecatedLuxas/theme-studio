import { tcx } from "../../src/tailwind";

test('should combine "bg-green-700" and "text-red-700"', () => {
  expect(tcx("bg-green-700", "text-red-700")).toBe("bg-green-700 text-red-700");
});
