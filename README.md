# Aether Canvas

Aether Canvas is a configurable SaaS financial dashboard built around a dynamic widget canvas. It helps finance teams review revenue, expenses, burn, runway, and related metrics in one focused workspace.

The project is also an Angular engineering exercise focused on programmatic component composition. Dashboard widgets are created, configured, updated, and destroyed at runtime instead of being hard-coded into the dashboard template.

## Product direction

The primary workflow is a weekly financial review: identify what changed, understand why it changed, and decide whether action is needed.

The dashboard will provide:

- Opinionated default layouts with user-customizable positioning and sizing.
- Dynamically loaded KPI, chart, and table widgets.
- Per-widget configuration through slide-out panels.
- Drag-and-drop layout editing and persisted dashboard profiles.
- Templates for starting layouts.
- Explicit loading, empty, stale, and error states.
- Seeded financial data first, followed by live billing data through a provider adapter.

## Architecture focus

Aether Canvas uses a centralized dashboard store and a registry-driven composition engine:

```text
DashboardLayoutStore
        |
DashboardCanvasComponent
        |
WidgetHostDirective
        |
ViewContainerRef.createComponent()
        |
ComponentRef.setInput()
        |
Dynamic widget instance
```

Important architectural decisions:

- Angular standalone components and signal-driven state.
- `@ngrx/signals` for layout, profile, filters, normalized data, and request state.
- One widget host anchor per grid cell.
- A typed widget registry with lazy component loaders, defaults, capabilities, and configuration panels.
- `ComponentRef.setInput()` for live configuration updates without destroying the existing widget instance.
- The canvas owns widget creation, output forwarding, and teardown.
- Widgets own presentation and ephemeral interaction state, not financial data-fetching logic.
- Angular CDK provides drag-and-drop and overlay infrastructure; Tailwind CSS provides styling.
- Persisted profiles are versioned and migratable. Local storage is only a temporary repository implementation.

## Initial financial widgets

- MRR and ARR KPI
- Revenue trend chart
- Burn and runway KPI
- Expense breakdown chart
- Recent transactions table

Financial metrics will be calculated from normalized domain data. Metric results will carry their source, currency, timezone, reporting period, and freshness metadata.

## Routes

- `/dashboard` — the dynamic financial dashboard canvas.
- `/templates` — predefined dashboard layouts and profile revisions.
- `/settings` — organization-level settings such as currency, timezone, polling policy, data sources, and theme.

## Delivery phases

1. **Foundation** — Angular project structure, Tailwind, signal store, profile model, and widget host directive.
2. **Dynamic composition** — widget registry, lazy loading, `ViewContainerRef`, `ComponentRef`, typed inputs, outputs, and teardown.
3. **Canvas editing** — grid layout, drag-and-drop, resizing, removal, responsive behavior, and profile persistence.
4. **Widget library** — financial KPI, chart, and table widgets plus slide-out configuration panels.
5. **Reliability and integrations** — lifecycle testing, performance budgets, seeded adapters, Stripe billing data, migrations, and recovery flows.

## Development

Install dependencies and start the local server:

```bash
npm install
npm run start
```

Then open [http://localhost:4200/](http://localhost:4200/).

Build the application:

```bash
npm run build
```

Run unit tests:

```bash
npm test
```

## Conventions

- Use standalone Angular components.
- Prefer signals and typed models over implicit shared state.
- Keep financial definitions outside widget components.
- Do not hard-code widget component tags in the dashboard canvas template.
- Follow the repository naming convention without Angular suffix descriptors: `revenue-widget.ts`, not `revenue-widget.component.ts`.
- Keep dynamic component creation and destruction observable in tests.

## Current status

The repository is at the Angular application scaffold stage. The architecture and product direction above describe the target implementation; the dynamic canvas, financial widgets, persistence, and integrations are being built incrementally.
