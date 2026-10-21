/** Shared date helpers for calendar payloads. */

/** "2025-11-14T19:00:00" local → "20251114T230000Z" UTC stamp (ics/gcal format). */
export const toUtcStamp = (date) =>
  date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
