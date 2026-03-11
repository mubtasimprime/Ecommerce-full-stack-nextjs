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
import Link from "next/link";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";

const RegisterPage = () => {
  {
    const [loading, setLoading] = useState(false);

    const formSchema = zSchema
      .pick({ name: true, email: true, password: true })
      .extend({
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });

    const onRegisterSubmit = async (values) => {
      console.log(values);
    };

    return (
      <Card className="w-100">
        <CardContent>
          <div className="flex justify-center">
            <Image src={Logo} alt="Logo" className="max-w-[150px]" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-1">Create an Account</h1>
            <p>Create your account by filling out the form below</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onRegisterSubmit)}
              className="space-y-4 mt-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Mubtasim Fuad"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ButtonLoading
                type="submit"
                className="w-full cursor-pointer"
                text="Create an Account"
                loading={loading}
              ></ButtonLoading>
              <div className="text-center">
                <div className="flex justify-center gap-2">
                  <p>Already have an account?</p>
                  <Link href={WEBSITE_LOGIN} className="text-primary underline">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }
};

export default RegisterPage;
