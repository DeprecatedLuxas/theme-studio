import { userion } from "@theme-studio/core";
import { useEffect } from "react";

export default function Test() {
  const agent = userion.parse("navigator.userAgent");
  return <div>{JSON.stringify(agent)}</div>;
}
