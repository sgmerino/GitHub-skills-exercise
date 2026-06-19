export const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
export const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : "http://localhost:8000";

export const apiNotice = codespaceName
  ? null
  : "Define VITE_CODESPACE_NAME in .env.local to enable the Codespaces API URL. Falling back to localhost.";

export function apiUrlFor(resource: string) {
  return `${apiHost}/api/${resource}/`;
}

export function extractArrayResponse<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    if (Array.isArray(record.data)) {
      return record.data as T[];
    }

    if (Array.isArray(record.items)) {
      return record.items as T[];
    }

    if (record.data !== undefined) {
      return [record.data as T];
    }
  }

  return [];
}
