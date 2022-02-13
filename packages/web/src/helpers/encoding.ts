export function encode(input: string) {
  return Buffer.from(input).toString("base64");
}

export function decode(input: string) {
  return Buffer.from(input, "base64").toString("utf-8");
}
