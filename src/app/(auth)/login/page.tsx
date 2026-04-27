"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from '@/zustand/useAuth';

type LoginFormValues = {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().email("Invalid email formate").required(),
  password: yup.string().min(6, "must be 6").required()
})

const login = () => {
  const router = useRouter();
  const { loading, loginUser, error } = useAuthStore()

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("data", data);
    try {
      const response = await loginUser(data)
      console.log("this is the return from login page ", response)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors && (
                  <p className="text-sm text-red-500">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="......."
                  {...register("password")}
                />
                {errors && (
                  <p className="text-sm text-red-500">
                    {errors?.password?.message}
                  </p>
                )}
              </div>

            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "loading...": "Login"}
            </Button>
          </CardFooter>
        </form>
        {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/signup")}
        >
          go to register
        </Button>
      </Card>
    </div>
  )
}

export default login