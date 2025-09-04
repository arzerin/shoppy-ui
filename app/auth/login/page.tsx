"use client";

import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
//import { useFormState } from "react-dom";
import { useActionState } from "react";   // ⬅️ new hook
import { useSearchParams } from "next/navigation";
import login from "./login";

export default function Login() {

  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const [state, formAction] = useActionState(login, { error: "" });


  return (
    <div className="w-full max-w-xs">

      {success && (
        <div className="mb-4 rounded-lg p-3 text-sm font-medium bg-green-100 text-green-800 border border-green-300">
          ✅ User created successfully. Please log in.
        </div>
      )}
        <form action={formAction} className="w-full max-w-xs">
          <Stack spacing={2}>
            <TextField
              error={!!state.error}
              helperText={state.error}
              name="email"
              label="Email"
              variant="outlined"
              type="email"
            />
            <TextField
              error={!!state.error}
              helperText={state.error}
              name="password"
              label="Password"
              variant="outlined"
              type="password"
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
            <Link component={NextLink} href="/auth/signup" className="self-center">
              Signup
            </Link>
          </Stack>
      </form>
    </div>  
  );
}