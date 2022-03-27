import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import {
  Configuration,
  ConfigurationSidebar,
  Icon,
  VscFeedbackIcon,
} from "@theme-studio/ui";

export default function Configure() {
  const { user, isLoading } = useUser();

  return (
    <Configuration>
      <div className="w-full h-screen flex">
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
        <div className="bg-gray-700 flex-1 p-8">bgg</div>
      </div>
    </Configuration>
  );
}
