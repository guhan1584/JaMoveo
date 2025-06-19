import { z } from "zod";
import { ALLOWED_INSTRUMENTS } from "../constants/instruments";
export const signupSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  instrument: z.enum(ALLOWED_INSTRUMENTS, {
    errorMap: () => ({
      message: "Please select a valid instrument from the list",
    }),
  }),
  admin: z.boolean(),
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
