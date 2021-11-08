import { useUser } from "@auth0/nextjs-auth0";
import Loading from "@components/Editor/Loading";
import { useRouter } from "next/router";

export default function EditLocal() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  if (user) router.push("/");

  return <div></div>;
}
