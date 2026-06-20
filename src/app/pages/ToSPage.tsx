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

export default function ToSPage() {
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
            Terms of Service
          </h1>
          <p className="text-[0.95rem] text-foreground/60 max-w-xl leading-relaxed">
            Effective Date: {EFFECTIVE_DATE}
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 prose prose-sm max-w-none">
          <div className="space-y-10 text-foreground/80 leading-relaxed text-[0.95rem]">

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the website located at{" "}
                <a href="https://cherishconsulting.com" className="text-primary hover:opacity-80 underline underline-offset-2">
                  cherichconsulting.com
                </a>{" "}
                (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all
                of these Terms, please do not use the Site. These Terms apply to all visitors, users, and others
                who access or use the Site.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                2. Services Described
              </h2>
              <p>
                Cherich Consulting, operated by Dr. Carol J. Cherich, PhD, provides mental health and wellness
                consulting services, including but not limited to life coaching, veterans and military family
                counseling, mental health treatment, stress and anger management, substance abuse treatment
                support, cancer survivor support, DOT-SAP and DWI evaluations, and clinical supervision.
              </p>
              <p className="mt-3">
                The content on this Site is for informational purposes only and does not constitute a therapeutic
                relationship, medical advice, or a substitute for professional mental health treatment. Scheduling
                a session through this Site initiates a consultation process, not a legally binding treatment
                agreement, until a formal informed consent is signed.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                3. Not a Crisis Resource
              </h2>
              <p>
                This Site and its contact form are <strong>not</strong> a crisis resource. If you or someone you
                know is in immediate danger or experiencing a mental health emergency, please call{" "}
                <strong>911</strong> or the{" "}
                <strong>988 Suicide &amp; Crisis Lifeline</strong> (call or text <strong>988</strong>).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                4. Intellectual Property
              </h2>
              <p>
                All content on this Site — including text, graphics, logos, images, and publications authored by
                Dr. Carol J. Cherich — is the property of Cherich Consulting and is protected by applicable
                copyright and intellectual property laws. You may not reproduce, distribute, or create derivative
                works from any Site content without prior written permission.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                5. User Conduct
              </h2>
              <p>You agree not to use this Site to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Harass, threaten, or intimidate any person</li>
                <li>Transmit spam, unsolicited communications, or harmful code</li>
                <li>Violate any applicable local, state, federal, or international law</li>
                <li>Interfere with the proper functioning of the Site</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                6. Third-Party Links
              </h2>
              <p>
                This Site may contain links to third-party websites, including the U.S. Department of Veterans
                Affairs and PsychArmor. These links are provided for your convenience only. Cherich Consulting
                has no control over, and assumes no responsibility for, the content, privacy policies, or
                practices of any third-party sites.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                7. Disclaimer of Warranties
              </h2>
              <p>
                The Site is provided on an "as is" and "as available" basis without warranties of any kind,
                express or implied. Cherich Consulting makes no warranty that the Site will be uninterrupted,
                error-free, or free of viruses or other harmful components.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                8. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Cherich Consulting and Dr. Carol J. Cherich shall not be
                liable for any indirect, incidental, special, or consequential damages arising out of or in
                connection with your use of the Site or its content.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                9. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of
                Tennessee, without regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                10. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be posted on this page with
                an updated effective date. Continued use of the Site after changes are posted constitutes
                acceptance of the revised Terms.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Lora', serif" }}>
                11. Contact
              </h2>
              <p>
                If you have questions about these Terms, please contact us at:{" "}
                <a
                  href="mailto:drcarol@cherichconsulting.com"
                  className="text-primary hover:opacity-80 underline underline-offset-2"
                >
                  drcarol@cherichconsulting.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
