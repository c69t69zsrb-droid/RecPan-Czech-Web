import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "@/components/site/Logo";
import LanguageSwitcher from "@/components/site/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";

export default function Navigation({ onNavigate }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [hoveredTint, setHoveredTint] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: t("nav.home"), href: "#hero", tint: "bg-brand-green/[0.03]" },
    { label: t("nav.about"), href: "#about", tint: "bg-brand-green/[0.03]" },
    { label: t("nav.whyRecPan"), href: "#why-recpan", tint: "bg-brand-green/[0.05]" },
    { label: t("nav.expansion"), href: "#expansion", tint: "bg-brand-green/[0.05]" },
    { label: t("nav.materials"), href: "#materials", tint: "bg-brand-green/[0.05]" },
    { label: t("nav.process"), href: "#process", tint: "bg-brand-green/[0.05]" },
    { label: t("nav.career"), href: "/career", tint: "bg-brand-green/[0.03]", isRoute: true },
    { label: t("nav.news"), href: "/news", tint: "bg-brand-green/[0.03]", isRoute: true },
    { label: t("nav.contact"), href: "#contact", tint: "bg-brand-dark/[0.03]" },
  ];

  const handleSectionClick = (href) => {
    setOpen(false);
    if (location.pathname === "/" && onNavigate) {
      onNavigate(href);
    } else {
      navigate(`/${href}`);
    }
  };

  const handleRouteClick = (path) => {
    setOpen(false);
    navigate(path);
  };

  const handleLogoClick = () => {
    setOpen(false);
    if (location.pathname === "/" && onNavigate) {
      onNavigate("#hero");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between md:px-[4.166%] px-5">
        <a
          href="#hero"
          onClick={(e) => {e.preventDefault();handleLogoClick();}}>
          
          <Logo size="sm" />
        </a>
        <div className="flex items-center gap-6">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 text-xs font-heading font-medium uppercase tracking-[0.15em] text-obsidian hover:text-brand-green transition-colors">
            
            {t("nav.menu")} <Menu size={16} />
          </button>
        </div>
      </header>

      {/* Drawer */}
      <AnimatePresence>
        {open &&
        <>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-obsidian/10"
            onClick={() => setOpen(false)} />
          
            {hoveredTint &&
          <div className={`fixed inset-0 z-50 pointer-events-none transition-colors duration-500 ${hoveredTint}`} />
          }
            <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[85%] md:w-[30%] bg-titanium z-50 flex flex-col justify-between p-8 md:p-12 border-l border-obsidian/10 overflow-y-auto">
            
              <div className="flex items-center justify-between">
                <Logo size="sm" />
                <button
                onClick={() => setOpen(false)}
                className="text-obsidian/40 hover:text-obsidian transition-colors">
                
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-4 md:gap-5">
                {navLinks.map((link) =>
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (link.isRoute) {
                    handleRouteClick(link.href);
                  } else {
                    handleSectionClick(link.href);
                  }
                }}
                onMouseEnter={() => setHoveredTint(link.tint)}
                onMouseLeave={() => setHoveredTint(null)}
                className="font-heading text-xl md:text-2xl font-medium tracking-[-0.02em] text-obsidian hover:text-brand-green transition-colors duration-300">
                
                    {link.label}
                  </a>
              )}
              </nav>

              <div className="flex flex-col gap-4">
                <LanguageSwitcher />
                <div className="font-heading text-[10px] text-obsidian/30 uppercase tracking-[0.2em]">
                  {t("nav.copyright")}
                </div>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </>);

}