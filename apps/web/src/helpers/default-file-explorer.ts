import { TreeNode } from "@theme-studio/core";

export const defaultFileExplorer: TreeNode[] = [
  {
    type: "folder",
    label: "node_modules",
    icon: "node_modules",
  },
  {
    type: "folder",
    label: "public",
    collapsed: false,
    children: [
      {
        type: "file",
        label: "favicon.ico",
        icon: "ico",
      },
    ],
    icon: "public",
  },
  {
    type: "folder",
    label: "src",
    collapsed: false,
    children: [
      {
        type: "folder",
        label: "components",
        collapsed: false,
        children: [
          {
            type: "file",
            label: "Header.tsx",
            icon: "tsx",
          },
          {
            type: "file",
            label: "Footer.tsx",
            icon: "tsx",
          },
        ],
        icon: "components",
      },
      {
        type: "folder",
        label: "pages",
        collapsed: false,
        children: [
          {
            type: "folder",
            label: "api",
            collapsed: false,
            children: [
              {
                type: "file",
                label: "[id].ts",
                icon: "ts",
              },
            ],
            icon: "api",
          },
          {
            type: "file",
            label: "_app.tsx",
            icon: "tsx",
          },
          {
            type: "file",
            label: "browse.tsx",
            icon: "tsx",
          },
          {
            type: "file",
            label: "index.tsx",
            icon: "tsx",
          },
        ],
        icon: "pages",
      },
    ],
    icon: "src",
  },
  {
    type: "file",
    label: "next.config.js",
    icon: "js",
  },
  {
    type: "file",
    label: "package.json",
    icon: "json",
  },
  {
    type: "file",
    label: "tsconfig.json",
    icon: "json",
  },
  {
    type: "file",
    label: "yarn.lock",
    icon: "lock",
  },
];
