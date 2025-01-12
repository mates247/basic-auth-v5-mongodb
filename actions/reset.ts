"use server";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/helpers/user";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFiled = ResetSchema.safeParse(values);
  if (!validatedFiled.success) {
    return { error: "neplatný email" };
  }

  const { email } = validatedFiled.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Zkontolujte vyplněná data a zkuste to znovu"' };
  }
  return { success: "Email pro resetování byl odeslán" };
};
