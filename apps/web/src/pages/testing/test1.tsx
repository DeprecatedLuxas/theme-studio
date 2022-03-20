import { Button } from "@components/Forms";
import { WebbieStorage } from "@theme-studio/core";
import { useWebbie } from "@theme-studio/ui";

export default function Test1() {
  const {
    
  } = useWebbie<"GG">({
    type: WebbieStorage.LOCAL,
    name: "webbie-test",
  });

  return (
    <div className="w-full h-screen bg-gray-900 flex justify-between p-12">
      <div className="w-1/4 mr-4">
        <h1 className="text-white text-4xl">Test 1</h1>
        <p className="mt-4 text-white">Set, Get and Clear (Local Storage)</p>
        <div className="mt-8 flex flex-col">
          <Button className="my-4">Set</Button>
          <Button className="my-4">Get</Button>
          <Button className="my-4">Clear</Button>
        </div>
      </div>
      <div className="w-3/4 ml-4">
        <pre>
          <code className="text-white">
            {JSON.stringify(
              {
                type: WebbieStorage.INDEXED,
              },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
