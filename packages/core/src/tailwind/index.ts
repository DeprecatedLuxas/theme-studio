// TODO: Refactor this, and make a tailwind classnames gen and filter duplicates out
// eg: "bg-green-700 bg-red-700" -> "bg-green-700"
export const tcx = (...classNames: any[]): string =>
  classNames.filter(Boolean).join(" ");
