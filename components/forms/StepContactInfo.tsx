"use client";

import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "@/lib/schemas/quote-form";
import Link from "next/link";

interface StepContactInfoProps {
  form: UseFormReturn<QuoteFormData>;
}

export function StepContactInfo({ form }: StepContactInfoProps) {
  const errors = form.formState.errors;

  const inputClasses = (hasError: boolean) =>
    cn(
      "w-full px-4 py-3 rounded-lg border-2 text-sm transition-colors duration-200",
      "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-100",
      hasError ? "border-red-400 bg-red-50" : "border-neutral-200 bg-white"
    );

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-heading font-bold text-primary mb-2">
        Vos coordonnées
      </h3>
      <p className="text-neutral-500 text-sm mb-6">
        Pour vous recontacter avec votre devis personnalisé.
      </p>

      {/* Full name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-semibold text-primary mb-2"
        >
          Nom complet
        </label>
        <input
          id="fullName"
          type="text"
          placeholder="Jean Dupont"
          {...form.register("fullName")}
          className={inputClasses(!!errors.fullName)}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-primary mb-2"
        >
          Téléphone
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="06 12 34 56 78"
          {...form.register("phone")}
          className={inputClasses(!!errors.phone)}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-primary mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="jean.dupont@email.com"
          {...form.register("email")}
          className={inputClasses(!!errors.email)}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-primary mb-2"
        >
          Message{" "}
          <span className="text-neutral-400 font-normal">(optionnel)</span>
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder="Décrivez votre projet en quelques mots..."
          {...form.register("message")}
          className={inputClasses(!!errors.message)}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* RGPD Consent */}
      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          checked={form.watch("consent") === true}
          onChange={(e) =>
            form.setValue("consent", e.target.checked as true, {
              shouldValidate: true,
            })
          }
          className="mt-1 h-4 w-4 rounded border-neutral-300 text-accent accent-accent focus:ring-accent cursor-pointer"
        />
        <label htmlFor="consent" className="text-sm text-neutral-600 cursor-pointer">
          J&apos;accepte que mes données soient traitées conformément à la{" "}
          <Link
            href="/mentions-legales"
            className="text-accent underline hover:text-accent-600"
            target="_blank"
          >
            politique de confidentialité
          </Link>
          . *
        </label>
      </div>
      {errors.consent && (
        <p className="text-sm text-red-600">{errors.consent.message}</p>
      )}
    </div>
  );
}
