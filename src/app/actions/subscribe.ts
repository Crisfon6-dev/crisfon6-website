"use server";

export type SubscribeState = {
  success: boolean;
  message: string;
} | null;

export async function subscribe(
  _prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = formData.get("email");

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !pubId) {
    // Fallback: if env vars are not configured, redirect to beehiiv
    return {
      success: true,
      message: "redirect",
    };
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
        }),
      },
    );

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return {
        success: false,
        message: error?.message || "Something went wrong. Please try again.",
      };
    }

    return { success: true, message: "You're in! Check your inbox." };
  } catch {
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
}
