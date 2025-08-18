export type AnalyticsPayload = Record<string, unknown>;

export function track(eventName: string, payload: AnalyticsPayload = {}) {
  try {
    // In production, replace with a real analytics endpoint
    // For now, use console.log to simulate event capture
    // eslint-disable-next-line no-console
    console.log("[analytics]", eventName, payload);
  } catch {}
}
