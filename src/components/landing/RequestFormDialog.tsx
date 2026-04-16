import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface RequestFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceId?: string;
}

const RequestFormDialog = ({ open, onOpenChange, sourceId = "unknown" }: RequestFormDialogProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast({ title: "Заполните все поля", variant: "destructive" });
      return;
    }

    setLoading(true);
    console.log(`[analytics] form_submit | source: ${sourceId}`, form);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Заявка отправлена!", description: "Мы свяжемся с вами в ближайшее время." });
      setForm({ name: "", phone: "", email: "" });
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border" data-form-id={sourceId}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-foreground">Оставить заявку</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Имя</Label>
            <Input
              id="name"
              placeholder="Ваше имя"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              maxLength={100}
              className="bg-muted/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">Телефон</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              maxLength={20}
              className="bg-muted/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
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
