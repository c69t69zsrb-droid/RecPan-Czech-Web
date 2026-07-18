import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, AlertCircle, Loader2, Upload, X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useLanguage } from "@/hooks/useLanguage";
import { careerPositions } from "@/data/careerPositions";

export default function ApplicationForm({ selectedPosition }) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    intro: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [cvFileName, setCvFileName] = useState("");
  const [status, setStatus] = useState("idle");
  const fileInputRef = useRef(null);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (selectedPosition) {
      setFormData((prev) => ({ ...prev, position: selectedPosition }));
    }
  }, [selectedPosition]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setCvFileName(file.name);
    }
  };

  const handleRemoveFile = () => {
    setCvFile(null);
    setCvFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !isValidEmail(formData.email)) return;
    setStatus("sending");
    try {
      let cvUrl = "";
      if (cvFile) {
        const uploadRes = await base44.integrations.Core.UploadFile({ file: cvFile });
        cvUrl = uploadRes?.file_url || "";
      }
      const res = await base44.functions.invoke("sendCareerApplication", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        intro: formData.intro,
        cvUrl,
      });
      if (res?.data?.success !== true) {
        throw new Error(res?.data?.error || "Application submission failed");
      }
      setFormData({ firstName: "", lastName: "", email: "", phone: "", position: "", intro: "" });
      handleRemoveFile();
      setStatus("success");
    } catch (e) {
      console.error("Career application failed:", e);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto py-16"
      >
        <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-brand-green" />
        </div>
        <h2 className="font-heading text-3xl font-semibold tracking-[-0.02em] text-obsidian mb-4">
          {t("career.formSuccessTitle")}
        </h2>
        <p className="font-heading text-sm text-obsidian/50 leading-relaxed font-light">
          {t("career.formSuccessDesc")}
        </p>
      </motion.div>
    );
  }

  const fields = [
    { key: "firstName", label: t("career.formFirstName"), placeholder: t("career.formFirstNamePlaceholder"), type: "text" },
    { key: "lastName", label: t("career.formLastName"), placeholder: t("career.formLastNamePlaceholder"), type: "text" },
    { key: "email", label: t("career.formEmail"), placeholder: t("career.formEmailPlaceholder"), type: "email" },
    { key: "phone", label: t("career.formPhone"), placeholder: t("career.formPhonePlaceholder"), type: "tel" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-10">
        <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-obsidian/30 mb-3">
          {t("career.applyLabel")}
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-obsidian">
          {t("career.applyTitle")}
        </h2>
      </div>

      <div className="space-y-8">
        {/* First name + Last name side by side */}
        <div className="grid md:grid-cols-2 gap-8">
          {fields.slice(0, 2).map((field) => (
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
        </div>

        {fields.slice(2).map((field) => (
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

        {/* Position */}
        <div>
          <label className="font-heading text-[10px] uppercase tracking-[0.2em] text-obsidian/30 block mb-2">
            {t("career.formPosition")}
          </label>
          <input
            type="text"
            list="position-list"
            placeholder={t("career.formPositionPlaceholder")}
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full bg-transparent border-b border-obsidian/20 focus:border-brand-green outline-none pb-3 font-heading text-lg font-medium text-obsidian placeholder:text-obsidian/15 transition-colors"
          />
          <datalist id="position-list">
            {careerPositions.map((pos) => (
              <option key={pos.id} value={pos.title[language]} />
            ))}
          </datalist>
        </div>

        {/* Short intro */}
        <div>
          <label className="font-heading text-[10px] uppercase tracking-[0.2em] text-obsidian/30 block mb-2">
            {t("career.formIntro")}
          </label>
          <textarea
            placeholder={t("career.formIntroPlaceholder")}
            rows={3}
            value={formData.intro}
            onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
            className="w-full bg-transparent border-b border-obsidian/20 focus:border-brand-green outline-none pb-3 font-heading text-lg font-medium text-obsidian placeholder:text-obsidian/15 transition-colors resize-none"
          />
        </div>

        {/* CV upload */}
        <div>
          <label className="font-heading text-[10px] uppercase tracking-[0.2em] text-obsidian/30 block mb-2">
            {t("career.formCv")}
          </label>
          {!cvFileName ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border border-dashed border-obsidian/20 rounded-lg py-6 flex items-center justify-center gap-2 font-heading text-sm text-obsidian/40 hover:text-brand-green hover:border-brand-green transition-all duration-300"
            >
              <Upload size={16} />
              {t("career.formCvHint")}
            </button>
          ) : (
            <div className="flex items-center justify-between border border-obsidian/10 rounded-lg py-4 px-6">
              <div className="flex items-center gap-3">
                <Check size={16} className="text-brand-green shrink-0" />
                <span className="font-heading text-sm text-obsidian truncate">{cvFileName}</span>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-obsidian/30 hover:text-obsidian transition-colors shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {status === "error" && (
        <div className="flex items-start gap-3 mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
          <p className="font-heading text-sm text-red-700 leading-relaxed">
            {t("career.formErrorDesc")}
          </p>
        </div>
      )}

      <div className="mt-10">
        <button
          onClick={handleSubmit}
          disabled={
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !isValidEmail(formData.email) ||
            status === "sending"
          }
          className="group flex items-center gap-3 bg-brand-green text-white px-8 py-4 font-heading text-xs font-medium uppercase tracking-[0.15em] hover:bg-obsidian transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-lg"
        >
          {status === "sending" ? (
            <>
              {t("career.formSending")}
              <Loader2 size={14} className="animate-spin" />
            </>
          ) : (
            <>
              {t("career.formSubmit")}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}