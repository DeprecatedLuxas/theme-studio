import { isBrowser } from "@theme-studio/core";

export default function NotSupportedPage() {
  return (
    <div>
      <h1>Device is not supported</h1>
      <p>{JSON.stringify(isBrowser())}</p>
    </div>
  )
}