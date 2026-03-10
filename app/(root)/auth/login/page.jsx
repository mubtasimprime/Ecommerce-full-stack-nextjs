"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Logo from "@/public/assets/images/logo-black.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/Applications/ButtonLoading";
import z from "zod";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema.pick({ email: true }).extend({
    password: z.string().min(3, "Password must be at least 6 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Card className="w-100">
      <CardContent>
        <div className="flex justify-center">
          <Image src={Logo} alt="Logo" className="max-w-[150px]" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login into Account</h1>
          <p>Login into your account by filling out the form below</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className={`relative`}>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={isTypePassword ? "password" : "text"}
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <button
                    onClick={() => setIsTypePassword(!isTypePassword)}
                    className="absolute top-[55%] right-2 cursor-pointer"
                    type="button"
                  >
                    {isTypePassword ? (
                      <FaRegEyeSlash></FaRegEyeSlash>
                    ) : (
                      <IoEyeOutline></IoEyeOutline>
                    )}
                  </button>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ButtonLoading
              type="submit"
              className="w-full cursor-pointer"
              text="Login"
              loading={loading}
            >
              Login
            </ButtonLoading>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
