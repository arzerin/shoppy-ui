"use server";

import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "@/app/util/errors";
import { post } from "@/app/common/util/fetch";
import { redirect } from "next/navigation";
import { FormError } from "@/app/common/interfaces/form-error.interface";

export default async function createUser(_prevState: FormError, formData: FormData) {

  /*
  const { error } = await post("users", formData);
  if (error) {
    return { error };
  }
  redirect("/");
  */
  
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
  
  console.log('User Server Response:', parsedRes);//User Server Response: { email: 'zerin8@bdbooking.com', id: 20 }

  if (!res.ok) {
    console.log('Error Message:', parsedRes.message[0]);

    const msg = Array.isArray(parsedRes.message) ? parsedRes.message.join(', ') : parsedRes.message;
    return { error: msg || 'Signup failed' };

    return { error: getErrorMessage(parsedRes) };
  }
  //return { error: '' };
  if (parsedRes.id) {
    redirect("/auth/login?success=1&id="+parsedRes.id);
  } else{
    redirect("/auth/login?success=1");
  }
  
}