import { ReactNode } from "react";
import { useConfiguration } from "../../hooks/use-configuration";

export interface ConfigurationSidebarProps {
  children: ReactNode;
}

export function ConfigurationSidebar({ children }: ConfigurationSidebarProps) {
  const { sections } = useConfiguration();
  return (
    <div>
      <ul>
        {sections.map(({ title }, idx) => (
          <li key={idx}>{title}</li>
        ))}
      </ul>
      {children}
    </div>
  );
}
