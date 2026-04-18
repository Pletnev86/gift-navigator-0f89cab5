import { useState, useId } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUtm } from "@/hooks/use-utm";
import { submitLead, type FormType } from "@/lib/analytics";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface RequestFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Уникальный ID кнопки/раздела — см. карту form_id в документации */
  sourceId?: string;
  /** Раздел лендинга: hero | footer | hr | trade | calendar */
  section?: string;
  /** Текст кнопки, которая открыла форму */
  buttonLabel?: string;
  /** Тип заявки */
  formType?: FormType;
}

const RequestFormDialog = ({
  open,
  onOpenChange,
  sourceId      = "unknown",
  section       = "unknown",
  buttonLabel   = "Оставить заявку",
  formType      = "purchase_request",
}: RequestFormDialogProps) => {
  const { toast } = useToast();
  const utm = useUtm();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const baseId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast({ title: "Заполните все поля", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await submitLead(
        {
          form_type:    formType,
          form_id:      sourceId,
          section,
          button_label: buttonLabel,
        },
        { name: form.name, phone: form.phone, email: form.email },
        utm
      );
      toast({
        title: "Заявка отправлена! ✅",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
      setForm({ name: "", phone: "", email: "" });
      onOpenChange(false);
    } catch (err) {
      console.error("[analytics] submitLead error:", err);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте ещё раз или напишите нам напрямую.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md bg-background border-border"
        data-form-id={sourceId}
        data-form-type={formType}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-foreground">
            {formType === "test_access"
              ? "Получить тестовый сертификат"
              : "Оставить заявку"}
          </DialogTitle>
          {formType === "test_access" && (
            <p className="text-sm text-muted-foreground mt-1">
              Заполните форму — мы пришлём тестовый сертификат на вашу почту автоматически.
            </p>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor={`${baseId}-name`} className="text-foreground">Имя</Label>
            <Input
              id={`${baseId}-name`}
              placeholder="Ваше имя"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              maxLength={100}
              className="bg-muted/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${baseId}-phone`} className="text-foreground">Телефон</Label>
            <Input
              id={`${baseId}-phone`}
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              maxLength={20}
              className="bg-muted/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${baseId}-email`} className="text-foreground">Email</Label>
            <Input
              id={`${baseId}-email`}
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              maxLength={255}
              className="bg-muted/50 border-border"
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            className="cta-btn w-full justify-center text-lg py-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Отправка..." : "Отправить"}
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestFormDialog;
