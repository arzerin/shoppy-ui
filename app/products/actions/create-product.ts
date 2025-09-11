"use server";

import { revalidateTag } from "next/cache";
import { post } from "@/app/common/util/fetch";

export default async function createProduct(formData: FormData) {
  console.log("Form Data Received: POST : ",formData);  
  // return post("products", formData);
  const response = await post("products", formData);
  revalidateTag("products");
  return response;
}
