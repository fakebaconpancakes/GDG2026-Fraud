/**
 * Redacts sensitive tokens (OTPs, card numbers, emails, phone numbers, URLs)
 * so users can safely copy and share investigation summaries without exposing personal secrets.
 */
export function redactSensitiveText(input: string): string {
  let out = input;

  // Redact URLs so untrusted links cannot be accidentally clicked when pasted
  out = out.replace(
    /\b(?:https?:\/\/|www\.)[^\s<>()]+/gi,
    "[REDACTED-LINK]"
  );

  // Redact standalone domain-like links with paths
  out = out.replace(
    /\b[a-z0-9-]+(?:\.[a-z0-9-]+)+\/[a-z0-9\-._~:/?#[\]@!$&'()*+,;=%]*/gi,
    "[REDACTED-LINK]"
  );

  // Redact email addresses
  out = out.replace(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    "[REDACTED-EMAIL]"
  );

  // Redact 13-19 digit card or account sequences
  out = out.replace(/\b(?:\d[ -]*?){13,19}\b/g, "[REDACTED-ACCOUNT-NUMBER]");

  // Redact phone numbers (international and local formats)
  out = out.replace(
    /(?:\+\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b/g,
    "[REDACTED-PHONE]"
  );

  // Redact 4 to 8 digit one-time codes
  out = out.replace(/\b\d{4,8}\b/g, "[REDACTED-CODE]");

  return out;
}
