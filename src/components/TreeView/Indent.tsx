export interface IndentProps {
  level: number;
}

export default function TreeIndent({ level }: IndentProps) {
  return (
    <>
      {[...Array(level)].map((_, i) => (
        <span
          key={`treeindent-${i}`}
          className={`treeindent-${i > 6 ? 6 : i}`}
        />
      ))}
    </>
  );
}
