"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generatePassword, PasswordConfig } from "@/lib/password";
import {
  ArrowUp01,
  CaseLower,
  CaseUpper,
  CopyIcon,
  Hash,
  ShieldCheck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const options = [
  {
    key: "hasUppercase",
    label: "Uppercase letters (A-Z)",
    icon: <CaseUpper />,
  },
  {
    key: "hasLowercase",
    label: "Lowercase letters (a-z)",
    icon: <CaseLower />,
  },
  {
    key: "hasNumbers",
    label: "Numbers (0-9)",
    icon: <ArrowUp01 />,
  },
  {
    key: "hasSymbols",
    label: "Symbols (!@#$)",
    icon: <Hash />,
  },
] as const;

const FormCreatePassword = () => {
  const [password, setPassword] = useState("");

  const form = useForm<PasswordConfig>({
    defaultValues: {
      length: 8,
      hasLowercase: true,
      hasUppercase: true,
      hasNumbers: true,
      hasSymbols: true,
    },
  });

  useEffect(() => {
    const generated = generatePassword({
      hasLowercase: true,
      hasNumbers: true,
      hasSymbols: true,
      hasUppercase: true,
      length: 10,
    });
    setPassword(generated);
  }, []);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast.success("Password copied to clipboard");
    });
  };

  const handleGenerate = () => {
    const values = form.getValues();
    const newPassword = generatePassword(values);
    setPassword(newPassword);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-700">Password Generator</h1>
        <p className="text-gray-600">Create secure and personal passwords</p>
      </header>

      <Card className="bg-gradient-to-r from-gray-900 to-gray-800">
        <CardContent className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-400 mb-1">
              Your generated password:
            </p>
            <p className="text-xl font-mono break-all text-green-400 leading-relaxed">
              {password}
            </p>
          </div>
          <Button
            onClick={handleCopyPassword}
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            <CopyIcon />
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Configuration
          </h2>

          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleGenerate)}
            >
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Password length
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="text-center text-lg font-semibold h-12"
                        min={4}
                        max={128}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">
                  Include characters
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {options.map(({ key, label, icon }) => (
                    <FormField
                      key={key}
                      control={form.control}
                      name={key}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <span className="text-xl">{icon}</span>
                            <div>
                              <p>{label}</p>
                            </div>
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 pt-4">
                <Button type="submit" className="cursor-pointer">
                  <ShieldCheck />
                  Generate new password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormCreatePassword;
