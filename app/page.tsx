import Image from "next/image";
import getMe from "./get-me";
import { redirect } from "next/navigation";

// export default async function Home() {
//   ///const me = await getMe();
//   console.log("at Home");
//   const me = await getMe();
//   //console.log(me);

//   return <></>;
// }

export default async function Home() {
  const me = await getMe();
  console.log(me);

  if (!me) redirect("/auth/login"); // or render a logged-out UI
  return <pre>{JSON.stringify(me, null, 2)}</pre>;

  return <></>;
}