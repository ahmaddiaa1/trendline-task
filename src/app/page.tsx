import { cookies } from "next/headers";
import Providers from "./providers";
import { redirect } from "next/navigation";
const GetToken = async () => {
  "use server";
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;
  return token;
};

export default async function Home() {
  const token = await GetToken();
  return (
    <Providers>
      {token && token !== "" ? redirect("/dashboard") : redirect("/login")}
    </Providers>
  );
}
