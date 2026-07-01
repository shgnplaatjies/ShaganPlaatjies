# No automated accessibility auditing

## Current state
The project depends on `@radix-ui/react-accessible-icon` and Radix UI primitives generally (which are a11y-conscious by design), but there's no automated accessibility check anywhere in the toolchain — no `eslint-plugin-jsx-a11y` in the ESLint config, no axe-core/Lighthouse CI step. Meanwhile the UI leans heavily on custom, non-standard interactive/visual components: `MatrixRain`, `ScanLineEffect`, `MouseGlowEffect`, parallax scroll transitions (`useScrollDelegation`, `useScrollTransition`), and a "desktop window" metaphor (`WindowCard`, `PortfolioPageWrapper`).

## Why it matters
Heavy custom animation/visual-effect components are exactly the pattern most likely to introduce accessibility regressions unnoticed — e.g. motion that doesn't respect `prefers-reduced-motion`, custom "window" interactions that aren't keyboard-navigable, or decorative canvas/effect layers that aren't marked `aria-hidden`. None of this fails a build today because nothing is checking for it.

## Suggested action
- Add `eslint-plugin-jsx-a11y` to the existing `next lint` config — this is a near-zero-cost addition since ESLint already runs in `verify`
- Do a manual pass (or add `@axe-core/playwright` alongside the E2E tests from the testing note) specifically on the animation-heavy components to confirm `prefers-reduced-motion` is respected and that decorative effects are hidden from assistive tech
