import { Fragment, ReactNode } from "react";
import { useConfiguration } from "../../hooks/use-configuration";
import { Divider } from "../divider";
import { clsx } from "@theme-studio/core";
import { Tab } from "../";

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
      <Divider space="my-3" color="bg-gray-700" />
      <div className="flex-1">
        <Tab.List>
          {sections.map((section) => (
            <Tab as={Fragment} key={section.id}>
              {({ selected }) => (
                <button
                  className={clsx(
                    "mb-2 rounded py-1 px-2 block w-full text-left hover:bg-blue-700",
                    {
                      "bg-blue-700": selected,
                    }
                  )}
                >
                  <h2 className="text-lg text-dark-700 dark:text-white">
                    {section.title}
                  </h2>
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>
      <Divider space="my-3" color="bg-gray-700" />
      {children}
    </div>
  );
}
