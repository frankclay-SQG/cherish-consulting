import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { CookieBanner } from "../components/CookieBanner";

function StarDivider({ count = 3, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-accent select-none" style={{ fontSize: "0.6rem" }}>★</span>
      ))}
    </div>
  );
}

export default function PrivacyPage() {
  const EFFECTIVE_DATE = "January 1, 2024";

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <SiteNav alwaysSolid />

      {/* Page header */}
      <div className="pt-16 bg-secondary border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <StarDivider count={3} className="mb-4" />
          <h1
            className="text-4xl md:text-5xl leading-tight text-foreground mb-4"
            style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
          >
            Privacy Policy
          </h1>
          <p className="text-[0.95rem] text-foreground/60 max-w-xl leading-relaxed">
            Effective Date: {EFFECTIVE_DATE}
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-10 text-foreground/80 leading-relaxed text-[0.95rem]">

            {/* Commitment box */}
            <div className="border border-primary/30 bg-primary/5 px-6 py-5">
              <p className="text-sm font-semibold text-foreground mb-1">Our Privacy Commitment</p>
              <p>
                Cherish Consulting does not sell, rent, or trade your personal information to any third party —
                ever. All personally identifiable information (PII) and protected health information (PHI)
                collected in connection with our services is held in strict confidence and handled in accordance
                with applicable federal and state laws, including HIPAA where applicable.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                1. Who We Are
              </h2>
              <p>
                Cherish Consulting is a veteran-owned mental health and wellness practice operated by Dr. Carol J.
                Cherich, PhD, serving clients in Tennessee and Virginia. This Privacy Policy describes how we
                collect, use, and protect information gathered through our website at{" "}
                <a href="https://cherishconsulting.com" className="text-primary hover:opacity-80 underline underline-offset-2">
                  cherishconsulting.com
                </a>{" "}
                (the "Site").
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                2. Information We Collect
              </h2>
              <p className="mb-3">We may collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Contact information</strong> you voluntarily provide (name, email address, phone
                  number) when you submit our contact or scheduling form.
                </li>
                <li>
                  <strong>Message content</strong> you include in form submissions.
                </li>
                <li>
                  <strong>Usage data</strong> collected automatically through cookies and analytics tools
                  (e.g., pages visited, browser type, referral source) to improve the Site experience.
                </li>
              </ul>
              <p className="mt-3">
                We do <strong>not</strong> collect sensitive clinical or health information through the website.
                Clinical records and PHI are managed exclusively within our secure, HIPAA-compliant practice
                management systems, separate from this website.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                3. How We Use Your Information
              </h2>
              <p>Information you provide is used solely to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Respond to your inquiries and scheduling requests</li>
                <li>Communicate information relevant to services you have requested</li>
                <li>Improve the functionality and content of the Site</li>
              </ul>
              <p className="mt-3">
                We will not use your contact information for unsolicited marketing communications without your
                explicit consent.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                4. We Do Not Sell Your Information
              </h2>
              <p>
                <strong>
                  Cherish Consulting does not sell, lease, rent, or otherwise disclose your personal information
                  to third parties for their marketing or commercial purposes.
                </strong>{" "}
                Your information is never sold to data brokers, advertisers, or any other external parties.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                5. Confidentiality of PII and PHI
              </h2>
              <p>
                We treat all personally identifiable information (PII) and protected health information (PHI)
                with the highest degree of confidentiality. As a licensed mental health professional practice,
                we are bound by federal HIPAA regulations and applicable state law regarding the privacy and
                security of health information. All clinical records, intake forms, and session-related
                communications are handled exclusively through HIPAA-compliant systems and are never shared
                without your express written authorization, except as required by law.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                6. Cookies and Analytics
              </h2>
              <p>
                The Site may use cookies and third-party analytics tools (such as Google Analytics) to understand
                how visitors use the Site. This data is aggregated and anonymized and does not identify individual
                users. You may decline non-essential cookies using the cookie preference banner displayed on your
                first visit. Declining cookies does not affect your ability to use any part of the Site.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                7. Data Security
              </h2>
              <p>
                We implement reasonable administrative, technical, and physical safeguards to protect your
                information from unauthorized access, loss, or misuse. However, no method of transmission over
                the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                8. Third-Party Links
              </h2>
              <p>
                This Site contains links to external resources such as the VA PTSD website and PsychArmor.
                Clicking these links takes you to sites outside our control. We encourage you to review the
                privacy policies of any third-party sites you visit.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                9. Children's Privacy
              </h2>
              <p>
                This Site is not directed at children under 13. We do not knowingly collect personal information
                from children under 13. If you believe we have inadvertently collected such information, please
                contact us immediately so we can delete it.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                10. Your Rights
              </h2>
              <p>
                You may request access to, correction of, or deletion of any personal information we hold about
                you by contacting us at the address below. We will respond within a reasonable timeframe.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                11. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page
                with an updated effective date. We encourage you to review this page periodically.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                12. Contact Us
              </h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please
                contact us at:
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <p className="font-semibold text-foreground">Cherish Consulting</p>
                <p>Dr. Carol J. Cherich, PhD</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:drcarol@cherishconsulting.com"
                    className="text-primary hover:opacity-80 underline underline-offset-2"
                  >
                    drcarol@cherishconsulting.com
                  </a>
                </p>
                <p>Serving Tennessee &amp; Virginia</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
