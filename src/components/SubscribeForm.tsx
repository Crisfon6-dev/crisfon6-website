'use client';

import { useActionState } from 'react';
import { subscribe, type SubscribeState } from '@/app/actions/subscribe';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useEffect, useRef } from 'react';

const BEEHIIV_URL = 'https://crisfon6.beehiiv.com';

export function SubscribeForm() {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState<SubscribeState, FormData>(subscribe, null);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle redirect fallback (when no API key configured)
  useEffect(() => {
    if (state?.success && state.message === 'redirect') {
      window.open(BEEHIIV_URL, '_blank');
    }
  }, [state]);

  if (state?.success && state.message !== 'redirect') {
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
          className="flex-1 rounded-lg border border-warm-border-strong bg-warm-bg-elev px-4 py-3 text-sm text-warm-fg placeholder:text-warm-fg-muted focus:border-accent focus:outline-none transition-colors"
        />
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="bg-accent hover:bg-accent-light text-white px-6 py-3 h-auto whitespace-nowrap"
        >
          {isPending ? t.newsletter.subscribing : t.newsletter.startGetting}
        </Button>
      </div>
      {state?.success === false && <p className="text-xs text-red mt-2">{state.message}</p>}
      <p className="mt-3 text-xs text-warm-fg-muted">{t.newsletter.noSpam}</p>
    </form>
  );
}
