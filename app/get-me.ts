"use server";

import { get } from "./common/util/fetch";
import { cookies } from "next/headers";
import {API_URL} from './common/constants/api';

// export default async function getMe1() {
  
//     console.log("getMe");

//     const me = await fetch(`${API_URL}/users/me`, {
//       headers: { Cookie: (await cookies()).toString() },
//     });

//     const data = await me.json();     
//     console.log("ME JSON Response:", data);
    
//     if (!me.ok) {
//         return { error: "could not parse" };
//     }
//     return { error: "" };
    
// // }
export default async function getMe() {
  return get("users/me");
}

// export default async function getMeX(): Promise<any | null> {
//   const store = await cookies();
//   const token = store.get("Authentication")?.value;

//   // Not logged in
//   if (!token) return null;

//   const res = await fetch(`${API_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,        // <- forward auth to Nest
//       // OR: Cookie: `Authentication=${token}`
//     },
//     cache: "no-store",                          // avoid stale SSR cache
//   });

//   if (res.status === 401) return null;          // unauthorized -> no user
//   if (!res.ok) {
//     const errText = await res.text().catch(() => "");
//     throw new Error(`GET /users/me failed ${res.status} ${res.statusText} ${errText}`);
//   }

//   // Safely handle empty or non-JSON bodies
//   const ct = res.headers.get("content-type") || "";
//   const raw = await res.text();                 // read once
//   if (!raw) return null;                        // empty body

//   try {
//     // even if content-type is wrong, try to parse
//     return JSON.parse(raw);
//   } catch {
//     throw new Error(`Expected JSON, got "${ct}": ${raw.slice(0, 200)}`);
//   }
// }
