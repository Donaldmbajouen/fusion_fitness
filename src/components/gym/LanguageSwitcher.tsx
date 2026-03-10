import { useTranslation, Language } from "@/lib/i18n";

const LanguageSwitcher = () => {
  const { lang, setLang } = useTranslation();

  return (
    <div className="flex items-center border border-border overflow-hidden">
      {(["fr", "en"] as Language[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1 font-body text-[10px] tracking-widest uppercase transition-all duration-300 ${
            lang === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
