// "use client";

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useAuthStore } from '@/zustand/useAuth';
// import { yupResolver } from '@hookform/resolvers/yup';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import * as yup from "yup";

// type RegisterFormValues = {
//   name: string;
//   email: string;
//   password: string;
//   role?: string;
//   auth_id?: string
  
// }

// const registerSchema = yup.object({
//   name: yup.string().required("Name is required!!"),
//   email: yup.string().email("Invalid email format").required(),
//   password: yup.string().min(6, "Must be at least 6 characters").required(),
//   role: yup.string().oneOf(["doctor", "patient"], "Please select a role").required("Role is required")
// });

// const Register = () => {
//   const router = useRouter();
//   const {loading,registerUser}=useAuthStore()
//   const [preview, setPreview] = useState("")
//   const {
//     register,
//     reset,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormValues>({
//     resolver: yupResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
      
//     },
//   });

//   const onSubmit = async (data: RegisterFormValues) => {
//     console.log("data", data);

//     try {
//       const response = await registerUser(data)
//       console.log("this is the return from register page ",response)
//     } catch (error) {
//       console.log(error)
//     }
//   }


//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <Card className="w-full max-w-sm">
//         <CardHeader>
//           <CardTitle>Create your account</CardTitle>
//         </CardHeader>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <CardContent>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Name</Label>
//                 <Input
//                   id="name"
//                   type="text"
//                   placeholder="Enter your name"
//                   {...register("name")}
//                 />
//                 {errors && (
//                   <p className="text-sm text-red-500">
//                     {errors?.name?.message}
//                   </p>
//                 )}
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   {...register("email")}
//                 />
//                 {errors && (
//                   <p className="text-sm text-red-500">
//                     {errors?.email?.message}
//                   </p>
//                 )}
//               </div>
             
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="......."
//                   {...register("password")}
//                 />
//                 {errors && (
//                   <p className="text-sm text-red-500">
//                     {errors?.password?.message}
//                   </p>
//                 )}
//               </div>

//             </div>
//           </CardContent>
//           <CardFooter className="flex-col gap-2">
//             <Button type="submit" className="w-full">
//               Regsiter
//             </Button>
//           </CardFooter>
//         </form>
//         {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
//         <Button
//           variant="outline"
//           className="w-full"
//           onClick={() => router.push("/login")}
//         >
//           go to Login
//         </Button>
//       </Card>
//     </div>
//   )
// }

// export default Register



"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/zustand/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const registerSchema = yup.object({
  name: yup.string().required("Name is required!!"),
  email: yup.string().email("Invalid email format").required(),
  password: yup.string().min(6, "Must be 6 characters").required(),
  role: yup.string().required("Please select a role")
});

const Register = () => {
  const router = useRouter();
  const { loading, registerUser } = useAuthStore();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: ""
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await registerUser(data);
      if (response.success) {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" {...register("name")} />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={(val: string) => setValue("role", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Are you a Doctor or Patient?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push("/login")}
            >
              Go to Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Register;