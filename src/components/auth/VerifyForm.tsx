"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

export function VerifyForm() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiRequest("/auth/verify-email", {
      method: "POST",
      requireAuth: true,
      formData: { code },
    });
    setLoading(false);
    if (res.status) {
      toast.success("Account verified");
      router.push("/dashboard");
    } else {
      toast.error(res.message || "Verification failed");
    }
  };

  const resend = async () => {
    setResending(true);
    const res = await apiRequest("/auth/verify-email/resend-code", {
      method: "POST",
      requireAuth: true,
    });
    setResending(false);
    if (res.status) toast.success("Code resent");
    else toast.error(res.message || "Failed to resend code");
  };

  return (
    <form
      onSubmit={onSubmit}
      className='w-full max-w-md space-y-4'>
      <h1 className='text-2xl font-semibold'>Verify your account</h1>
      <p className='text-sm text-muted-foreground'></p>
      <div className='space-y-2'>
        <Label htmlFor='code'>Verification Code</Label>
        <Input
          id='code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
      <div className='flex gap-2'>
        <Button
          type='submit'
          disabled={loading}
          className='w-full'>
          {loading ? "Verifying..." : "Verify"}
        </Button>
        <Button
          type='button'
          variant='secondary'
          onClick={resend}
          disabled={resending}>
          {resending ? "Resending..." : "Resend"}
        </Button>
      </div>
    </form>
  );
}
