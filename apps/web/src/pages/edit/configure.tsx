import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import {
  Configuration,
  Configurator,
  ConfigurationSidebar,
  Icon,
  Tab,
  useConfiguration,
  VscFeedbackIcon,
} from "@theme-studio/ui";

export default function Configure() {
  const { user, isLoading } = useUser();

  return (
    <Configuration>
      <Tab.Group as="div" className="w-full h-screen flex">
        <ConfigurationSidebar
          onDone={() => {
            console.log("Hey");
          }}
        >
          <Link
            href="https://github.com/DeprecatedLuxas/theme-studio/issues"
            passHref
          >
            <a
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center bg-blue-700 h-full rounded p-3 text-white"
              title="Feedback"
            >
              <Icon icon={VscFeedbackIcon} />
            </a>
          </Link>
        </ConfigurationSidebar>
        <Configurator />
      </Tab.Group>
    </Configuration>
  );
}
