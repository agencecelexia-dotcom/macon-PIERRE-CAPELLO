import { z } from "zod";

// --- Step 1: Project Type ---
export const stepProjectTypeSchema = z.object({
  projectType: z.enum(["toiture", "facade", "peinture", "autre"], {
    message: "Veuillez sélectionner un type de projet",
  }),
});

// --- Step 2: Project Details ---
export const stepProjectDetailsSchema = z.object({
  surface: z
    .number({ message: "La surface est requise" })
    .min(5, "La surface minimum est de 5 m²")
    .max(1000, "La surface maximum est de 1000 m²"),
  timeline: z.enum(["urgent", "3-mois", "6-mois", "estimation"], {
    message: "Veuillez sélectionner un délai",
  }),
  postalCode: z
    .string({ message: "Le code postal est requis" })
    .regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
});

// --- Step 3: Contact Info ---
export const stepContactInfoSchema = z.object({
  fullName: z
    .string({ message: "Le nom complet est requis" })
    .min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z
    .string({ message: "Le numéro de téléphone est requis" })
    .regex(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      "Numéro de téléphone français invalide"
    ),
  email: z
    .string({ message: "L'adresse email est requise" })
    .email("Adresse email invalide"),
  message: z.string().optional(),
  consent: z.literal(true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
});

// --- Full Schema ---
export const quoteFormSchema = stepProjectTypeSchema
  .merge(stepProjectDetailsSchema)
  .merge(stepContactInfoSchema);

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

// Step schemas array for per-step validation
export const stepSchemas = [
  stepProjectTypeSchema,
  stepProjectDetailsSchema,
  stepContactInfoSchema,
] as const;
