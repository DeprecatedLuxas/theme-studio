import { useUser } from "@auth0/nextjs-auth0";

export default function Configure() {
  const { user, isLoading } = useUser();


  return (
    <div>

      
    </div>
  )
}