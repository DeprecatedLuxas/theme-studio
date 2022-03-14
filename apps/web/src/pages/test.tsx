import { getAgentString, userion } from "@theme-studio/core";
import { UserionDetections } from "@theme-studio/core/src/userion/userion-detections";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Test({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return <div>Hello, This is a test</div>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const agent = userion.parse(getAgentString(ctx.req), {
    detections: [UserionDetections.DEVICE],
    useMedia: false,
  });
  console.log(agent);

  return {
    props: {},
  };
}
