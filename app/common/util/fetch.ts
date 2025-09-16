import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";

// const getHeaders = () => ({


// export const getHeaders = () => ({
//   Cookie: cookies().toString(),
// });

export const getHeaders = async (): Promise<HeadersInit> => ({
  Cookie: (await cookies()).toString(),
});

async function getAuthHeaders(): Promise<HeadersInit> {
  const cookieStore = await cookies();

  // Build Cookie header (so your API can read cookies if it wants)
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join("; ");

  // Also set Authorization from the auth cookie if you use header-based JWT
  const token = cookieStore.get("Authentication")?.value;

  const headers: Record<string, string> = {};
  if (cookieHeader) headers["Cookie"] = cookieHeader;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  return headers;
}

// export const post = async (path: string, formData: FormData) => {
//   const res = await fetch(`${API_URL}/${path}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       ...(await getAuthHeaders()), // <-- await here
//     },
//     body: JSON.stringify(Object.fromEntries(formData)),
//     cache: "no-store",
//   });
//   const parsedRes = await res.json();

//   console.log(`${API_URL}/${path} -> JSON Response: `, parsedRes);

//   if (!res.ok) {
//     return { error: getErrorMessage(parsedRes) };
//   }
//   return { error: "", data: parsedRes };
// };

export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await getAuthHeaders()), // <-- await here
    },
    body: JSON.stringify(body),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "", data: parsedRes };
};


// export const get = async (path: string) => {
//   const res = await fetch(`${API_URL}/${path}`, {
//     headers: { ...(await getAuthHeaders()) }, // <-- await here
//     cache: "no-store",
//   });
//   console.log(`GET ${API_URL}/${path} -> JSON Response:`, res);
//   return res.json();
// };

// export const get = async <T>(path: string, tags?: string[]) => {
//   const res = await fetch(`${API_URL}/${path}`, {
//     headers: { ...(await getAuthHeaders()) }, // <-- await here
//      next: { tags },
//     cache: "no-store",
//   });
//   console.log(`GET ${API_URL}/${path} -> JSON Response:`, res);
//   return res.json() as T;
// };

export const get = async <T>(
  path: string,
  tags?: string[],
  params?: URLSearchParams
) => {
  const url = params ? `${API_URL}/${path}?` + params : `${API_URL}/${path}`;
  const res = await fetch(url, {
    headers: { ...(await getAuthHeaders()) },
    next: { tags },
    cache: "no-store",
  });
  return res.json() as T;
};