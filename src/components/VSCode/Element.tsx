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
import { HTMLAttributes, useEffect, useRef } from "react";

export interface ElementProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: keyof JSX.IntrinsicElements;
  conditionalClassName?: ConditionalClassName;
  bind?: Arrayable<Variables>;
}

export default function Element({
  as = "div",
  bind,
  className = "",
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

  let classes = useRef<string>(className);


  useEffect(() => {
    if (!conditionalClassName) return;
    if (!prevVariables) return;
    if (!variables) return;

    const changedVariables = getPropertyDifferences(prevVariables, variables);
    console.log(changedVariables);

    const extraClasses = RuleParser.parse(
      changedVariables,
      conditionalClassName
    );
    console.log(extraClasses);
    classes.current = `${classes.current} ${extraClasses}`;

  }, [variables, conditionalClassName, prevVariables]);

  return <Component className={classes.current} {...rest} {...binding} />;
}
