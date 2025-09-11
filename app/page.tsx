import { redirect } from "next/navigation";
import CreateProductFab from "./products/create-product/create-product-fab";
import getMe from "./get-me"; // adjust path
//import Products from "./products/products";
import getProducts from "./products/actions/get-products";
import Products from "./products/products";

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
  const products = await getProducts();
  console.log(products);

  // return (
  //   <>
  //     <pre>{JSON.stringify(me, null, 2)}</pre>
  //      <Products />
  //     <CreateProductFab />
  //   </>
  // );

  return (
    <>
       <Products />
      <CreateProductFab />
    </>
  );
}

