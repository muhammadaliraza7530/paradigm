import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { LitPanel } from "@/components/site/LitPanel";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { SERVICES, SITE, waLink } from "@/lib/site-content";


const TITLE = "Contact Paradigm Design & Construct | Islamabad";
const DESC =
  "Talk to Paradigm Design & Construct in Gulberg Green, Islamabad. Call 0300 8569563 or send us your project brief for a construction quote.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);


  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's build it together"
        intro="Tell us about your project and our team will get back to you with the next steps."
        image="/images/solar.png"
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <Reveal className="reveal-left">
            <div className="space-y-5">
              <LitPanel className="bg-card/50 p-7">
                <MapPin className="size-5 text-primary" />
                <h2 className="mt-4 text-base">Head office</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {SITE.headOffice}
                </p>
              </LitPanel>
              <LitPanel className="bg-card/50 p-7">
                <MapPin className="size-5 text-primary" />
                <h2 className="mt-4 text-base">Workshop</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {SITE.workshop}
                </p>
              </LitPanel>
              <LitPanel className="bg-card/50 p-7">
                <Phone className="size-5 text-primary" />
                <h2 className="mt-4 text-base">Call us</h2>
                <a
                  href={`tel:${SITE.uanTel}`}
                  className="mt-2 block text-sm text-muted-foreground hover:text-primary"
                >
                  {SITE.uan}
                </a>
                <Mail className="mt-5 size-5 text-primary" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 block text-sm text-muted-foreground hover:text-primary"
                >
                  {SITE.email}
                </a>
              </LitPanel>
            </div>
          </Reveal>

          <Reveal className="reveal-right" delay={120}>
            <LitPanel className="bg-card/50 p-8 lg:p-10">
              <h2 className="text-2xl">Send us a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Share a few details and we will respond during business hours.
              </p>
              <form
                className="mt-8 grid gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const clean = (v: FormDataEntryValue | null, max: number) =>
                    String(v ?? "").trim().slice(0, max);
                  const name = clean(fd.get("name"), 100);
                  const phone = clean(fd.get("phone"), 30);
                  const email = clean(fd.get("email"), 255);
                  const service = clean(fd.get("service"), 120);
                  const message = clean(fd.get("message"), 1000);

                  if (!name || !phone || !service || !message) return;

                  const text = [
                    `Hello ${SITE.name}, I would like to request a quote.`,
                    ``,
                    `Name: ${name}`,
                    `Phone: ${phone}`,
                    email ? `Email: ${email}` : null,
                    `Service needed: ${service}`,
                    ``,
                    `Details: ${message}`,
                  ]
                    .filter(Boolean)
                    .join("\n");

                  window.open(waLink(text), "_blank", "noopener,noreferrer");
                  setSent(true);
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your full name" required />
                  <Field label="Phone" name="phone" type="tel" placeholder="03xx xxxxxxx" required />
                </div>
                <Field label="Email" name="email" type="email" placeholder="you@company.com" />
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Service needed
                  </span>
                  <select
                    name="service"
                    required
                    defaultValue=""
                    className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Other / Not sure yet">Other / Not sure yet</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    maxLength={1000}
                    placeholder="Tell us about the scope, location and timeline."
                    className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                  />
                </label>
                <button
                  type="submit"
                  className="btn-shake inline-flex items-center justify-center gap-2 border border-primary bg-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
                >
                  <Send className="size-4" /> Send on WhatsApp
                </button>
                {sent && (
                  <p className="text-sm text-primary">
                    WhatsApp opened with your message — press send there. For anything urgent, call{" "}
                    {SITE.uan}.
                  </p>
                )}

              </form>
            </LitPanel>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
      />
    </label>
  );
}
