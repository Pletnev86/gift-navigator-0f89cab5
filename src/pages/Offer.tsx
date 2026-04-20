import { Separator } from "@/components/ui/separator";

const Offer = () => {
  return (
    <div className="min-h-screen bg-background border-border flex flex-col py-16 px-6 relative">
      {/* "Back" header */}
      <div className="container max-w-4xl mx-auto mb-8">
        <a href="/" className="text-muted-foreground hover:text-foreground transition-colors italic">
          &larr; Вернуться на главную
        </a>
      </div>

      <div className="container max-w-4xl mx-auto bg-card p-10 rounded-2xl shadow-xl border border-border">
        <h1 className="text-3xl md:text-5xl font-black mb-6 text-foreground italic">
          Договор оферты
        </h1>
        <Separator className="mb-8" />
        
        <div className="prose prose-invert prose-emerald max-w-none text-foreground/80 space-y-6">
          <p>
            Настоящий документ является публичной офертой. Здесь будет размещен полный текст договора 
            после того, как юристы предоставят окончательную версию.
          </p>
          <h2>1. Общие положения</h2>
          <p>
            1.1. Данный документ регулирует отношения между компанией и пользователем...
          </p>
          <p className="text-muted-foreground mt-12 text-sm">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offer;
