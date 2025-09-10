import { redirect } from "next/navigation";
import CreateProductFab from "./products/create-product-fab";
import getMe from "./get-me"; // adjust path

// export default async function Home() {
//   ///const me = await getMe();
//   console.log("at Home");
//   const me = await getMe();
//   //console.log(me);

//   return <></>;
// }

export default async function Home() {
  const me = await getMe(); // should return null/undefined if not logged in
  if (!me) redirect("/auth/login"); // this throws to navigate (no await)

  return (
    <>
      <pre>{JSON.stringify(me, null, 2)}</pre>
      <CreateProductFab />
    </>
  );
}

