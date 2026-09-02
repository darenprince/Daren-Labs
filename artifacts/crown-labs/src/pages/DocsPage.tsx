import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, CheckCircle2, ChevronRight, Code2, FileText, Layers3, Search, ShieldCheck, TrendingUp } from "lucide-react";
import { products, getCategoryColor, getStatusColor } from "@/data/products";

const principles = [
  { icon: ShieldCheck, title: "Evidence ready", body: "Outputs are structured for traceability, review, and accountable use rather than hype." },
  { icon: Layers3, title: "Interoperable", body: "Products can stand alone while sharing a common portfolio architecture and operating language." },
  { icon: Code2, title: "Build focused", body: "Every asset has a concrete readiness state and a next gate instead of an open ended roadmap." },
];

function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
          <a href="/docs" className="flex items-center gap-3" aria-label="Crown Labs documentation">
            <img src="/logo.png" alt="Crown Labs" className="h-8 w-auto" />
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase">Crown Labs</p>
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground">Documentation</p>
            </div>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
            Back to Crown Labs <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>
      {children}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">Crown Labs · Canonical documentation</p>
          <a href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Portfolio home</a>
        </div>
      </footer>
    </div>
  );
}

function ProductDoc({ id }: { id: string }) {
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <DocsShell>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Documentation</p>
          <h1 className="mt-3 text-3xl font-bold">Document not found</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">This route does not map to a canonical Crown Labs portfolio record.</p>
          <a href="/docs" className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold"><ArrowLeft className="h-4 w-4" /> Back to docs</a>
        </main>
      </DocsShell>
    );
  }

  const index = products.findIndex((item) => item.id === product.id);
  const previous = products[index - 1];
  const next = products[index + 1];

  return (
    <DocsShell>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[230px_minmax(0,1fr)] gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <a href="/docs" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-5"><ArrowLeft className="h-3.5 w-3.5" /> All documentation</a>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Products</p>
              <nav className="space-y-1">
                {products.map((item) => (
                  <a key={item.id} href={`/docs/${item.id}`} className={`block px-3 py-2 rounded-md text-xs transition-colors ${item.id === product.id ? "bg-card text-foreground border border-border" : "text-muted-foreground hover:text-foreground hover:bg-card/50"}`}>
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="min-w-0">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(product.status)}`}>{product.status}</span>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${getCategoryColor(product.category)}`}>{product.category}</span>
            </div>

            <p className="text-xs uppercase tracking-widest text-primary">Product documentation</p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">{product.name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
              {[
                ["Readiness", product.status],
                ["As is value", product.valuationAsIs],
                ["Projected value", product.valuationProjected],
                ["Trend", product.trend],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border bg-card p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
                  <p className="mt-2 font-semibold">{value}</p>
                </div>
              ))}
            </div>

            <section className="mt-12">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground leading-relaxed">
                This canonical record defines {product.name} within the Crown Labs portfolio: its role, readiness, capabilities, operating metrics, valuation context, and next execution gate.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold">Capabilities</h2>
              <div className="mt-5 grid gap-3">
                {product.features.map((feature) => (
                  <div key={feature} className="rounded-lg border border-border bg-card p-4 flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold">Operating metrics</h2>
              <div className="mt-5 grid sm:grid-cols-3 gap-3">
                {product.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-lg border border-border bg-card p-5">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold">Readiness & next gate</h2>
              <div className="mt-5 rounded-xl border border-primary/25 bg-primary/5 p-5">
                <div className="flex items-center gap-2"><CircleDot className="h-4 w-4 text-primary" /><p className="text-sm font-semibold">{product.status}</p></div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.nextGate}</p>
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold">Valuation context</h2>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground leading-relaxed">
                These portfolio ranges are directional positioning figures, not audited financial statements or guarantees. They are maintained alongside the portfolio readiness state.
              </p>
              <div className="mt-5 grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-border bg-card p-4"><p className="text-[10px] uppercase tracking-widest text-muted-foreground">As is</p><p className="mt-2 text-lg font-bold">{product.valuationAsIs}</p></div>
                <div className="rounded-lg border border-border bg-card p-4"><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Projected</p><p className="mt-2 text-lg font-bold">{product.valuationProjected}</p></div>
                <div className="rounded-lg border border-border bg-card p-4"><div className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-green-400" /><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Trend</p></div><p className="mt-2 text-lg font-bold">{product.trend}</p></div>
              </div>
            </section>

            <div className="mt-14 pt-8 border-t border-border flex items-center justify-between gap-4">
              {previous ? <a href={`/docs/${previous.id}`} className="text-xs text-muted-foreground hover:text-foreground"><span className="block text-[10px] uppercase tracking-widest mb-1">Previous</span>{previous.name}</a> : <span />}
              <a href="/#portfolio" className="inline-flex items-center gap-2 text-xs font-semibold text-primary">Return to portfolio <ArrowUpRight className="h-3.5 w-3.5" /></a>
              {next ? <a href={`/docs/${next.id}`} className="text-xs text-right text-muted-foreground hover:text-foreground"><span className="block text-[10px] uppercase tracking-widest mb-1">Next</span>{next.name}</a> : <span />}
            </div>
          </article>
        </div>
      </main>
    </DocsShell>
  );
}

function CircleDot({ className }: { className?: string }) {
  return <span className={`inline-block rounded-full border-2 border-current ${className ?? ""}`} />;
}

export default function DocsPage({ slug }: { slug?: string }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery = !q || [product.name, product.description, product.category, product.status].join(" ").toLowerCase().includes(q);
      return matchesQuery && (status === "All" || product.status === status) && (category === "All" || product.category === category);
    });
  }, [query, status, category]);

  if (slug) return <ProductDoc id={slug} />;

  return (
    <DocsShell>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Canonical documentation</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">The operating record for Crown Labs.</h1>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">Browse the same product inventory, readiness states, metrics, valuation context, and next gates that power the public portfolio.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {principles.map(({ icon: Icon, title, body }) => <div key={title} className="rounded-xl border border-border bg-card p-6"><Icon className="h-5 w-5 text-primary" /><h2 className="mt-4 text-sm font-semibold">{title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p></div>)}
        </div>

        <section className="mt-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div><p className="text-xs uppercase tracking-widest text-muted-foreground">Product docs</p><h2 className="mt-2 text-2xl font-bold">Browse the portfolio documentation</h2></div>
            <span className="text-xs text-muted-foreground">{filtered.length} of {products.length} records</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto_auto] gap-3 mt-6">
            <label className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 h-11">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, capabilities, status" className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground" />
            </label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground"><option>All</option><option>Stage 1 Beta</option><option>Beta</option><option>Prototype</option><option>Concept</option><option>Live</option></select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground"><option>All</option>{categories.map((item) => <option key={item}>{item}</option>)}</select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filtered.map((product) => (
              <a key={product.id} href={`/docs/${product.id}`} className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:bg-card/80 transition-all">
                <div className="flex items-center justify-between gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-5"><span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusColor(product.status)}`}>{product.status}</span><span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getCategoryColor(product.category)}`}>{product.category}</span></div>
                <h3 className="mt-4 font-semibold group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{product.description}</p>
                <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 gap-3"><div><p className="text-[10px] uppercase tracking-widest text-muted-foreground">As is</p><p className="mt-1 text-xs font-semibold">{product.valuationAsIs}</p></div><div><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Next gate</p><p className="mt-1 text-xs font-semibold line-clamp-2">{product.nextGate}</p></div></div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </DocsShell>
  );
}
