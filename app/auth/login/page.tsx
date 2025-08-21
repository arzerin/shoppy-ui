"use client";

import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";

export default function Login() {

  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  return (
    <div className="w-full max-w-xs">

      {success && (
        <div className="mb-4 rounded-lg p-3 text-sm font-medium bg-green-100 text-green-800 border border-green-300">
          ✅ User created successfully. Please log in.
        </div>
      )}

      <Stack spacing={2} className="w-full max-w-xs">
        <TextField label="Email" variant="outlined" type="email" />
        <TextField label="Password" variant="outlined" type="password" />
        <Button variant="contained">Login</Button>
        <Link component={NextLink} href="/auth/signup" className="self-center">
          Signup
        </Link>
      </Stack>
    </div>  
  );
}