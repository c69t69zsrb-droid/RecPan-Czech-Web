import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FooterLogo from "@/components/site/FooterLogo";
import { useTonnesCounter } from "@/hooks/useTonnesCounter";
import { useLanguage } from "@/hooks/useLanguage";
import { buildPath, parsePath } from "@/lib/i18n/routes";

export default function DataFooter({ onNavigate }) {
  const { t, language } = useLanguage();
  const tonnes = useTonnesCounter();
  const location = useLocation();
  const navigate = useNavigate();
  const locale = language === "cs" ? "cs-CZ" : "en-US";

  const handleNav = (href) => {
    const { route } = parsePath(location.pathname);
    if (route === "home" && onNavigate) {
      onNavigate(href);
    } else {
      navigate(`${buildPath("home", language)}${href}`);
    }
  };

  const fmt = (val) => val.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const impactData = [
  { label: t("footer.tonnesRecycled"), value: tonnes },
  { label: t("footer.glass"), value: tonnes * 0.76 },
  { label: t("footer.aluminum"), value: tonnes * 0.08 },
  { label: t("footer.silicon"), value: tonnes * 0.05 },
  { label: t("footer.copper"), value: tonnes * 0.01 },
  { label: t("footer.co2"), value: tonnes * 2.2 }];


  const navLinks = [
  { label: t("nav.materials"), href: "#materials" },
  { label: t("nav.process"), href: "#process" },
  { label: t("nav.about"), href: "#about" },
  { label: t("nav.contact"), href: "#contact" }];


  const legalLinks = [
  t("footer.privacy"),
  t("footer.terms"),
  t("footer.sustainability")];


  return (
    <footer className="relative bg-obsidian text-titanium pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%] py-6 md:py-9">
      {/* Impact metrics */}
      <div className="mb-16 md:mb-24">
        <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-titanium/70 mb-8">
          {t("footer.impactLabel")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          {impactData.map((item) =>
          <div key={item.label}>
              <p className="font-heading text-[9px] uppercase tracking-[0.25em] text-titanium/70 mb-2">
                {item.label}
              </p>
              <p className="font-heading text-xl md:text-2xl font-bold text-brand-green tracking-tight">
                {fmt(item.value)} t
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main footer content */}
      <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-0">
        {/* Left: contact + brand */}
        <div className="flex flex-col justify-between">
          <div className="font-heading text-[10px] text-titanium/80 tracking-[0.1em] space-y-1">
            <p>RecPan s.r.o.</p>
            <p>Petrská 1166/33, 110 00 Prague 1, Czech Republic</p>
            <p>
              <a href="mailto:office@rec-pan.cz" className="hover:text-brand-green transition-colors">office@rec-pan.cz</a>{" "}
              <a href="tel:+420730445454" className="hover:text-brand-green transition-colors">+420 730 445 454</a>
            </p>
            <p>www.rec-pan.eu</p>
            <p>IČO: 23695781, DIČ: CZ23695781</p>
          </div>
          <FooterLogo />
        </div>

        {/* Center: links */}
        <div className="flex gap-12">
          <div className="space-y-3">
            <p className="font-heading text-[9px] uppercase tracking-[0.25em] text-titanium/30 mb-2">{t("footer.navLabel")}</p>
            {navLinks.map((link) => <a
              key={link.href}
              href={link.href}
              onClick={(e) => {e.preventDefault();handleNav(link.href);}}
              className="block font-heading text-xs text-titanium/40 hover:text-brand-green transition-colors">
              
                {link.label}
              </a>
            )}
          </div>
          <div className="space-y-3">
            <p className="font-heading text-[9px] uppercase tracking-[0.25em] text-titanium/30 mb-2">{t("footer.legalLabel")}</p>
            {legalLinks.map((label) =>
            <a key={label} href="#hero" rel="nofollow" onClick={(e) => {e.preventDefault();handleNav("#hero");}} className="block font-heading text-xs text-titanium/40 hover:text-brand-green transition-colors">
                {label}
              </a>
            )}
          </div>
        </div>

        {/* Right: CTA */}
        <div>
          <button
            onClick={() => handleNav("#contact")}
            className="group flex items-center gap-3 bg-brand-green text-white px-8 py-5 font-heading text-xs font-medium uppercase tracking-[0.15em] hover:bg-titanium hover:text-obsidian transition-colors rounded-lg">
            
            {t("footer.cta")}
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-16 md:mt-24 pt-6 border-t border-titanium/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-titanium/15">
          {t("footer.copyright")}
        </p>
        <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-titanium/15">
          {t("footer.tagline")}
        </p>
      </div>
    </footer>);
}