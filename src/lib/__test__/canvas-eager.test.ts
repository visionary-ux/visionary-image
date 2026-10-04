import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { getRenderedCanvasSet, initEagerCanvasPaint } from "../canvas";

const testSrc =
  "https://visionary.test/image/dzF6aTFiQzFZZiEzODg4ITI1OTIhMDAwMDAwIVU1MURVSGZQUVJmbGtXZjZhZGpdUVJmUXU2ZlBWcmpdb35hZA/lg/blue-flower-dark.jpg";

const observed: Element[] = [];

describe(initEagerCanvasPaint.name, () => {
  let readyState: DocumentReadyState = "loading";

  beforeEach(() => {
    readyState = "loading";
    Object.defineProperty(document, "readyState", {
      configurable: true,
      get: () => readyState,
    });
    document.body.replaceChildren();
    getRenderedCanvasSet().clear();
    observed.length = 0;
    vi.spyOn(IntersectionObserver.prototype, "observe").mockImplementation((target) => {
      observed.push(target);
    });
  });

  afterEach(() => {
    readyState = "complete";
    document.dispatchEvent(new Event("DOMContentLoaded"));
    document.body.replaceChildren();
    getRenderedCanvasSet().clear();
    Reflect.deleteProperty(document, "readyState");
    vi.restoreAllMocks();
  });

  const flushMutations = () => new Promise((resolve) => setTimeout(resolve, 0));

  const appendFigure = (key: string, priority = false) => {
    const container = document.createElement("div");
    container.setAttribute("data-v7y", "");
    const canvas = document.createElement("canvas");
    canvas.dataset.v7yKey = key;
    canvas.width = 24;
    canvas.height = 24;
    container.appendChild(canvas);
    document.body.appendChild(container);

    const img = document.createElement("img");
    img.src = testSrc;
    if (priority) img.setAttribute("fetchpriority", "high");
    container.appendChild(img);

    return { canvas, container };
  };

  test("paints a priority canvas when its img is parsed and leaves attributes unchanged", async () => {
    initEagerCanvasPaint(false, "priority");
    const container = document.createElement("div");
    container.setAttribute("data-v7y", "");
    const canvas = document.createElement("canvas");
    canvas.dataset.v7yKey = "priority";
    canvas.width = 24;
    canvas.height = 24;
    container.appendChild(canvas);
    document.body.appendChild(container);
    await flushMutations();

    expect(getRenderedCanvasSet().has("priority")).toBe(false);

    const img = document.createElement("img");
    img.src = testSrc;
    img.setAttribute("fetchpriority", "high");
    const attributesBefore = {
      canvas: canvas.getAttributeNames().sort(),
      container: container.getAttributeNames().sort(),
    };
    container.appendChild(img);
    await flushMutations();

    expect(getRenderedCanvasSet().has("priority")).toBe(true);
    expect(observed).not.toContain(canvas);
    expect(container.getAttributeNames().sort()).toEqual(attributesBefore.container);
    expect(canvas.getAttributeNames().sort()).toEqual(attributesBefore.canvas);
  });

  test("observes a non-priority canvas instead of painting it", async () => {
    initEagerCanvasPaint(false, "priority");
    const { canvas } = appendFigure("later", false);
    await flushMutations();

    expect(getRenderedCanvasSet().has("later")).toBe(false);
    expect(observed).toContain(canvas);
  });

  test("paints every canvas in all mode until the time budget is spent", async () => {
    let now = 0;
    vi.spyOn(performance, "now").mockImplementation(() => {
      now += 3;
      return now;
    });
    initEagerCanvasPaint(false, "all");

    const first = appendFigure("first", false);
    const second = appendFigure("second", false);
    const priority = appendFigure("priority", true);
    await flushMutations();

    expect(getRenderedCanvasSet().has("first")).toBe(true);
    expect(getRenderedCanvasSet().has("second")).toBe(false);
    expect(getRenderedCanvasSet().has("priority")).toBe(true);
    expect(observed).not.toContain(first.canvas);
    expect(observed).toContain(second.canvas);
    expect(observed).not.toContain(priority.canvas);
  });
});
