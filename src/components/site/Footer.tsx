import { Link } from "@tanstack/react-router";
import { NAV, SERVICES, SITE } from "@/lib/site-content";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/40">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={SITE.logo} alt={`${SITE.name} logo`} className="h-12 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A top-tier design and construction company based in Islamabad, Pakistan, with over
              10 years of experience turning concepts into finished buildings.
            </p>
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Social</h3>
              <div className="mt-4 flex items-center gap-4">
                <a
                  href="https://www.facebook.com/share/1ELmg2dv1g/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Facebook className="size-5" />
                </a>
                <a
                  href="https://wa.me/message/KNUUIVBSIBUCG1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <svg viewBox="0 0 32 32" aria-hidden className="size-5 fill-current">
                    <path d="M16.03 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.73 6.42L3.2 28.8l6.55-1.71a12.75 12.75 0 0 0 6.28 1.63h.01c7.05 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.05a12.7 12.7 0 0 0-9.05-3.67Zm0 23.14h-.01c-1.9 0-3.77-.51-5.4-1.48l-.39-.23-4.03 1.05 1.08-3.93-.25-.4a10.6 10.6 0 0 1-1.63-5.66c0-5.87 4.77-10.64 10.64-10.64 2.84 0 5.51 1.11 7.52 3.12a10.57 10.57 0 0 1 3.11 7.53c0 5.87-4.77 10.64-10.64 10.64Zm5.83-7.97c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.18-.32-.02-.5.14-.66.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.73-.98-2.36-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.43 5.43 4.81.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/paradigms.com.pk?igsi=MW40MWFjd3VtMGgzZg%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Instagram className="size-5" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Navigate</h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Services</h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services"
                    hash={s.slug}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{SITE.headOffice}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`tel:${SITE.uanTel}`} className="hover:text-primary">
                  {SITE.uan}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="tracking-[0.2em] uppercase">Islamabad · Pakistan</p>
        </div>

      </div>
    </footer>
  );
}
