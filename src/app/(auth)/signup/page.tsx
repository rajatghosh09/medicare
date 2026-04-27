"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/zustand/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  role?: string;
  auth_id?: string
  
}

const registerSchema = yup.object({
  name: yup.string().required("Name is required!!"),
  email: yup.string().email("Invalid email formate").required(),
  password: yup.string().min(6, "must be 6").required()
})
const Register = () => {
  const router = useRouter();
  const {loading,registerUser}=useAuthStore()
  const [preview, setPreview] = useState("")
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("data", data);

    try {
      const response = await registerUser(data)
      console.log("this is the return from register page ",response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors && (
                  <p className="text-sm text-red-500">
                    {errors?.name?.message}
                  </p>
                )}
              </div>
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
            <Button type="submit" className="w-full">
              Regsiter
            </Button>
          </CardFooter>
        </form>
        {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/login")}
        >
          go to Login
        </Button>
      </Card>
    </div>
  )
}

export default Register