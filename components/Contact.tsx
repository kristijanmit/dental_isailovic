"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Phone, Send } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GoogleCalendarBookingMock } from "@/components/GoogleCalendarBookingMock";
import { Section } from "@/components/Section";
import { contactSchema, type ContactFormValues } from "@/lib/schema";
import { useSiteData } from "@/contexts/LanguageContext";
import { copyToClipboard } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  fadeUp,
  fadeUpReduced,
  getVariants,
  staggerContainer,
  staggerContainerReduced,
  viewportDefaults
} from "@/lib/motion";

const GOOGLE_CALENDAR_BOOKING_URL = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL || null;
// Temporary: shows a visual-only mock of the booking widget in place of the
// form, so the layout can be reviewed before a real booking URL exists.
// Remove this flag (and .env.local's NEXT_PUBLIC_MOCK_GOOGLE_CALENDAR) once
// NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL is set.
const MOCK_GOOGLE_CALENDAR = process.env.NEXT_PUBLIC_MOCK_GOOGLE_CALENDAR === "true";

function buildSubmittedMessage(data: ContactFormValues, clinicName: string) {
  return [
    `Appointment Request - ${clinicName}`,
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "Not provided"}`,
    `Service Interest: ${data.serviceInterest}`,
    "",
    "Message:",
    data.message
  ].join("\n");
}

export function Contact() {
  const siteData = useSiteData();
  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      serviceInterest: "",
      message: "",
      consent: false
    }
  });

  const summary = useMemo(
    () => (submittedData ? buildSubmittedMessage(submittedData, siteData.clinic.clinicName) : ""),
    [submittedData, siteData.clinic.clinicName]
  );

  const mailtoHref = useMemo(() => {
    if (!submittedData || !siteData.clinic.email) {
      return "#";
    }

    const subject = encodeURIComponent(
      `Appointment Request - ${siteData.clinic.clinicName}`
    );
    const body = encodeURIComponent(summary);
    return `mailto:${siteData.clinic.email}?subject=${subject}&body=${body}`;
  }, [submittedData, summary, siteData.clinic.clinicName, siteData.clinic.email]);

  const containerVariants = getVariants(
    reduceMotion,
    staggerContainer(0.05),
    staggerContainerReduced()
  );
  const itemVariants = getVariants(reduceMotion, fadeUp, fadeUpReduced);

  const showShake = !reduceMotion && isDesktop;

  return (
    <Section
      id="contact"
      title={siteData.contactSection.title}
      subtitle={siteData.contactSection.subtitle}
    >
      <motion.div
        className="grid gap-6 lg:grid-cols-[1.4fr_1fr]"
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefaults}
        variants={containerVariants}
      >
        {GOOGLE_CALENDAR_BOOKING_URL ? (
          <motion.div variants={itemVariants} className="surface overflow-hidden p-2">
            <iframe
              src={GOOGLE_CALENDAR_BOOKING_URL}
              title={siteData.contactSection.title}
              width="100%"
              height="700"
              style={{ border: 0 }}
              loading="lazy"
            />
          </motion.div>
        ) : MOCK_GOOGLE_CALENDAR ? (
          <motion.div variants={itemVariants} className="surface overflow-hidden p-2">
            <GoogleCalendarBookingMock />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="surface p-6">
            <AnimatePresence mode="wait">
              {!submittedData ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(async (values) => {
                    setSubmittedData(values);
                  })}
                  noValidate
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants}>
                    <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
                      {siteData.contactSection.form.fullNameLabel}
                    </label>
                    <ShakeInput
                      id="fullName"
                      type="text"
                      {...register("fullName")}
                      hasError={!!errors.fullName}
                      showShake={showShake}
                      className="w-full rounded-lg border border-white/60 bg-white/60 px-3 py-2 backdrop-blur-sm"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-700">{errors.fullName.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                      {siteData.contactSection.form.phoneLabel}
                    </label>
                    <ShakeInput
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      hasError={!!errors.phone}
                      showShake={showShake}
                      className="w-full rounded-lg border border-white/60 bg-white/60 px-3 py-2 backdrop-blur-sm"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-700">{errors.phone.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">
                      {siteData.contactSection.form.emailLabel}
                    </label>
                    <ShakeInput
                      id="email"
                      type="email"
                      {...register("email")}
                      hasError={!!errors.email}
                      showShake={showShake}
                      className="w-full rounded-lg border border-white/60 bg-white/60 px-3 py-2 backdrop-blur-sm"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-700">{errors.email.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="serviceInterest" className="mb-1 block text-sm font-medium">
                      {siteData.contactSection.form.serviceInterestLabel}
                    </label>
                    <select
                      id="serviceInterest"
                      {...register("serviceInterest")}
                      className="w-full rounded-lg border border-white/60 bg-white/60 px-3 py-2 backdrop-blur-sm"
                    >
                      <option value="">{siteData.common.selectServicePlaceholder}</option>
                      {siteData.services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                    {errors.serviceInterest && (
                      <p className="mt-1 text-sm text-red-700">
                        {errors.serviceInterest.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium">
                      {siteData.contactSection.form.messageLabel}
                    </label>
                    <ShakeInput
                      id="message"
                      as="textarea"
                      rows={5}
                      {...register("message")}
                      hasError={!!errors.message}
                      showShake={showShake}
                      className="w-full rounded-lg border border-white/60 bg-white/60 px-3 py-2 backdrop-blur-sm"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-700">{errors.message.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" {...register("consent")} />
                      {siteData.contactSection.form.consentLabel}
                    </label>
                    {errors.consent && (
                      <p className="mt-1 text-sm text-red-700">{errors.consent.message}</p>
                    )}
                  </motion.div>

                  <motion.p
                    variants={itemVariants}
                    className="text-sm text-muted-foreground"
                  >
                    {siteData.contactSection.privacyNote}
                  </motion.p>

                  <motion.button
                    variants={itemVariants}
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground"
                  >
                    {siteData.contactSection.submitLabel}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.35 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold">{siteData.contactSection.successTitle}</h3>
                  <p className="text-muted-foreground">
                    {siteData.contactSection.successDescription}
                  </p>

                  <pre className="overflow-auto rounded-lg border border-white/60 bg-white/60 p-4 text-sm backdrop-blur-sm">{summary}</pre>

                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      type="button"
                      className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
                      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      onClick={async () => {
                        const didCopy = await copyToClipboard(summary);
                        setCopied(didCopy);
                        if (didCopy) {
                          setTimeout(() => setCopied(false), 1600);
                        }
                      }}
                    >
                      {copied
                        ? siteData.contactSection.copiedButtonLabel
                        : siteData.contactSection.copyButtonLabel}
                    </motion.button>

                    {siteData.clinic.email && (
                      <motion.a
                        href={mailtoHref}
                        className="rounded-full border px-4 py-2 text-sm font-semibold"
                        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      >
                        {siteData.contactSection.emailButtonLabel}
                      </motion.a>
                    )}

                    <motion.button
                      type="button"
                      className="rounded-full border px-4 py-2 text-sm font-semibold"
                      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      onClick={() => {
                        setSubmittedData(null);
                        reset();
                      }}
                    >
                      {siteData.contactSection.resetButtonLabel}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.aside
          variants={itemVariants}
          className="surface flex h-fit flex-col gap-6 p-6 lg:self-start"
        >
          <h3 className="text-lg font-semibold">{siteData.contactSection.quickActionsTitle}</h3>

          <div className="grid gap-2">
            <motion.a
              href={`tel:${siteData.clinic.phoneRaw}`}
              className="inline-flex items-center gap-3 rounded-lg border border-white/60 bg-white/60 px-4 py-3 text-sm font-semibold backdrop-blur-md transition-colors hover:border-accent/40 hover:bg-white"
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Phone className="h-4 w-4" />
              </span>
              {siteData.clinic.phoneDisplay}
            </motion.a>
            <motion.a
              href={`https://wa.me/${siteData.clinic.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg border border-white/60 bg-white/60 px-4 py-3 text-sm font-semibold backdrop-blur-md transition-colors hover:border-accent/40 hover:bg-white"
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Send className="h-4 w-4" />
              </span>
              {siteData.common.whatsappLabel}
            </motion.a>
          </div>

          <div className="border-t border-white/60 pt-5">
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div className="text-muted-foreground">
                <p>{siteData.clinic.address}</p>
                {siteData.clinic.email && <p>{siteData.clinic.email}</p>}
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 text-sm">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <ul className="space-y-1 text-muted-foreground">
                {siteData.clinic.openingHours.map((line, index) => (
                  <li
                    key={line}
                    className={
                      index === siteData.clinic.openingHours.length - 1
                        ? "font-medium text-accent"
                        : undefined
                    }
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.aside>
      </motion.div>
    </Section>
  );
}

type ShakeInputProps = (
  | (React.ComponentPropsWithoutRef<"input"> & { as?: "input" })
  | (React.ComponentPropsWithoutRef<"textarea"> & { as: "textarea" })
) & {
  hasError: boolean;
  showShake: boolean;
};

function ShakeInput({
  hasError,
  showShake,
  as: Component = "input",
  className,
  ...props
}: ShakeInputProps) {
  const inputProps = { ...props, className };
  return (
    <motion.div
      animate={
        hasError && showShake
          ? { x: [-4, 4, -3, 3, 0], transition: { duration: 0.6 } }
          : { x: 0 }
      }
    >
      {Component === "textarea" ? (
        <textarea {...(inputProps as React.ComponentPropsWithoutRef<"textarea">)} />
      ) : (
        <input {...(inputProps as React.ComponentPropsWithoutRef<"input">)} />
      )}
    </motion.div>
  );
}
