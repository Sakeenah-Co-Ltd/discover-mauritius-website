"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { whatsappLink, cn } from "@/lib/utils";
import type { IconName } from "@/lib/types";

type ServiceKey = "tour" | "transfer" | "package" | "flights" | "hotel";

const SERVICES: { key: ServiceKey; label: string; icon: IconName }[] = [
  { key: "tour", label: "Tours & experiences", icon: "route" },
  { key: "transfer", label: "Airport transfer", icon: "car" },
  { key: "package", label: "Holiday package", icon: "calendar" },
  { key: "flights", label: "Air ticketing", icon: "plane" },
  { key: "hotel", label: "Hotel assistance", icon: "hotel" },
];

const INTERESTS = [
  "Beaches & lagoons",
  "Culture & history",
  "Nature & hiking",
  "Food & markets",
  "Family friendly",
  "Adventure & water sports",
  "Relaxation & wellness",
  "Shopping",
];

const BUDGETS = [
  "Not sure yet",
  "Under $1,000 pp",
  "$1,000 – $2,500 pp",
  "$2,500 – $5,000 pp",
  "$5,000+ pp",
];

interface FormState {
  service: ServiceKey | "";
  item: string;
  arrival: string;
  departure: string;
  flexible: boolean;
  adults: number;
  children: number;
  interests: string[];
  budget: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  contactMethod: "WhatsApp" | "Email";
  message: string;
}

const inputCls =
  "w-full rounded-input border border-hairline bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus-visible:border-ocean focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ocean aria-[invalid=true]:border-gold aria-[invalid=true]:bg-sand-mist/40";

