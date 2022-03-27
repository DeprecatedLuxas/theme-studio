import { ReactNode } from "react";
import { useConfiguration } from "../../hooks/use-configuration";
import { Divider } from "../divider";

export interface ConfigurationSidebarProps {
  children: ReactNode;
}

export function ConfigurationSidebar({ children }: ConfigurationSidebarProps) {
  const { sections } = useConfiguration();
  return (
    <div className="w-52 bg-white dark:bg-gray-700 p-2 flex flex-col h-full">
      <h1 className="text-2xl text-dark-700 dark:text-white mb-6">
        Theme Studio
      </h1>
      <div></div>
      <div className="flex-1">
        {sections.map((section) => (
          <div key={section.id} className="mb-4">
            <h2 className="text-2xl text-dark-700 dark:text-white mb-2">
              {section.title}
            </h2>
          </div>
        ))}
      </div>
      <Divider />
      {children}
    </div>
  );
}
