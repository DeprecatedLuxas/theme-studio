import { userion } from "@theme-studio/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Test2({
  userio,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>
    {JSON.stringify(userio)}
  </div>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const userio = userion.parse(ctx.req.headers["user-agent"]);
  return {
    props: {
      userio,
    },
  };
}
