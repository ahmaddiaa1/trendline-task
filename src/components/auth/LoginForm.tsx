"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(form.email, form.password);
    setLoading(false);
    if (res.ok) {
      toast.success("Logged in");
      router.push("/dashboard");
    } else {
      toast.error(res.error || "Login failed");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className='w-full max-w-md space-y-4'>
      <h1 className='text-2xl font-semibold'>Sign in</h1>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          type='password'
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
      </div>
      <Button
        type='submit'
        disabled={loading}
        className='w-full'>
        {loading ? "Signing in..." : "Login"}
      </Button>
    </form>
  );
}
