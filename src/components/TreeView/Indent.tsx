export interface IndentProps {
  level: number;
}

export default function TreeIndent({ level }: IndentProps) {
  if (level === 0) return null;
  return (
    <>
      {[...Array(level)].map((_, i) => (
        <span
          key={`treeindent-${i}`}
          className={`indent treeindent-${i > 6 ? 6 : i}`}
        />
      ))}
    </>
  );
}
