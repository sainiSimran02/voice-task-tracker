import * as chrono from "chrono-node";


/**
 * Lightweight parser for voice transcripts.
 * - Extracts due date (using chrono-node)
 * - Detects priority keywords
 * - Builds a cleaned title
 */

const priorityMap = [
  { match: /\b(critical|blocker|severe)\b/i, value: "Critical" },
  { match: /\b(high priority|high priority|urgent|high)\b/i, value: "High" },
  { match: /\b(medium|normal)\b/i, value: "Medium" },
  { match: /\b(low priority|low)\b/i, value: "Low" },
];

function detectPriority(text) {
  for (const p of priorityMap) {
    if (p.match.test(text)) return p.value;
  }
  return "Medium";
}

function extractDueDate(text) {
  // chrono.parseDate returns Date or null
  const date = chrono.parseDate(text, new Date(), { forwardDate: true });
  return date || null;
}

function cleanTitle(text) {
  // Remove common stop phrases and date/priority phrases to make a nicer title
  let t = text.trim();

  // Remove words like "remind me to", "create", "please", "hey", "ok"
  t = t.replace(/\b(remind me to|remind me|create|please|pls|hey|ok|could you)\b/gi, "");

  // Remove priority words
  t = t.replace(/\b(high priority|urgent|critical|low priority|low|medium|high)\b/gi, "");

  // Remove date prefixes like "by", "before", "on", "next", "tomorrow", "this"
  t = t.replace(/\b(by|before|on|in|next|tomorrow|today|this|at)\b/gi, "");

  // collapse whitespace and punctuation cleanup
  t = t.replace(/\s{2,}/g, " ").trim();
  t = t.replace(/^[,.-\s]+|[,.-\s]+$/g, "");

  // Optionally shorten if too long (keep 200 chars)
  if (t.length > 200) t = t.slice(0, 197) + "...";
  return t || text;
}

export function parseVoiceInput(transcript) {
  const t = transcript || "";

  const priority = detectPriority(t);
  const dueDate = extractDueDate(t);
  const title = cleanTitle(t);

  return {
    transcript: t,
    title,
    description: "",
    priority,
    dueDate, // Date object or null
    status: "To Do",
  };
}
