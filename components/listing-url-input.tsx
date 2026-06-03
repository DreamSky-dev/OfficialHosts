"use client";

import { useState } from "react";
import { Link2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface ListingUrlInputProps {
  onGenerate?: (url: string) => void;
  requireUrl?: boolean;
  placeholder?: string;
  showLabel?: boolean;
  variant?: "default" | "hero";
  className?: string;
}

export function ListingUrlInput({
  onGenerate,
  requireUrl = true,
  placeholder = "https://airbnb.com/rooms/your-listing",
  showLabel = true,
  variant = "default",
  className,
}: ListingUrlInputProps) {
  const [url, setUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const isHero = variant === "hero";

  const trimmedUrl = url.trim();
  const canGenerate = requireUrl ? trimmedUrl.length > 0 : true;

  const handleGenerate = async () => {
    if (!canGenerate || isGenerating) return;

    setIsGenerating(true);
    try {
      await onGenerate?.(trimmedUrl);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={cn(showLabel ? "space-y-3" : "w-full", className)}>
      {showLabel && (
        <label
          htmlFor="listing-url"
          className="text-sm font-medium text-foreground"
        >
          Listing URL
        </label>
      )}
      <InputGroup
        className={cn(
          "w-full",
          isHero
            ? "h-12 rounded-full border border-white/35 bg-transparent shadow-none backdrop-blur-[2px] md:h-14 has-[[data-slot=input-group-control]:focus-visible]:border-white/55 has-[[data-slot=input-group-control]:focus-visible]:ring-white/20"
            : "h-11 rounded-lg border-border/80 bg-white shadow-xs",
        )}
      >
        <InputGroupAddon align="inline-start" className={isHero ? "pl-5" : "pl-3"}>
          {isGenerating ? (
            <Loader2
              className={cn(
                "size-4 animate-spin",
                isHero ? "text-white/70" : "text-muted-foreground",
              )}
              aria-hidden
            />
          ) : (
            <Link2
              className={cn(
                "size-4",
                isHero ? "text-white/60" : "text-muted-foreground",
              )}
              aria-hidden
            />
          )}
        </InputGroupAddon>
        <InputGroupInput
          id="listing-url"
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder={placeholder}
          value={url}
          disabled={isGenerating}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              void handleGenerate();
            }
          }}
          aria-label="Listing URL"
          aria-busy={isGenerating}
          className={cn(
            isHero
              ? "pr-5 text-base text-white placeholder:text-white/45 dark:bg-transparent"
              : "pr-4",
          )}
        />
      </InputGroup>
    </div>
  );
}
