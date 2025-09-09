"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordSchema,
  type PasswordSchemaType,
} from "@/schema/password.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordConfig } from "@/lib/password";
import PasswordOptionsTags from "./password-options-tags";

interface Props {
  password: string;
  passwordConfig: PasswordConfig;
}

const FormSavePassword = ({ password, passwordConfig }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<PasswordSchemaType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      title: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.setValue("password", password);
      form.setValue("length", passwordConfig.length);
      form.setValue("hasLowercase", passwordConfig.hasLowercase);
      form.setValue("hasUppercase", passwordConfig.hasUppercase);
      form.setValue("hasNumbers", passwordConfig.hasNumbers);
      form.setValue("hasSymbols", passwordConfig.hasSymbols);
    }
  }, [isOpen, password, passwordConfig, form]);

  function onSubmit(values: PasswordSchemaType) {
    console.log(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <SaveIcon />
          Save password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <SaveIcon />
            Save password
          </DialogTitle>
          <DialogDescription>
            Store your generated password securely with all its settings
          </DialogDescription>
        </DialogHeader>
        <section className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g.: Google, Gmail, Facebook..."
                        {...field}
                        className="h-12"
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
                    <FormLabel>Password title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 bg-gray-100 font-mono text-gray-800"
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-3">
                  Applied configuration
                </h3>
                <div className="space-y-4 text-sm">
                  <p>
                    <span className="font-bold">Length: </span>
                    {passwordConfig.length} characters
                  </p>
                  <PasswordOptionsTags passwordConfig={passwordConfig} />
                </div>
              </div>
            </form>
          </Form>
        </section>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Save password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormSavePassword;
