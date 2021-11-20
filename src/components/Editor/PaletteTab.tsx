import Accordion from "@components/Accordion";
import useRegistry from "@hooks/useRegistry";
import { uniqueId } from "lodash";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import Variable from "./Variable";

export default function PaletteTab() {
  const { palette } = useRegistry();
  useEffect(() => {
    console.log(palette);
  }, []);
  return (
    <div>
      {Object.keys(palette!)
        .sort((a, b) => a.localeCompare(b))
        .map((key: string) => (
          <Accordion key={uuid()} text={key}>
            {Object.keys(palette![key]).map((k) => (
              <Variable key={uuid()} name={k} value={palette![key][k]}/>
            ))}
          </Accordion>
        ))}
      {/* <Accordion text={k} key={uuid()}>
        {Object.keys(state.variables![key as VariableTab][k]).map(
          (kk: string) => (
            <Variable
              key={uuid()}
              name={kk}
              value={state.variables![key as VariableTab][k][kk]}
            />
          )
        )}
      </Accordion> */}
    </div>
  );
}
