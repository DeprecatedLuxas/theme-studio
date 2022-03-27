import { ReactNode } from "react";
import { useConfiguration } from "../../hooks/use-configuration";
import { Divider } from "../divider";

export interface ConfigurationSidebarProps {
  children: ReactNode;
}

export function ConfigurationSidebar({ children }: ConfigurationSidebarProps) {
  const { sections } = useConfiguration();
  return (
    <div className="w-72 bg-white dark:bg-gray-900 p-2 flex flex-col h-full">
      <h1 className="text-2xl text-dark-700 dark:text-white mb-3">
        Theme Studio
      </h1>
      <Divider className="my-3" />
      <div className="flex-1">
        {sections.map((section) => (
          <div key={section.id} className="mb-2">
            <h2 className="text-xl text-dark-700 dark:text-white">
              {section.title}
            </h2>
            <ul>
              {}
            </ul>
          </div>
        ))}
      </div>
      <Divider className="my-3" />
      {children}
    </div>
  );
}
