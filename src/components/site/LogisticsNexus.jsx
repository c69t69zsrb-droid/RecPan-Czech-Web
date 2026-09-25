import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { buildPath } from "@/lib/i18n/routes";

const initialFormData = { name: "", company: "", email: "", phone: "", volume: "", quantity: "", location: "", country: "", panelTypeField: "", timeline: "", notes: "" };

export default function LogisticsNexus({ enquiryIntent }) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orgType, setOrgType] = useState("");
  const [panelType, setPanelType] = useState("");
  const [enquiryType, setEnquiryType] = useState("general");
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (enquiryIntent === "takeback") setEnquiryType("takeback");
  }, [enquiryIntent]);

  const orgTypes = t("form.orgTypes");
  const panelTypes = t("form.panelTypes");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !isValidEmail(formData.email)) {
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(
        "https://base44.app/api/apps/6a42ca6def2b3fde835b3720/functions/sendEnquiryEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            orgType,
            panelType,
            enquiryType: enquiryType === "takeback" ? t("form.enquiryTakeback") : t("form.enquiryGeneral"),
            name: formData.name,
            company: formData.company,
            email: formData.email,
            phone: formData.phone,
            volume: formData.volume,
            quantity: formData.quantity,
            location: formData.location,
            country: formData.country,
            panelTypeField: formData.panelTypeField,
            timeline: formData.timeline,
            notes: formData.notes,
          }),
        }
      );

      const responseText = await response.text();

      let result;
      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        result = { raw: responseText };
      }

      if (!response.ok || result?.success !== true) {
        const rawError =
          result?.error ||
          result?.details ||
          result?.message ||
          result?.raw ||
          `Email delivery failed with HTTP ${response.status}`;

        throw new Error(
          typeof rawError === "string"
            ? rawError
            : JSON.stringify(rawError)
        );
      }
      setFormData(initialFormData);
      setOrgType("");
      setPanelType("");
      setEnquiryType("general");
      setConsent(false);
      setStep(1);
      setStatus("success");
    } catch (e) {
      console.error("Enquiry submission failed:", e);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="snap-section relative min-h-0 flex items-center justify-center pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-brand-green" />
          </div>
          <h2 className="font-heading text-3xl font-semibold tracking-[-0.02em] text-obsidian mb-4">
            {t("form.successTitle")}
          </h2>
          <p className="font-heading text-sm text-obsidian/50 leading-relaxed font-light">
            {t("form.successDesc")}
          </p>
        </motion.div>
      </section>
    );
  }

  const fields = [
    { key: "name", label: t("form.contactName"), placeholder: t("form.contactNamePlaceholder"), type: "text" },
    { key: "company", label: t("form.company"), placeholder: t("form.companyPlaceholder"), type: "text" },
    { key: "email", label: t("form.email"), placeholder: t("form.emailPlaceholder"), type: "email" },
    { key: "phone", label: t("form.phone"), placeholder: t("form.phonePlaceholder"), type: "tel" },
    { key: "volume", label: t("form.volume"), placeholder: t("form.volumePlaceholder"), type: "text" },
    { key: "quantity", label: t("form.quantity"), placeholder: t("form.quantityPlaceholder"), type: "text" },
    { key: "location", label: t("form.location"), placeholder: t("form.locationPlaceholder"), type: "text" },
    { key: "country", label: t("form.country"), placeholder: t("form.countryPlaceholder"), type: "text" },
    { key: "timeline", label: t("form.timeline"), placeholder: t("form.timelinePlaceholder"), type: "text" },
  ];

  return (
    <section id="contact" className="snap-section relative min-h-0 flex flex-col justify-center pl-10 pr-6 md:pl-[calc(4.166%_+_1rem)] md:pr-[4.166%] py-6">
      <div className="max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">
            {t("form.label")}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-obsidian mb-12">
            {t("form.title")}
          </h2>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-heading text-xs transition-colors duration-300 ${
                step >= s ? "bg-brand-green text-white" : "bg-obsidian/5 text-obsidian/30"
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-[1px] transition-colors duration-300 ${step > s ? "bg-brand-green" : "bg-obsidian/10"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Org Type */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-obsidian/30 mb-3">
              {t("form.enquiryType")}
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { key: "general", label: t("form.enquiryGeneral") },
                { key: "takeback", label: t("form.enquiryTakeback") }].
              map((opt) =>
              <button
                key={opt.key}
                onClick={() => setEnquiryType(opt.key)}
                className={`font-heading text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-full transition-all duration-300 ${
                enquiryType === opt.key ? "bg-brand-green text-white" : "bg-obsidian/5 text-obsidian/50 hover:text-obsidian hover:bg-obsidian/10"}`
                }>
                
                  {opt.label}
                </button>
              )}
            </div>

            <p className="font-heading text-xs uppercase tracking-[0.15em] text-obsidian/40 mb-6">
              {t("form.iAm")}
            </p>
            <div className="space-y-3">
              {orgTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => { setOrgType(type); setStep(2); }}
                  className={`w-full text-left px-6 py-5 border-b border-obsidian/10 font-heading text-lg md:text-xl font-medium tracking-[-0.01em] hover:text-brand-green hover:border-brand-green transition-all duration-300 ${
                    orgType === type ? "text-brand-green border-brand-green" : "text-obsidian"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Panel Type */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-heading text-xs uppercase tracking-[0.15em] text-obsidian/40 mb-6">
              {t("form.panelType")}
            </p>
            <div className="space-y-3">
              {panelTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => { setPanelType(type); setStep(3); }}
                  className={`w-full text-left px-6 py-5 border-b border-obsidian/10 font-heading text-lg md:text-xl font-medium tracking-[-0.01em] hover:text-brand-green hover:border-brand-green transition-all duration-300 ${
                    panelType === type ? "text-brand-green border-brand-green" : "text-obsidian"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="font-heading text-[10px] uppercase tracking-[0.15em] text-obsidian/30 mt-6 hover:text-obsidian transition-colors">
              {t("form.back")}
            </button>
          </motion.div>
        )}

        {/* Step 3: Contact Details */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex gap-2 font-heading text-[10px] uppercase tracking-[0.15em] text-obsidian/30 mb-8">
              <span className="text-brand-green">{orgType}</span>
              <span>→</span>
              <span className="text-brand-green">{panelType}</span>
            </div>

            <div className="space-y-8">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="font-heading text-[10px] uppercase tracking-[0.2em] text-obsidian/30 block mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full bg-transparent border-b border-obsidian/20 focus:border-brand-green outline-none pb-3 font-heading text-lg font-medium text-obsidian placeholder:text-obsidian/15 transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="font-heading text-[10px] uppercase tracking-[0.2em] text-obsidian/30 block mb-2">
                  {t("form.panelTypeField")}
                </label>
                <select
                  value={formData.panelTypeField}
                  onChange={(e) => setFormData({ ...formData, panelTypeField: e.target.value })}
                  className="w-full bg-transparent border-b border-obsidian/20 focus:border-brand-green outline-none pb-3 font-heading text-lg font-medium text-obsidian transition-colors">
                  
                  <option value="">—</option>
                  {t("form.panelTypeOptions").map((opt) =>
                  <option key={opt} value={opt}>{opt}</option>
                  )}
                </select>
              </div>

              <div>
                <label className="font-heading text-[10px] uppercase tracking-[0.2em] text-obsidian/30 block mb-2">
                  {t("form.notes")}
                </label>
                <textarea
                  placeholder={t("form.notesPlaceholder")}
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-transparent border-b border-obsidian/20 focus:border-brand-green outline-none pb-3 font-heading text-lg font-medium text-obsidian placeholder:text-obsidian/15 transition-colors resize-none"
                />
              </div>
            </div>

            {status === "error" && (
              <div role="alert" className="flex items-start gap-3 mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="font-heading text-sm text-red-700 leading-relaxed">
                  {t("form.errorDesc")}
                </p>
              </div>
            )}
            <div className="flex items-center gap-6 mt-10">
              <button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || !isValidEmail(formData.email) || !consent || status === "sending"}
                className="group flex items-center gap-3 bg-brand-green text-white px-8 py-4 font-heading text-xs font-medium uppercase tracking-[0.15em] hover:bg-obsidian transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-lg"
              >
                {status === "sending" ? (
                  <>
                    {t("form.sending")}
                    <Loader2 size={14} className="animate-spin" />
                  </>
                ) : (
                  <>
                    {t("form.submit")}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <button onClick={() => setStep(2)} className="font-heading text-[10px] uppercase tracking-[0.15em] text-obsidian/30 hover:text-obsidian transition-colors">
                {t("form.back")}
              </button>
            </div>

            <p className="font-heading text-sm text-obsidian/50 font-light mt-8">
              {t("form.responseNote")}
            </p>

            <label className="flex items-start gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-brand-green cursor-pointer" />
              
              <span className="font-heading text-xs text-obsidian/50 leading-relaxed">
                {t("form.consent")}{" "}
                <a
                  href={buildPath("privacy", language)}
                  onClick={(e) => {e.preventDefault();navigate(buildPath("privacy", language));}}
                  className="text-brand-green underline underline-offset-2 hover:text-obsidian transition-colors">
                  
                  {t("form.consentLink")}
                </a>.
              </span>
            </label>
          </motion.div>
        )}
      </div>
    </section>
  );
}