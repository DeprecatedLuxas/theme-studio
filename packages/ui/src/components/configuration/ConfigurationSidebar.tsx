import { ReactNode } from "react";
import { useConfiguration } from "../../hooks/use-configuration";
import { Divider } from "../divider";
import { clsx } from "@theme-studio/core";
import { ConfigurationNode } from "./ConfigurationNode";

export interface ConfigurationSidebarProps {
  children: ReactNode;
}

export function ConfigurationSidebar({ children }: ConfigurationSidebarProps) {
  const { sections, configurations } = useConfiguration();
  return (
    <div className="w-72 bg-white dark:bg-gray-900 p-2 flex flex-col h-full">
      <h1 className="text-2xl text-dark-700 dark:text-white mb-3">
        Theme Studio
      </h1>
      <Divider className="my-3" />
      <div className="flex-1">
        {sections.map((section) => (
          <button
            key={section.id}
            className={clsx(
              "mb-2 bg-blue-800 rounded py-1 px-2 block w-full text-left"
            )}
          >
            <h2 className="text-lg text-dark-700 dark:text-white">
              {section.title}
            </h2>
          </button>
        ))}
      </div>
      <ConfigurationNode node={configurations[0]} />
      <Divider className="my-3" />
      {children}
    </div>
  );
}
