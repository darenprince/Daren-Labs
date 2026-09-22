import { useState } from "react";
import { Check, Copy, ExternalLink, Image as ImageIcon } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { products } from "@/data/products";
import { getAppIconAssetUrl } from "@/data/appIcons";

export default function AppIconLibrary() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyPath = async (id: string, path: string) => {
    await navigator.clipboard.writeText(path);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((current) => current === id ? null : current), 1600);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-primary">
          <ImageIcon className="h-4 w-4" />
          <p className="text-xs font-semibold uppercase tracking-widest">Asset library</p>
        </div>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Crown Labs app icons</h1>
        <p className="mt-5 text-base text-muted-foreground leading-relaxed">
          Canonical product icon assets for Crown Labs surfaces. The source PNGs remain unchanged. Crown Labs interfaces apply the shared squircle crop at render time so every surface uses the same geometry without creating duplicate image files.
        </p>
        <div className="mt-6 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground leading-relaxed">
          Presentation standard: SVG object-bounding-box clip path using the Crown Labs squircle mask. VoxVector is intentionally excluded from this library and treatment.
        </div>
      </div>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Canonical assets</p>
            <h2 className="mt-2 text-2xl font-bold">{products.length} product icons</h2>
          </div>
          <a href="/docs" className="text-xs font-semibold text-foreground hover:text-primary transition-colors">Back to documentation</a>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {products.map((product) => {
            const path = getAppIconAssetUrl(product.id);
            const copied = copiedId === product.id;

            return (
              <article key={product.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start gap-4">
                  <AppIcon src={path} alt={`${product.name} app icon`} className="h-16 w-16" />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{product.category}</p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Direct resource path</p>
                  <div className="rounded-lg border border-border bg-background/60 overflow-hidden">
                    <code className="block px-3 py-3 text-xs text-foreground break-all select-all">{path}</code>
                    <div className="border-t border-border px-3 py-2 flex items-center justify-between gap-3">
                      <a href={path} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        Open asset <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => void copyPath(product.id, path)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied ? "Copied" : "Copy path"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
