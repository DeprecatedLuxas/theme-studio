import { useUser } from "@auth0/nextjs-auth0";
import { configurationRegistry } from "@theme-studio/core";
import { Configuration, ConfigurationSidebar } from "@theme-studio/ui";

export default function Configure() {
  const { user, isLoading } = useUser();

  return (
    <div>
      <Configuration>
        <ConfigurationSidebar />
      </Configuration>
    </div>
  );
}
