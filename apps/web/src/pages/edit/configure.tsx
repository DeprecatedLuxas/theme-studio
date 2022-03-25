import { useUser } from "@auth0/nextjs-auth0";
import { configurationRegistry } from "@theme-studio/core";

export default function Configure() {
  const { user, isLoading } = useUser();

  return <div></div>;
}
