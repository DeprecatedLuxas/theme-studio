import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import {
  Configuration,
  ConfigurationSidebar,
  Icon,
  Tab,
  VscFeedbackIcon,
} from "@theme-studio/ui";

export default function Configure() {
  const { user, isLoading } = useUser();

  return (
    <Configuration>
      <Tab.Group as="div" className="w-full h-screen flex">
        <ConfigurationSidebar>
          <Link
            href="https://github.com/DeprecatedLuxas/theme-studio/issues"
            passHref
          >
            <a
              target="_blank"
              rel="noopener"
              className="flex items-center bg-blue-700 rounded w-full px-2 py-1 text-white font-roboto"
            >
              <Icon icon={VscFeedbackIcon} className="mr-3" />
              Feedback
            </a>
          </Link>
        </ConfigurationSidebar>
        <div className="bg-white dark:bg-gray-700 flex-1 p-8">
          <Tab.Panels>
            <Tab.Panel>
              <p>Tab #1 content</p>
            </Tab.Panel>
            <Tab.Panel>
              <p>Tab #2 content</p>
            </Tab.Panel>
            <Tab.Panel>
              <p>Tab #3 content</p>
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </Configuration>
  );
}
