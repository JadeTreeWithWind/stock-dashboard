import { useEffect, useMemo, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { searchStocks, type StockWithWatchlistStatus } from "@/lib/api/search";
import { useNavigate } from "react-router";

type SearchCommandProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SearchCommand = ({ open, onOpenChange }: SearchCommandProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<StockWithWatchlistStatus[]>([]);
  const navigate = useNavigate();

  const debouncedTerm = useMemo(() => searchTerm.trim(), [searchTerm]);

  useEffect(() => {
    if (!open) return; // don't fetch when closed
    let active = true;
    setLoading(true);

    const handle = setTimeout(async () => {
      try {
        const data = await searchStocks(debouncedTerm);
        if (!active) return;
        setResults(data ?? []);
      } catch (e) {
        if (!active) return;
        console.error("searchStocks error:", e);
        setResults([]);
      } finally {
        if (active) setLoading(false);
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(handle);
    };
  }, [debouncedTerm, open]);

  const handleSelectStock = (symbol: string) => {
    console.log(`Stock selected: ${symbol}`);
    // Optionally close the dialog after selection
    onOpenChange(false);
    navigate(`/${symbol}`);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) {
          // reset state when closing to keep UX tidy
          setSearchTerm("");
          setResults([]);
          setLoading(false);
        }
      }}
    >
      <CommandInput
        placeholder="搜尋股票..."
        value={searchTerm}
        onValueChange={setSearchTerm}
      />

      <CommandList>
        {loading && (
          <div className="text-muted-foreground p-3 text-sm">搜尋中…</div>
        )}
        {!loading && results.length === 0 && (
          <CommandEmpty>沒有找到結果</CommandEmpty>
        )}
        {!loading && results.length > 0 && (
          <CommandGroup heading="熱門股票">
            {results.map((item) => (
              <CommandItem
                key={item.symbol}
                value={`${item.symbol} ${item.name} ${item.exchange} ${item.type}`}
                onSelect={() => handleSelectStock(item.symbol)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{item.symbol}</span>
                  <span className="text-muted-foreground text-xs">
                    {item.name}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
