import { ConditionalClassName, Rule } from "@lib/types";


export default class RuleParser {

  static parse(rule: ConditionalClassName): Rule {
    // console.log(rule);

    Object.keys(rule).forEach((key: string) => {
      // console.log(key);
      
    });
    return "";
  }
}
