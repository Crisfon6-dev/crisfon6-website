import { expect, test, describe } from "vitest";
import { subscribe } from "@/app/actions/subscribe";

describe("subscribe action", () => {
  test("rejects empty email", async () => {
    const formData = new FormData();
    formData.set("email", "");
    const result = await subscribe(null, formData);
    expect(result?.success).toBe(false);
    expect(result?.message).toContain("valid email");
  });

  test("rejects invalid email", async () => {
    const formData = new FormData();
    formData.set("email", "not-an-email");
    const result = await subscribe(null, formData);
    expect(result?.success).toBe(false);
  });

  test("returns redirect fallback when no API key configured", async () => {
    const formData = new FormData();
    formData.set("email", "test@example.com");
    const result = await subscribe(null, formData);
    // Without BEEHIIV_API_KEY env var, should fallback to redirect
    expect(result?.success).toBe(true);
    expect(result?.message).toBe("redirect");
  });
});
