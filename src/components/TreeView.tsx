type FileIcons = "json" | "ts" | "tsx" | "css" | "svg";

interface TreeNodeProps {
  name: string;
  type: FileIcons;
}

export interface TreeViewProps {}

function TreeView() {
  return <div></div>;
}

interface TreeFileProps extends TreeNodeProps {}

const TreeFile = () => {
  return <div></div>;
};

interface TreeFolderProps extends Omit<TreeNodeProps, "type"> {
  
}


const TreeFolder = () => {
  return <div></div>;
};

TreeView.Folder = TreeFolder;
TreeView.File = TreeFile;

export default TreeView;