function prettify(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildSummary(d: FormState) {
  const svc = SERVICES.find((s) => s.key === d.service)?.label ?? d.service;
  return [
    `New Mauritius trip enquiry — ${svc}`,
    d.item ? `Interested in: ${prettify(d.item)}` : null,
    `Dates: ${d.flexible ? "Flexible" : `${d.arrival || "?"} → ${d.departure || "?"}`}`,
    `Travellers: ${d.adults} adult(s)${d.children ? `, ${d.children} child(ren)` : ""}`,
    d.interests.length ? `Interests: ${d.interests.join(", ")}` : null,
    d.budget && d.budget !== "Not sure yet" ? `Budget: ${d.budget}` : null,
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.phone ? `Phone/WhatsApp: ${d.phone}` : null,
    d.country ? `Country: ${d.country}` : null,
    `Preferred contact: ${d.contactMethod}`,
    d.message ? `Notes: ${d.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const cleanDate = (v?: string) => (v && ISO_DATE.test(v) ? v : "");
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2026-11-03" → "3 Nov 2026" without touching Date/timezones (safe for SSR). */
const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return m >= 1 && m <= 12 ? `${d} ${MONTHS[m - 1]} ${y}` : iso;
};
const cleanInt = (v: string | undefined, fallback: number, min: number, max: number) => {
  const n = Number.parseInt(v ?? "", 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};

export function QuoteForm({
  initialService = "",
  initialItem = "",
  initialArrival,
  initialDeparture,
  initialFlexible,
  initialAdults,
  initialChildren,
}: {
  initialService?: string;
  initialItem?: string;
  /** Pre-fill from the home-page trip planner (`?arrival=&departure=&flexible=&adults=&children=`). */
  initialArrival?: string;
  initialDeparture?: string;
  initialFlexible?: string;
  initialAdults?: string;
  initialChildren?: string;
}) {
  const validService = SERVICES.some((s) => s.key === initialService)
    ? (initialService as ServiceKey)
    : "";
  const arrival = cleanDate(initialArrival);
  const departure = cleanDate(initialDeparture);
  const flexible = initialFlexible === "1" || initialFlexible === "true";
  const adults = cleanInt(initialAdults, 2, 1, 20);
  const children = cleanInt(initialChildren, 0, 0, 20);

  // Arriving from the hero planner with a service AND usable dates: steps 1–2
  // are already answered, so start at "Interests & budget" (Back still works).
  const datesUsable = flexible || (arrival !== "" && (departure === "" || departure >= arrival));
  const startStep = validService && datesUsable ? 2 : 0;

  const [step, setStep] = useState(startStep);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<FormState>({
    service: validService,
    item: initialItem.slice(0, 120),
    arrival,
    departure,
    flexible,
    adults,
    children,
    interests: [],
    budget: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    contactMethod: "WhatsApp",
    message: "",
  });

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const summary = useMemo(() => buildSummary(data), [data]);
  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    "Mauritius trip enquiry",
  )}&body=${encodeURIComponent(summary)}`;
  const waHref = whatsappLink(summary);

  const steps = copy.quote.steps;

  function validateStep(s: number): boolean {
    const e: Record<string, string> = {};
    if (s === 0 && !data.service) e.service = "Please choose what we can help with.";
    if (s === 1) {
      if (!data.flexible && !data.arrival) e.arrival = "Add an arrival date, or tick “flexible”.";
      if (!data.flexible && data.arrival && data.departure && data.departure < data.arrival)
        e.departure = "Departure can’t be before arrival.";
      if (data.adults < 1) e.adults = "At least one traveller.";
    }
    if (s === 3) {
      if (!data.name.trim()) e.name = "Please add your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Enter a valid email.";
      if (data.contactMethod === "WhatsApp" && !data.phone.trim())
        e.phone = "Add a number for WhatsApp, or switch to Email.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function back() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    if (!validateStep(3)) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-hairline bg-white p-8 text-center shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lagoon-mist text-lagoon-deep">
          <Icon name="check" size={28} />
        </span>
        <h2 className="mt-5 text-2xl">{copy.quote.success.title}</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">{copy.quote.success.body}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={waHref} variant="whatsapp" icon="whatsapp" iconPosition="left" target="_blank">
            Message us on WhatsApp
          </Button>
          <Button href="/tours" variant="secondary" icon="arrow-right">
            Browse more tours
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-hairline bg-white p-6 shadow-card md:p-8">
      {/* Progress */}
      <ol className="mb-8 flex items-center gap-2" aria-label="Progress">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col gap-1.5">
            <span
              className={cn(
                "h-1.5 rounded-full transition-colors",
                i <= step ? "bg-ocean" : "bg-hairline",
              )}
            />
            <span className={cn("text-xs font-medium", i === step ? "text-ocean" : "text-muted")}>
              {i + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      {/* Recap when the home-page planner pre-filled steps 1–2 */}
      {startStep === 2 && step >= 2 ? (
        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-lagoon-mist px-4 py-2.5 text-sm text-ink">
          <Icon name="check" size={15} className="text-lagoon-deep" />
          <span>
            <span className="font-semibold">{SERVICES.find((s) => s.key === data.service)?.label}</span>
            {data.item ? ` · ${prettify(data.item)}` : ""}
            {" · "}
            {data.flexible
              ? "Flexible dates"
              : `${fmtDate(data.arrival)}${data.departure ? ` → ${fmtDate(data.departure)}` : ""}`}
            {" · "}
            {data.adults} adult{data.adults === 1 ? "" : "s"}
            {data.children ? `, ${data.children} child${data.children === 1 ? "" : "ren"}` : ""}
          </span>
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setStep(0);
            }}
            className="ml-auto font-semibold text-ocean underline-offset-2 hover:underline"
          >
            Edit
          </button>
        </div>
      ) : null}

      {/* Step 0 — service */}
      {step === 0 && (
        <fieldset className="flex flex-col gap-4">
          <legend className="mb-2 text-xl font-semibold text-ink">{copy.quote.fields.service}</legend>
          {data.item ? (
            <p className="rounded-xl bg-lagoon-mist px-4 py-2 text-sm text-ocean">
              Regarding: <span className="font-semibold">{prettify(data.item)}</span>
            </p>
          ) : null}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <label
                key={s.key}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all",
                  data.service === s.key
                    ? "border-ocean bg-lagoon-mist shadow-card"
                    : "border-hairline hover:border-ocean/40",
                )}
              >
                <input
                  type="radio"
                  name="service"
                  className="sr-only"
                  checked={data.service === s.key}
                  onChange={() => set("service", s.key)}
                />
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-ocean">
                  <Icon name={s.icon} size={20} />
                </span>
                <span className="font-medium text-ink">{s.label}</span>
              </label>
            ))}
          </div>
          {errors.service ? <FieldError id="service">{errors.service}</FieldError> : null}
        </fieldset>
      )}

      {/* Step 1 — dates & travellers */}
      {step === 1 && (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-ink">{steps[1]}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={copy.quote.fields.arrival} error={errors.arrival} htmlFor="arrival">
              <input
                id="arrival"
                type="date"
                className={inputCls}
                value={data.arrival}
                disabled={data.flexible}
                aria-invalid={!!errors.arrival}
                onChange={(e) => set("arrival", e.target.value)}
              />
            </Field>
            <Field label={copy.quote.fields.departure} error={errors.departure} htmlFor="departure">
              <input
                id="departure"
                type="date"
                className={inputCls}
                value={data.departure}
                disabled={data.flexible}
                aria-invalid={!!errors.departure}
                onChange={(e) => set("departure", e.target.value)}
              />
            </Field>
          </div>
          <label className="flex items-center gap-2.5 text-sm text-ink">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-hairline text-ocean accent-ocean"
              checked={data.flexible}
              onChange={(e) => set("flexible", e.target.checked)}
            />
            {copy.quote.fields.flexible}
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={copy.quote.fields.adults} error={errors.adults} htmlFor="adults">
              <NumberStepper value={data.adults} min={1} onChange={(v) => set("adults", v)} id="adults" />
            </Field>
            <Field label={copy.quote.fields.children} htmlFor="children">
              <NumberStepper value={data.children} min={0} onChange={(v) => set("children", v)} id="children" />
            </Field>
          </div>
        </div>
      )}

      {/* Step 2 — interests & budget */}
      {step === 2 && (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-ink">{steps[2]}</h2>
          <Field label={copy.quote.fields.interests} htmlFor="interests">
            <div className="flex flex-wrap gap-2" id="interests">
              {INTERESTS.map((t) => {
                const active = data.interests.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      set(
                        "interests",
                        active ? data.interests.filter((x) => x !== t) : [...data.interests, t],
                      )
                    }
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                      active
                        ? "border-ocean bg-ocean text-white"
                        : "border-hairline bg-white text-ink hover:bg-lagoon-mist",
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label={copy.quote.fields.budget} htmlFor="budget">
            <select
              id="budget"
              className={inputCls}
              value={data.budget}
              onChange={(e) => set("budget", e.target.value)}
            >
              <option value="">Prefer not to say</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {/* Step 3 — details */}
      {step === 3 && (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-ink">{steps[3]}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={copy.quote.fields.name} error={errors.name} htmlFor="name">
              <input id="name" className={inputCls} value={data.name} aria-invalid={!!errors.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
            </Field>
            <Field label={copy.quote.fields.country} htmlFor="country">
              <input id="country" className={inputCls} value={data.country} onChange={(e) => set("country", e.target.value)} autoComplete="country-name" />
            </Field>
            <Field label={copy.quote.fields.email} error={errors.email} htmlFor="email">
              <input id="email" type="email" className={inputCls} value={data.email} aria-invalid={!!errors.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
            </Field>
            <Field label={copy.quote.fields.phone} error={errors.phone} htmlFor="phone">
              <input id="phone" type="tel" className={inputCls} value={data.phone} aria-invalid={!!errors.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
            </Field>
          </div>
          <Field label={copy.quote.fields.contactMethod} htmlFor="contactMethod">
            <div className="flex gap-3" id="contactMethod">
              {(["WhatsApp", "Email"] as const).map((m) => (
                <label
                  key={m}
                  className={cn(
                    "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-input border px-4 py-3 text-sm font-medium transition-all",
                    data.contactMethod === m ? "border-ocean bg-lagoon-mist text-ocean" : "border-hairline text-ink hover:bg-lagoon-mist",
                  )}
                >
                  <input type="radio" name="contactMethod" className="sr-only" checked={data.contactMethod === m} onChange={() => set("contactMethod", m)} />
                  <Icon name={m === "WhatsApp" ? "whatsapp" : "mail"} size={16} />
                  {m}
                </label>
              ))}
            </div>
          </Field>
          <Field label={copy.quote.fields.message} htmlFor="message">
            <textarea id="message" rows={3} className={inputCls} value={data.message} onChange={(e) => set("message", e.target.value)} />
          </Field>
          {status === "error" ? (
            <p className="rounded-xl bg-sand-mist px-4 py-3 text-sm text-gold-ink">
              Something went wrong sending your request. Please use WhatsApp or email below — your details are ready to send.
            </p>
          ) : null}
        </div>
      )}

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={back} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink hover:bg-lagoon-mist">
            <Icon name="chevron-down" size={16} className="rotate-90" /> Back
          </button>
        ) : (
          <span />
        )}
        {step < steps.length - 1 ? (
          <Button onClick={next} icon="arrow-right">
            Continue
          </Button>
        ) : (
          <Button onClick={submit} icon="sparkles" iconPosition="left" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : copy.ctas.getQuote}
          </Button>
        )}
      </div>

      {/* Always-available fallbacks (brief §3) */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-hairline pt-5 text-sm text-muted">
        <span>Prefer to send directly?</span>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-ocean hover:underline">
          <Icon name="whatsapp" size={15} /> WhatsApp
        </a>
        <a href={mailtoHref} className="inline-flex items-center gap-1.5 font-semibold text-ocean hover:underline">
          <Icon name="mail" size={15} /> Email
        </a>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? <FieldError id={htmlFor}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm font-medium text-gold-ink" role="alert">
      <Icon name="sparkles" size={14} className="shrink-0" />
      {children}
    </p>
  );
}

function NumberStepper({
  value,
  min,
  onChange,
  id,
}: {
  value: number;
  min: number;
  onChange: (v: number) => void;
  id: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:bg-lagoon-mist"
      >
        −
      </button>
      <output id={id} className="w-8 text-center text-lg font-semibold text-ink">
        {value}
      </output>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(value + 1)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:bg-lagoon-mist"
      >
        +
      </button>
    </div>
  );
}
