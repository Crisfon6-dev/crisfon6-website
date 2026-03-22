"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const BEEHIIV_URL = "https://crisfon6.beehiiv.com";

export function SubscribeForm() {
  const [state, formAction, isPending] = useActionState<
    SubscribeState,
    FormData
  >(subscribe, null);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle redirect fallback (when no API key configured)
  useEffect(() => {
    if (state?.success && state.message === "redirect") {
      window.open(BEEHIIV_URL, "_blank");
    }
  }, [state]);

  if (state?.success && state.message !== "redirect") {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 bg-green-dim border border-green/20 rounded-lg px-4 py-3 text-sm text-green text-center">
          {state.message}
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="email"
          placeholder="you@company.com"
          required
          className="flex-1 bg-surface-2 border border-border-emphasis rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
        />
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="bg-accent hover:bg-accent-light text-white px-6 py-3 h-auto whitespace-nowrap"
        >
          {isPending ? "Subscribing..." : "Start getting blueprints"}
        </Button>
      </div>
      {state?.success === false && (
        <p className="text-xs text-red mt-2">{state.message}</p>
      )}
      <p className="text-xs text-text-muted mt-3">
        Free forever — cancel anytime. No spam, ever.
      </p>
    </form>
  );
}
