"use client";

import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
//import { useFormState } from "react-dom"; //No more usable in new version
import createUser from "./create-user";
import { useActionState } from "react";   // ⬅️ new hook


export default function Signup() {
  const [state, formAction] = useActionState(createUser, { error: "" });

  return (
    <div className="w-full max-w-xs">
      
      {state.error && (
        <div className="mb-4 rounded-lg p-3 text-sm font-medium bg-red-100 text-red-800 border border-red-300">
          {state.error}
        </div>
      )}
       
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          helperText={state.error}
          error={!!state.error}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          helperText={state.error}
          error={!!state.error}
        />
        <Button type="submit" variant="contained">
          Signup
        </Button>
        <Link component={NextLink} href="/auth/login" className="self-center">
          Login
        </Link>
      </Stack>
    </form>
    </div>
  );
}