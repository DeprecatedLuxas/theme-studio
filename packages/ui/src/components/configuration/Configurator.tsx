import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { useConfiguration } from "../../hooks";
import { ConfigurationRoot } from "./ConfigurationRoot";

export interface ConfiguratorProps {}

export function Configurator() {
  const { configurations, sections, getConfigurationsBySectionId } =
    useConfiguration();

  return (
    <div className="bg-white dark:bg-gray-700 flex-1 p-8">
      <Tab.Panels as={Fragment}>
        {sections.map((section, idx) => (
          <Tab.Panel key={idx} className="h-full">
            <ConfigurationRoot
              section={section}
              configurations={getConfigurationsBySectionId(section.id)}
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </div>
  );
}
