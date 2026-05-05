import { createContext, useContext, useState, type ReactNode } from "react";
import type { FormType } from "@/lib/analytics";

interface FormContextValue {
  formType: FormType | null;
  openForm: (type: FormType) => void;
  closeForm: () => void;
}

const FormContext = createContext<FormContextValue>({
  formType: null,
  openForm: () => {},
  closeForm: () => {},
});

export function FormProvider({ children }: { children: ReactNode }) {
  const [formType, setFormType] = useState<FormType | null>(null);

  return (
    <FormContext.Provider
      value={{
        formType,
        openForm: setFormType,
        closeForm: () => setFormType(null),
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export const useFormContext = () => useContext(FormContext);
