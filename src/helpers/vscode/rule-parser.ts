import { ChangedVariables, ConditionalClassName, Rule } from "@lib/types";

export default class RuleParser {
  static parse(
    changedVariables: ChangedVariables,
    rule: ConditionalClassName
  ): Rule {
    const changedVarKeys: string[] = Object.keys(changedVariables);

    let classes = "";
    Object.keys(rule)
      .filter((key: string) => changedVarKeys.includes(key))
      .forEach((key: string) => {
        const ruleObj = rule[key as keyof ConditionalClassName];
        console.log(ruleObj);
        if (!ruleObj) throw new Error("Rule is undefined, please report this.");
        if (ruleObj!.when === "NOT_NULL") {
          if (changedVariables[key] !== null) {
            classes += ruleObj!.then;
          }
        }
      });
    // Object.keys(rule).forEach((key: string) => {
    //   console.log(key);
    //   if (!changedVarKeys.includes(key)) return "";

    // });
    return classes;
  }
}
