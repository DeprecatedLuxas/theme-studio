import windy from "@helpers/windy";

const BannerNotice = windy.div`
  border
  border-red-600
  bg-red-300
  text-red-800
  rounded
  p-4
  text-center
  mb-4
`;

// TODO: Complete this.

export default function PersonalizationTab() {
  return (
    <div className="flex flex-col">
      <h1 className="font-roboto mb-4 text-3xl font-semibold">
        Personalization
      </h1>
      <BannerNotice>Currently not implemented.</BannerNotice>

      <p>NOTE: Until this is fully implemented. Default values are used.</p>

      <pre>
        <code>
          {`
{
  "sidebar": "left"
}
`}
        </code>
      </pre>
    </div>
  );
}
