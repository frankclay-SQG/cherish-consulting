import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";

export type CookieConsent = "all" | "essential" | "none" | null;

interface CookieBannerProps {
  onConsentChange?: (consent: CookieConsent) => void;
}

export function CookieBanner({ onConsentChange }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cherich_cookie_consent") as CookieConsent;
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (choice: CookieConsent) => {
    localStorage.setItem("cherich_cookie_consent", choice as string);
    setIsVisible(false);
    onConsentChange?.(choice);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] w-full max-w-sm">
      <div className="bg-background border-2 border-primary shadow-2xl overflow-hidden">
        <div className="flex h-1">
          <div className="flex-1 bg-[#1C2B4A]" />
          <div className="flex-1 bg-background/60" />
          <div className="flex-1 bg-[#8B2020]" />
        </div>
        <div className="p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 border border-border flex items-center justify-center flex-shrink-0 bg-secondary">
              <Cookie size={14} strokeWidth={1.5} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2
                className="text-base text-foreground mb-1"
                style={{ fontFamily: "'Lora', serif", fontWeight: 500 }}
              >
                Cookie Preferences
              </h2>
              <p className="text-xs text-foreground/60 leading-relaxed">
                We use cookies to improve your experience. Choose your preference.
              </p>
            </div>
          </div>
          {showDetails && (
            <div className="mb-4 p-3 bg-secondary border-l-2 border-accent space-y-3">
              <div>
                <h3 className="text-[10px] font-semibold text-foreground mb-1 tracking-wide uppercase">Essential Cookies</h3>
                <p className="text-[10px] text-foreground/55 leading-relaxed">Required for the website to function. Cannot be disabled.</p>
              </div>
              <div>
                <h3 className="text-[10px] font-semibold text-foreground mb-1 tracking-wide uppercase">Analytics Cookies</h3>
                <p className="text-[10px] text-foreground/55 leading-relaxed">Help us understand visitor interactions and improve performance.</p>
              </div>
              <div>
                <h3 className="text-[10px] font-semibold text-foreground mb-1 tracking-wide uppercase">Marketing Cookies</h3>
                <p className="text-[10px] text-foreground/55 leading-relaxed">Track visits to deliver relevant content and advertising.</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-[10px] text-accent hover:text-primary underline mb-4 transition-colors"
          >
            {showDetails ? "Hide details" : "Learn more"}
          </button>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleConsent("all")}
              className="w-full px-4 py-2 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Accept All
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => handleConsent("essential")}
                className="flex-1 px-3 py-2 border border-primary text-primary text-[10px] tracking-widest uppercase hover:bg-secondary transition-colors"
              >
                Essential
              </button>
              <button
                onClick={() => handleConsent("none")}
                className="flex-1 px-3 py-2 border border-border text-foreground/60 text-[10px] tracking-widest uppercase hover:bg-secondary transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground mt-3 leading-relaxed">
            <a href="#privacy" className="text-accent hover:text-primary underline">Privacy Policy</a>
          </p>
        </div>
        <div className="flex h-1">
          <div className="flex-1 bg-[#1C2B4A]" />
          <div className="flex-1 bg-background/60" />
          <div className="flex-1 bg-[#8B2020]" />
        </div>
      </div>
    </div>
  );
}
