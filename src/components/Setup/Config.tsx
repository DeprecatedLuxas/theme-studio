import { SetupConfig } from "@lib/types";

type ConfigProps = {
  conf: SetupConfig;
};

export default function Config({ conf }: ConfigProps) {
  const jsonConf = JSON.stringify(conf, null, 2);
  return (
    <div className="w-52 ml-4 bg-green-700 rounded">
      <pre className="whitespace-pre-wrap">{jsonConf}</pre>
    </div>
  );
}
