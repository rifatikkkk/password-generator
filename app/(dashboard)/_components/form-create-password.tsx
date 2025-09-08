"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generatePassword } from "@/lib/password";
import { CopyIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const FormCreatePassword = () => {
  const [password, setPassword] = useState("");

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
    </div>
  );
};

export default FormCreatePassword;
