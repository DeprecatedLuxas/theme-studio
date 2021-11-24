import useBinding from "@hooks/use-binding";
import { usePrevious } from "@hooks/use-previous";
import useRegistry from "@hooks/use-registry";
import {
  Arrayable,
  ChangedVariables,
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
    
    let extraClasses = "";
    const changedVariables: ChangedVariables = getPropertyDifferences(
      prevVariables,
      variables
    );
    const changedVarKeys: string[] = Object.keys(changedVariables);

    Object.keys(conditionalClassName)
      .filter((key: string) => changedVarKeys.includes(key))
      .forEach((key: string) => {
        const ruleObj = conditionalClassName[key as keyof ConditionalClassName];
        if (!ruleObj) throw new Error("Rule is undefined, please report this.");
        if (ruleObj!.when === "NOT_NULL") {
          if (changedVariables[key] === null) return;
          extraClasses += ruleObj!.then;
        }
      });

    classes.current = `${classes.current}${
      extraClasses !== "" ? ` ${extraClasses}` : ""
    }`;
  }, [variables, conditionalClassName, prevVariables]);

  return <Component className={classes.current} {...rest} {...binding} />;
}
