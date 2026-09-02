import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronRight, CircleDot, Search, ShieldCheck, TrendingUp } from "lucide-react";
import { products, getCategoryColor, getStatusColor } from "@/data/products";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 shrink-0" aria-label="Back to Crown Labs">
            <img src="/logo.png" alt="Crown Labs" className="h-8 w-auto" />
            <div className="hidden sm:block">
              <p className="text-xs font-semibold tracking-widest uppercase">Crown Labs</p>
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground">Documentation</p>
            </div>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to portfolio
          </a>
        </div>
      </header>
      {children}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">Crown Labs · Canonical documentation</p>
          <a href="/docs" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Documentation home</a>
        </div>
      </footer>
    </div>
  );
}

function DocsHome() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery = !q || [product.name, product.description, product.category, product.status].join(" ").toLowerCase().includes(q);
      const matchesStatus = status === "All" || product.status === status;
      const matchesCategory = category === "All" || product.category === category;
      return matchesQuery && matchesStatus && matchesCategory;
    });
  }, [query, status, category]);

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary">Crown Labs documentation</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">The system of record for the portfolio.</h1>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">
            Product purpose, capabilities, readiness, valuation context, operating principles, and next gates in one consistent documentation system.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto_auto] gap-3 mb-8">
          <label className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 h-11">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products and documentation"
              className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
            />
          </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground">
            <option>All</option>
            <option>Stage 1 Beta</option>
            <option>Beta</option>
            <option>Prototype</option>
            <option>Concept</option>
            <option>Live</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground">
            <option>All</option>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {products.length} documented products</p>
          <a href="/#portfolio" className="text-xs font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1">View portfolio <ChevronRight className="h-3.5 w-3.5" /></a>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {filtered.map((product) => (
            <a key={product.id} href={`/docs/${product.id}`} className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusColor(product.status)}`}>{product.status}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getCategoryColor(product.category)}`}>{product.category}</span>
                  </div>
                  <h2 className="text-lg font-bold group-hover:text-primary transition-colors">{product.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
              </div>
              <div className="mt-5 pt-4 border-t border-border grid sm:grid-cols-3 gap-3">
                <div><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Valuation</p><p className="mt-1 text-xs font-semibold">{product.valuationAsIs}</p></div>
                <div><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Projected</p><p className="mt-1 text-xs font-semibold">{product.valuationProjected}</p></div>
                <div><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Next gate</p><p className="mt-1 text-xs font-semibold truncate">{product.nextGate}</p></div>
              </div>
            </a>
          ))}
        </div>

        <section className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            [BookOpen, "Portfolio architecture", "The canonical inventory and information hierarchy."],
            [ShieldCheck, "Operating principles", "Evidence-ready, privacy-conscious, accountable systems."],
            [CircleDot, "Readiness vocabulary", "Consistent definitions from Concept through Live."],
          ].map(([Icon, title, copy]) => {
            const I = Icon as typeof BookOpen;
            return <div key={title as string} className="rounded-xl border border-border bg-card p-5"><I className="h-5 w-5 text-primary mb-4" /><h3 className="text-sm font-semibold">{title as string}</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">{copy as string}</p></div>;
          })}
        </section>
      </main>
    </Layout>
  );
}

function ProductDocs({ id }: { id: string }) {
  const product = products.find((item) => item.id === id);
  if (!product) {
    return (
      <Layout>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary">Documentation</p>
          <h1 className="mt-3 text-4xl font-bold">Product not found</h1>
          <p className="mt-4 text-muted-foreground">The requested documentation record does not exist in the canonical portfolio.</p>
          <a href="/docs" className="mt-8 inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold"><ArrowLeft className="h-4 w-4" /> Documentation home</a>
        </main>
      </Layout>
    );
  }

  const index = products.findIndex((item) => item.id === product.id);
  const previous = products[index - 1];
  const next = products[index + 1];

  return (
    <Layout>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-8">
          <a href="/docs" className="hover:text-foreground">Documentation</a><ChevronRight className="h-3.5 w-3.5" /><span>{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          <article>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold border uppercase tracking-widest ${getStatusColor(product.status)}`}>{product.status}</span>
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold border uppercase tracking-widest ${getCategoryColor(product.category)}`}>{product.category}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{product.name}</h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{product.description}</p>

            <section className="mt-12">
              <h2 className="text-xl font-bold">Overview</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {product.name} is part of the Crown Labs portfolio and is documented as a standalone asset with a defined category, readiness state, capabilities, valuation context, and execution gate.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold">Core capabilities</h2>
              <div className="mt-4 space-y-3">
                {product.features.map((feature) => <div key={feature} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><p className="text-sm leading-relaxed">{feature}</p></div>)}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold">Readiness & next gate</h2>
              <div className="mt-4 rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2"><CircleDot className="h-4 w-4 text-primary" /><p className="text-sm font-semibold">{product.status}</p></div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{product.nextGate}</p>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold">Valuation context</h2>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-border bg-card p-4"><p className="text-[10px] uppercase tracking-widest text-muted-foreground">As-is</p><p className="mt-2 text-lg font-bold">{product.valuationAsIs}</p></div>
                <div className="rounded-lg border border-border bg-card p-4"><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Projected</p><p className="mt-2 text-lg font-bold">{product.valuationProjected}</p></div>
                <div className="rounded-lg border border-border bg-card p-4"><div className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-green-400" /><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Trend</p></div><p className="mt-2 text-lg font-bold">{product.trend}</p></div>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold">Operating metrics</h2>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                {product.metrics.map((metric) => <div key={metric.label} className="rounded-lg border border-border bg-card p-4"><p className="text-lg font-bold">{metric.value}</p><p className="mt-1 text-xs text-muted-foreground">{metric.label}</p></div>)}
              </div>
            </section>
          </article>

          <aside className="lg:sticky lg:top-24 h-max space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Documentation record</p>
              <p className="mt-2 text-sm font-semibold">{product.name}</p>
              <div className="mt-5 space-y-3 text-xs">
                <div className="flex justify-between gap-4"><span className="text-muted-foreground">Category</span><span className="font-medium text-right">{product.categoryLabel}</span></div>
                <div className="flex justify-between gap-4"><span className="text-muted-foreground">Status</span><span className="font-medium">{product.status}</span></div>
                <div className="flex justify-between gap-4"><span className="text-muted-foreground">Record ID</span><span className="font-mono text-[11px] text-right">{product.id}</span></div>
              </div>
            </div>
            <a href="/#portfolio" className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-xs font-semibold hover:border-primary/50 transition-colors">Back to portfolio <ArrowRight className="h-3.5 w-3.5" /></a>
          </aside>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex items-center justify-between gap-4">
          {previous ? <a href={`/docs/${previous.id}`} className="text-xs text-muted-foreground hover:text-foreground"><span className="block text-[10px] uppercase tracking-widest mb-1">Previous</span>{previous.name}</a> : <span />}
          {next ? <a href={`/docs/${next.id}`} className="text-xs text-right text-muted-foreground hover:text-foreground"><span className="block text-[10px] uppercase tracking-widest mb-1">Next</span>{next.name}</a> : <span />}
        </div>
      </main>
    </Layout>
  );
}

export default function DocumentationApp({ path }: { path: string }) {
  const parts = path.replace(/^\/docs\/?/, "").split("/").filter(Boolean);
  return parts[0] ? <ProductDocs id={parts[0]} /> : <DocsHome />;
}
