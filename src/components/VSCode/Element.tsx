import EditorHelper from "@helpers/editor";
import RuleParser from "@helpers/vscode/rule-parser";
import useBinding from "@hooks/use-binding";
import { usePrevious } from "@hooks/use-previous";
import useRegistry from "@hooks/use-registry";
import {
  Arrayable,
  CompiledVariables,
  ConditionalClassName,
  Variables,
} from "@lib/types";
import { getPropertyDifferences } from "@lib/utils";
import _ from "lodash";
import { HTMLAttributes, useEffect } from "react";

export interface ElementProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: keyof JSX.IntrinsicElements;
  conditionalClassName?: ConditionalClassName;
  bind?: Arrayable<Variables>;
}

export default function Element({
  as = "div",
  bind,
  className,
  conditionalClassName,
  ...rest
}: ElementProps) {
  const Component = as as keyof JSX.IntrinsicElements;
  const { variables } = useRegistry();
  const prevVariables = usePrevious<CompiledVariables | undefined>(variables);
  const binding = useBinding({
    bind,
    variables,
  });

  let classes = className;

  // let parsedRule;
  // if (conditionalClassName) parsedRule = RuleParser.parse(conditionalClassName);

  useEffect(() => {
    if (!conditionalClassName) return;
    if (!prevVariables) return;
    if (!variables) return;
    // console.log("HELLO=");

    const changedVariables = getPropertyDifferences(prevVariables, variables);
    console.log(changedVariables);

    const extraClasses = RuleParser.parse(conditionalClassName);
    // console.log(extraClasses);
  }, [variables, conditionalClassName, prevVariables]);

  /**
   * conditionalClassName={{
   *  "brc@activityBar.border": {
   *    "when": "NOT_NULL",
   *    "then": "border-r-2",
   *  }
   * }}
   *
   *
   */
  return <Component className={classes} {...rest} {...binding} />;
}
