"use server";

import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/app/util/errors";
import { redirect } from "next/navigation";

export default async function createUser(_prevState: any, formData: FormData) {
  
  console.log('Form Data', formData);  
  
  console.log(`FORM Action URL: ${API_URL}/users`);

  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);

  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    //body: formData,
    body: JSON.stringify({ email, password }),
  });
  
  const parsedRes = await res.json();
  
  console.log('Response:', parsedRes);

  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  redirect("/");
}