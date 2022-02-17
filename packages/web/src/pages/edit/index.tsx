import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function EditIndex({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return (
    <div className="w-full h-screen flex items-center justify-center dark:bg-gray-800">
      <div className="w-1/2 h-96 bg-gray-800 dark:bg-white">
        
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {},
  };
}
