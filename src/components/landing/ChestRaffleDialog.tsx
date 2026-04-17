import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUtm } from "@/hooks/use-utm";
import { submitLead } from "@/lib/analytics";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import catChest from "@/assets/cat-chest.png";

interface ChestRaffleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Уникальный ID кнопки/раздела */
  sourceId?: string;
  /** Раздел лендинга */
  section?: string;
}

const ChestRaffleDialog = ({
  open,
  onOpenChange,
  sourceId = "footer-chest-raffle",
  section  = "footer",
}: ChestRaffleDialogProps) => {
  const { toast } = useToast();
  const utm = useUtm();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);

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
          form_type:    "test_access",
          form_id:      sourceId,
          section,
          button_label: "Собрать мою витрину",
        },
        { name: form.name, phone: form.phone, email: form.email },
        utm
      );
      toast({
        title: "🎉 Заявка принята!",
        description: "Тестовый сертификат придёт на вашу почту автоматически.",
      });
      setForm({ name: "", phone: "", email: "" });
      onOpenChange(false);
    } catch (err) {
      console.error("[analytics] ChestRaffle submitLead error:", err);
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
        data-form-type="test_access"
      >
        <DialogHeader>
          <div className="flex items-center gap-3">
            <img src={catChest} alt="Кот с сундуком" className="w-16 h-16 object-contain" />
            <div>
              <DialogTitle className="text-2xl font-black text-foreground">
                Тестовый сертификат
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Заполните форму — сертификат придёт на почту автоматически.
              </p>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          <div className="space-y-2">
            <Label htmlFor="raffle-name" className="text-foreground">Имя</Label>
            <Input
              id="raffle-name"
              placeholder="Ваше имя"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              maxLength={100}
              className="bg-muted/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="raffle-phone" className="text-foreground">Телефон</Label>
            <Input
              id="raffle-phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              maxLength={20}
              className="bg-muted/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="raffle-email" className="text-foreground">Email</Label>
            <Input
              id="raffle-email"
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
            className="inline-flex items-center gap-3 rounded-2xl px-10 py-4 font-heading font-bold text-lg tracking-wide transition-all duration-300 text-foreground w-full justify-center"
            style={{ background: "linear-gradient(135deg, hsl(40, 85%, 55%), hsl(30, 90%, 50%))" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Отправка..." : "Получить тестовый сертификат"}
            <Gift className="w-5 h-5" />
          </motion.button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChestRaffleDialog;
