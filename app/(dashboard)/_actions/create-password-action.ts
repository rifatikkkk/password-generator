import { cryptr } from "@/lib/crypto";
import prisma from "@/lib/prisma";
import { passwordSchema, PasswordSchemaType } from "@/schema/password.schema";

export const CreatePasswordAction = async (newPassword: PasswordSchemaType) => {
  const parseBody = passwordSchema.safeParse(newPassword);

  if (!parseBody.success) {
    throw new Error(
      `Validation failed: ${parseBody.error.issues
        .map((e) => e.message)
        .join(", ")}`
    );
  }

  const { password, ...restItems } = parseBody.data;

  const encryptedPassword = cryptr.encrypt(password);

  return await prisma.password.create({
    data: { ...restItems, encryptedPassword },
  });
};
