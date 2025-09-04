"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormError } from "@/app/common/form-error.interface";
import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/app/util/errors";


export default async function login(_prevState: FormError, formData: FormData) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  await setAuthCookie(res);
  redirect("/");
}

//Reference Code - Weak Code
// async const setAuthCookie = (response: Response) => {
//   const setCookieHeader = response.headers.get("Set-Cookie");
//   if (setCookieHeader) {
//     const token = setCookieHeader.split(";")[0].split("=")[1];
//     cookies().set({
//       name: "Authentication",
//       value: token,
//       secure: true,
//       httpOnly: true,
//       expires: new Date(jwtDecode(token).exp! * 1000),
//     });
//   }
// };

async function setAuthCookie(response: Response) {
  const setCookieHeader = response.headers.get("set-cookie");
  if (!setCookieHeader) return;

  // Extract the "Authentication" cookie value from the Set-Cookie header
  const match = /(?:^|;|,)\s*Authentication=([^;,\s]+)/i.exec(setCookieHeader);
  const token = match?.[1];
  if (!token) return;

  const { exp } = jwtDecode<{ exp?: number }>(token);

  const store = await cookies();  // <-- await cookies()
  store.set("Authentication", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    ...(exp ? { expires: new Date(exp * 1000) } : {}),
  });
}