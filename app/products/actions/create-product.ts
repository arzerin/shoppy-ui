"use server";

import { revalidateTag } from "next/cache";
import { getHeaders, post } from "@/app/common/util/fetch";

import { API_URL } from "@/app/common/constants/api";

export default async function createProduct(formData: FormData) {
  // console.log("Form Data Received: POST : ",formData);  
  // // return post("products", formData);
  // const response = await post("products", formData);
  // revalidateTag("products");
  // return response;
  const response = await post("products", formData);
  console.log("Post Function Response: ",response);  
  const productImage = formData.get("image");
  if (productImage instanceof File && !response.error) {
    console.log("Product Image Response: ",response);  
    await uploadProductImage(response.data.id, productImage);
  }
  revalidateTag("products");
  return response;
}

async function uploadProductImage(productId: number, file: File) {
  const formData = new FormData();
  formData.append("image", file);
  await fetch(`${API_URL}/products/${productId}/image`, {
    body: formData,
    method: "POST",
    headers: await getHeaders(),
  });
}
