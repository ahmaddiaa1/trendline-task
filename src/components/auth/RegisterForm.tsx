"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link } from "lucide-react";

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    // name: "",
    // email: "",
    // password: "",
    // password_confirmation: "",
    // mobile: "",
    // mobile_country_code: "971",

    name: "Test Account",
    email: "testaccount24@gmail.com",
    mobile: "0501111113",
    mobile_country_code: "971",
    password: "123456789##AAa",
    password_confirmation: "123456789##AAa",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await register(form);
    setLoading(false);
    if (res.ok) {
      toast.success("Registered. Please verify your account.");
      router.push("/verify");
    } else {
      toast.error(res.error || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className='w-full max-w-md space-y-4'>
      <h1 className='text-2xl font-semibold'>Create an account</h1>
      <div className='space-y-2'>
        <Label htmlFor='name'>Full Name</Label>
        <Input
          id='name'
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>
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
      <div className='space-y-2'>
        <Label htmlFor='password_confirmation'>Confirm Password</Label>
        <Input
          id='password_confirmation'
          type='password'
          value={form.password_confirmation}
          onChange={(e) =>
            setForm({ ...form, password_confirmation: e.target.value })
          }
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='mobile_country_code'>Country Code</Label>
        <Input
          id='mobile_country_code'
          value={form.mobile_country_code}
          onChange={(e) =>
            setForm({ ...form, mobile_country_code: e.target.value })
          }
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='mobile'>Phone Number</Label>
        <Input
          id='mobile'
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          required
        />
      </div>
      <Button
        type='submit'
        disabled={loading}
        className='w-full'>
        {loading ? "Creating..." : "Register"}
      </Button>
      <Link href={"/login"}>register</Link>
    </form>
  );
}
