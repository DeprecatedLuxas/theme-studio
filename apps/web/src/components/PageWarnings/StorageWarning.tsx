import { useRouter } from "next/router";
import { Button } from "@theme-studio/ui";

export interface StorageWarningProps {
  clearStorage: Function;
}

export default function StorageWarning({
  clearStorage,
}: StorageWarningProps): JSX.Element {
  const router = useRouter();

  const handleFresh = () => {
    clearStorage();
    router.reload();
  };

  const handleContinue = () => {
    router.push("/edit/local");
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-700">
      <div className="max-w-lg w-full bg-white rounded min-h-56 p-4 flex flex-col">
        <h1 className="mb-4 text-4xl font-roboto">Oh wait..</h1>
        <p className="font-roboto">
          You already have a theme in your storage, do you want to continue
          editing that or do you want to start from a fresh?
        </p>
        <div className="flex-1 flex justify-between items-end w-4/5 mx-auto">
          <Button onClick={handleFresh} aria-label="Start from scratch">
            Start from scratch
          </Button>
          <Button onClick={handleContinue} aria-label="Continue">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
