import { ArrowLeft, ArrowUpRight, BookOpen, CheckCircle2, ChevronRight, Code2, FileText, Layers3, ShieldCheck } from "lucide-react";
import { products, getCategoryColor, getStatusColor } from "@/data/products";

const principles = [
  { icon: ShieldCheck, title: "Evidence ready", body: "Outputs are structured for traceability, review, and accountable use rather than hype." },
  { icon: Layers3, title: "Interoperable", body: "Products can stand alone while sharing a common portfolio architecture and operating language." },
  { icon: Code2, title: "Build focused", body: "Every asset has a concrete readiness state and a next gate instead of an open ended roadmap." },
];

function ProductDoc({ id }: { id: string }) {
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Documentation</p>
          <h1 className="mt-3 text-2xl font-bold">Document not found</h1>
          <a href="/docs" className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary"><ArrowLeft className="h-4 w-4" /> Back to docs</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
          <a href="/docs" className="inline-flex items-center gap-2 text-sm font-semibold"><ArrowLeft className="h-4 w-4" /> Crown Labs Docs</a>
          <a href="/" className="text-xs text-muted-foreground hover:text-foreground">Back to Crown Labs</a>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-10">
          <aside className="hidden lg:block">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Portfolio</p>
            <nav className="space-y-1">
              {products.map((item) => (
                <a key={item.id} href={`/docs/${item.id}`} className={`block px-3 py-2 rounded-md text-xs ${item.id === product.id ? "bg-card text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`}>
                  {item.name}
                </a>
              ))}
            </nav>
          </aside>

          <article className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(product.status)}`}>{product.status}</span>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${getCategoryColor(product.category)}`}>{product.category}</span>
            </div>
            <p className="text-xs uppercase tracking-widest text-primary">Product documentation</p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">{product.name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
              <div className="rounded-lg border border-border bg-card p-4"><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Readiness</p><p className="mt-2 font-semibold">{product.status}</p></div>
              <div className="rounded-lg border border-border bg-card p-4"><p className="text-[10px] uppercase tracking-widest text-muted-foreground">As is value</p><p className="mt-2 font-semibold">{product.valuationAsIs}</p></div>
              <div className="rounded-lg border border-border bg-card p-4"><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Projected value</p><p className="mt-2 font-semibold">{product.valuationProjected}</p></div>
              <div className="rounded-lg border border-border bg-card p-4"><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Trend</p><p className="mt-2 font-semibold">{product.trend}</p></div>
            </div>

            <section className="mt-12">
              <h2 className="text-2xl font-bold">Capabilities</h2>
              <div className="mt-5 grid gap-3">
                {product.features.map((feature) => <div key={feature} className="rounded-lg border border-border bg-card p-4 flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><p className="text-sm leading-relaxed">{feature}</p></div>)}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold">Metrics</h2>
              <div className="mt-5 grid sm:grid-cols-3 gap-3">
                {product.metrics.map((metric) => <div key={metric.label} className="rounded-lg border border-border bg-card p-5"><p className="text-2xl font-bold">{metric.value}</p><p className="mt-1 text-xs text-muted-foreground">{metric.label}</p></div>)}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold">Next gate</h2>
              <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 p-5"><p className="text-sm leading-relaxed">{product.nextGate}</p></div>
            </section>

            <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <a href="/docs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> All documentation</a>
              <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Return to product portfolio <ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}

export default function DocsPage({ slug }: { slug?: string }) {
  if (slug) return <ProductDoc id={slug} />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
          <a href="/" className="font-semibold tracking-tight">Crown Labs <span className="text-muted-foreground font-normal">Documentation</span></a>
          <a href="/" className="text-xs text-muted-foreground hover:text-foreground">Back to Crown Labs</a>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Canonical documentation</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">The operating record for Crown Labs.</h1>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">A product focused documentation experience inspired by the clarity of modern Fumadocs and Geist style documentation systems. The navigation, status language, and product records are driven from the same source used by the landing page.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {principles.map(({ icon: Icon, title, body }) => <div key={title} className="rounded-xl border border-border bg-card p-6"><Icon className="h-5 w-5 text-primary" /><h2 className="mt-4 text-sm font-semibold">{title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p></div>)}
        </div>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-widest text-muted-foreground">Product docs</p><h2 className="mt-2 text-2xl font-bold">Browse the portfolio documentation</h2></div><span className="text-xs text-muted-foreground">{products.length} records</span></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {products.map((product) => (
              <a key={product.id} href={`/docs/${product.id}`} className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between gap-3"><BookOpen className="h-5 w-5 text-primary" /><ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /></div>
                <h3 className="mt-6 font-semibold">{product.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{product.description}</p>
                <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground"><FileText className="h-3.5 w-3.5" /> {product.status} · {product.category}</div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
