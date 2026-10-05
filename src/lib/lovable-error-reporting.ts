type LovableErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

// Lovable telemetry removed — stub kept to avoid import breakage.
export function reportLovableError(_error: unknown, _context: Record<string, unknown> = {}) {
  // no-op
}
