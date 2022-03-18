import { userion } from "../../src/userion";

test("iPhone", () => {
  expect(
    userion.parse(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53"
    )
  ).toEqual({
    agent: expect.any(String),
    device: "mobile",
  });
});

test("iPhone 11 Pro Max", () => {
  expect(
    userion.parse(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBDV/iPhone12,5;FBMD/iPhone;FBSN/iOS;FBSV/13.3.1;FBSS/3;FBID/phone;FBLC/en_US;FBOP/5;FBCR/]"
    )
  ).toEqual({
    agent: expect.any(String),
    device: "mobile",
  });
});

test("Samsung Galaxy Z Flip", () => {
  expect(
    userion.parse(
      "Mozilla/5.0 (Linux; Android 10; SM-F700N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.136 Mobile Safari/537.36"
    )
  ).toEqual({
    agent: expect.any(String),
    device: "mobile",
  });
});
