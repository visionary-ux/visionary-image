import "vitest-canvas-mock";

/**
 * Mock IntersectionObserver
 * (thank you https://aronschueler.de/blog/2022/12/14/mocking-intersectionobserver-in-jest/)
 */
export class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];
  disconnect() {
    return null;
  }
  observe() {
    return null;
  }
  takeRecords() {
    return [];
  }
  unobserve() {
    return null;
  }
}

window.IntersectionObserver = IntersectionObserver;
global.IntersectionObserver = IntersectionObserver;
