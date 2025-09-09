"use client";

import { Badge } from "@/components/ui/badge";
import { PasswordConfig } from "@/lib/password";
import React from "react";

interface Props {
  passwordConfig: PasswordConfig;
}

const PasswordOptionsTags = ({ passwordConfig }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {[
        {
          condition: passwordConfig.hasLowercase,
          label: "Lowercase letters",
        },
        {
          condition: passwordConfig.hasUppercase,
          label: "Uppercase letters",
        },
        {
          condition: passwordConfig.hasNumbers,
          label: "Numbers",
        },
        {
          condition: passwordConfig.hasSymbols,
          label: "Symbols",
        },
      ]
        .filter((item) => item.condition)
        .map((item, index) => (
          <Badge key={index}>{item.label}</Badge>
        ))}
    </div>
  );
};

export default PasswordOptionsTags;
