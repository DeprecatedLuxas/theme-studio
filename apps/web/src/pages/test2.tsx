import { userion } from "@theme-studio/core";
import { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    const agent = userion.parse(navigator.userAgent);
    console.log(agent);
  }, []);
  return <div>Hello, This is a test</div>;
}
