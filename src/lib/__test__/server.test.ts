import { describe, expect, test } from "vitest";

import { LOADER_SCRIPT, renderLoaderScript } from "../../server";

const renderScript = (html: string): HTMLScriptElement => {
  const template = document.createElement("template");
  template.innerHTML = html;
  const script = template.content.firstElementChild;
  if (!(script instanceof HTMLScriptElement)) {
    throw new Error("Expected a <script> element");
  }
  return script;
};

describe(renderLoaderScript.name, () => {
  test("inlines the loader IIFE without attributes by default", () => {
    const html = renderLoaderScript();
    const script = renderScript(html);

    expect(LOADER_SCRIPT).toMatch(/^\(function\(\)\{/);
    expect(html).toBe(`<script>${LOADER_SCRIPT}</script>`);
    expect(script.getAttributeNames()).toEqual([]);
    expect(script.textContent).toBe(LOADER_SCRIPT);
  });

  test("maps options to loader data attributes", () => {
    const script = renderScript(renderLoaderScript({ debug: true, eagerCanvasPaint: true, nonce: 'abc"123' }));

    expect(script.getAttribute("nonce")).toBe('abc"123');
    expect(script.hasAttribute("data-eager-canvas")).toBe(true);
    expect(script.hasAttribute("data-debug")).toBe(true);
  });
});
