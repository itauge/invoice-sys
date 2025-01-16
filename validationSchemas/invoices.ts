import { z } from "zod";

export const invoiceSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    value: z.string().min(1, "Value is required"),
    description: z.string().min(1, "Description is required"),
});
