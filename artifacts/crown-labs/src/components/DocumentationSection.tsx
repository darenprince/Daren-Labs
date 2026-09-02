import { BookOpen, ArrowRight, FileText, ShieldCheck, Layers3, ChevronRight } from "lucide-react";
import { products } from "@/data/products";

const foundations = [
  { icon: Layers3, title: "Portfolio Architecture", description: "Canonical product inventory, category boundaries, readiness definitions, and next gates." },
  { icon: FileText, title: "Product Documentation", description: "Each product record is tied to its purpose, capabilities, valuation range, readiness, and execution milestone." },
  { icon: ShieldCheck, title: "Operating Principles", description: "Evidence-ready outputs, privacy-conscious design, accountable intelligence, and explicit ethical guardrails." },
];

export default function DocumentationSection() {
  return (
    <section id="documentation" className="scroll-mt-20 py-20 px-4 sm:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">Canonical Documentation</p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-foreground">One system of record for the portfolio.</h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed">The landing experience and documentation describe the same portfolio, use the same readiness language, and point back to the same source of truth.</p>
          </div>
          <a href="/docs" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">Open documentation <ArrowRight className="h-4 w-4" /></a>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {foundations.map(({ icon: Icon, title, description }) => <div key={title} className="rounded-xl border border-border bg-card p-5"><Icon className="h-5 w-5 text-primary mb-4" /><h3 className="text-sm font-semibold text-foreground">{title}</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p></div>)}
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border"><BookOpen className="h-4 w-4 text-primary" /><div><p className="text-sm font-semibold text-foreground">Documented product index</p><p className="text-xs text-muted-foreground">{products.length} canonical portfolio records</p></div></div>
          <div className="divide-y divide-border">
            {products.map((product) => <a key={product.id} href={`/docs/${product.id}`} className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] px-5 py-4 hover:bg-background/40 transition-colors group">
              <div><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-semibold text-foreground">{product.name}</h3><span className="text-[10px] uppercase tracking-widest text-muted-foreground">{product.category}</span></div><p className="mt-1 text-xs text-muted-foreground leading-relaxed">{product.description}</p></div>
              <div className="flex items-center gap-3 text-left md:text-right"><div><p className="text-xs font-semibold text-foreground">{product.status}</p><p className="mt-1 text-[11px] text-muted-foreground">Read product documentation</p></div><ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /></div>
            </a>)}
          </div>
        </div>
      </div>
    </section>
  );
}
