import React, { createContext, useState, useContext, ReactNode } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

type LanguageProviderProps = {
  children: ReactNode;
  initialState?: string;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialState = "en",
}) => {
  const [language, setLanguage] = useState<string>(initialState);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
