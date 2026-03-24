import { useState } from "react";
import { ChevronDown, ChevronUp, TrendingUp } from "lucide-react";
import { type Product, getStatusColor, getCategoryColor } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden hover:border-border/80 transition-colors">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center">
              <span className="text-xs font-bold text-muted-foreground">{product.abbr}</span>
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getCategoryColor(product.category)}`}>
                  {product.category}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground">{product.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{product.categoryLabel}</p>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

        <div className="mt-4 rounded-lg border border-border bg-background/40 p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Valuation signal</p>
            <div className="flex items-center gap-1 text-green-400">
              <TrendingUp className="h-3 w-3" />
              <span className="text-[10px] font-semibold">Rising</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <span className="text-sm font-bold text-foreground">As-is: {product.valuationAsIs}</span>
              <span className="text-xs text-muted-foreground ml-2">Projected: {product.valuationProjected}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] text-muted-foreground">Low <span className="font-semibold text-foreground">{product.trendLow}</span></span>
            <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(product.trendAvg / product.trendHigh) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">Avg <span className="font-semibold text-foreground">{product.trendAvg}</span></span>
            <span className="text-[10px] text-muted-foreground">High <span className="font-semibold text-foreground">{product.trendHigh}</span></span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {product.metrics.map((metric, i) => (
            <div key={i} className="text-center">
              <p className="text-base font-bold text-foreground">{metric.value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{metric.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-3 text-[10px] text-muted-foreground">
          Readiness score <span className="font-bold">0%</span>
        </p>

        {expanded && (
          <div className="mt-4 space-y-4 border-t border-border pt-4">
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Core capabilities</p>
              <ul className="space-y-1.5">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5">—</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-background/40 p-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Next gate</p>
              <p className="text-xs text-foreground">{product.nextGate}</p>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" />
                Collapse details
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" />
                Expand details
              </>
            )}
          </button>
          <span className="text-border">|</span>
          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Quick view
          </button>
          <span className="text-border">|</span>
          <button className="text-xs text-primary hover:underline transition-colors">
            Request access
          </button>
        </div>
      </div>
    </div>
  );
}
