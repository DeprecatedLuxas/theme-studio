import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { useConfiguration } from "../../hooks";
import { ConfigurationRoot } from "./ConfigurationRoot";

export interface ConfiguratorProps {}

export function Configurator() {
  const { sections, getConfigurationsBySectionId } = useConfiguration();

  return (
    <div className="bg-white dark:bg-gray-700 flex-1 p-8 overflow-y-scroll scrollbar-hide">
      <Tab.Panels as={Fragment}>
        {sections.map((section, idx) => (
          <Tab.Panel key={idx} className="h-full">
            <ConfigurationRoot
              section={section}
              configurations={getConfigurationsBySectionId(section)}
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </div>
  );
}
