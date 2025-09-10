"use server";

import { post } from "../common/util/fetch";

export default async function createProduct(formData: FormData) {
  console.log("Form Data Received: POST : ",formData);  
  return post("products", formData);
}
