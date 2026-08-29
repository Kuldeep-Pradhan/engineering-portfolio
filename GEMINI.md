# UI & Layout Verification Rules

- **Visual Verification is Mandatory**: Whenever you modify CSS layout properties (especially `z-index`, `position: absolute/fixed`, overlays, or preloader states), you **MUST NOT** mark the task as complete based solely on logic.
- You must write a Playwright script or use the `browser` subagent to take a screenshot and visually verify that the elements are stacking and rendering exactly as intended.
- If testing a "loading" state, ensure your test scripts pause precisely during that state to capture it before transitions finish.
