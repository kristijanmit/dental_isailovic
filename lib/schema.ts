import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .regex(/^[+()\-\d\s]{7,}$/, "Please enter a valid phone number."),
  email: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((value) => value === "" || z.string().email().safeParse(value).success, {
      message: "Please enter a valid email address."
    }),
  serviceInterest: z.string().min(1, "Please select a service."),
  message: z.string().min(10, "Please provide at least 10 characters."),
  consent: z
    .boolean()
    .refine((value) => value === true, { message: "You must agree before submitting." })
});

export type ContactFormValues = z.infer<typeof contactSchema>;
