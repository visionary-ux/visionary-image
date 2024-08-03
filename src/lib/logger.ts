const LOG_PREPEND_TEXT = "<visionary>";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logDebug = (message: string, ...params: any[]) => {
  if (!console || typeof console.log !== "function") {
    return;
  }
  console.log(`${LOG_PREPEND_TEXT} ${message}`, ...params);
};
