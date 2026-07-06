import React from "react";
import { useListKnowledge } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Book, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/lib/language-context";

export default function Knowledge() {
  const [q, setQ] = React.useState("");
  const [category, setCategory] = React.useState<string>("");
  const [debouncedQ, setDebouncedQ] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedQ(q), 300);
    return () => clearTimeout(timer);
  }, [q]);

  const { data: articles, isLoading } = useListKnowledge({ q: debouncedQ, category: category || undefined });
  const { t } = useLanguage();

  const categories = [
  t.HR,
  t.IT,
  t.Finance,
  t.SecurityCategory,
  t.General,
];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Book className="w-6 h-6 text-primary" />
          {t.EnterpriseKnowledge}
        </h2>
        <p className="text-muted-foreground mt-1">{t.EnterpriseKnowledgeDescription}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder={t.SearchKnowledgePlaceholder} 
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9 h-12 bg-card/50 border-border/50 text-base"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={category === "" ? "default" : "outline"} 
          className="cursor-pointer hover:bg-primary/80 px-3 py-1 text-xs"
          onClick={() => setCategory("")}
        >
          {t.All}
        </Badge>
        {categories.map(c => (
          <Badge 
            key={c}
            variant={category === c ? "default" : "outline"} 
            className="cursor-pointer hover:bg-primary/80 px-3 py-1 text-xs"
            onClick={() => setCategory(c)}
          >
            {c}
          </Badge>
        ))}
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-4">{[1,2,3,4].map(i => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}</div>
        ) : articles?.length === 0 ? (
          <div className="text-center py-16 bg-card/30 rounded-xl border border-border/50 border-dashed">
            <Book className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground">{t.NoArticlesFound}</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {articles?.map((article) => (
              <AccordionItem key={article.id} value={article.id.toString()} className="border border-border/50 bg-card/50 rounded-xl px-4 data-[state=open]:bg-card/80 transition-colors">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex flex-col items-start text-left gap-1 w-full pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary hover:bg-primary/20">{article.category}</Badge>
                    </div>
                    <span className="font-semibold text-base">{article.title}</span>
                    <span className="text-sm text-muted-foreground font-normal line-clamp-1 mt-1">{article.summary}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 leading-relaxed border-t border-border/50 pt-4 mt-2">
                    {article.content}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
