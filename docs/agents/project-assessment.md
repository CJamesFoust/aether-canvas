# Aether Canvas — Grill Session Summary

## Key takeaways

Aether Canvas is a financial SaaS dashboard with a reusable dynamic widget canvas underneath.
Its primary workflow is a weekly financial review: users should identify what changed, why it changed, and whether action is needed in under ten minutes.
The project’s main learning objective is practical mastery of:
- ViewContainerRef
- ComponentRef
- setInput()
- Signal inputs and outputs
- @ngrx/signals
- Dynamic imports
- Zoneless, lifecycle-safe Angular rendering

## Accepted architecture

- Angular 22+, standalone components, Tailwind CSS.
- DashboardLayoutStore owns layout, profile settings, filters, normalized data, and request state.
- One WidgetHostDirective and ViewContainerRef per grid cell.
- A typed widget registry maps widget types to metadata, configuration, component loaders, and capabilities.
- Widgets are dynamically created and updated without template hardcoding.
- Standard widget inputs are widgetId, config, and viewModel.
- Widget configuration changes update store state and call ComponentRef.setInput() on the existing instance.
- Widget identity, DOM state, and local state must survive configuration updates.
- Widgets emit intents such as requestRefresh, openDetails, and requestRemove.
- The canvas owns component creation, output subscriptions, and destruction.
- CDK Overlay provides the configuration drawer infrastructure; Tailwind controls appearance.
- CDK Drag and Drop handles layout editing.
- Lazy imports load widget implementations; @defer is reserved for non-critical viewport rendering.

## Product scope

Initial widgets:
- MRR/ARR KPI
- Revenue trend chart
- Burn and runway KPI
- Expense breakdown chart
- Recent transactions table
Routes:
- /dashboard
- /templates
- /settings
Templates define widget layouts and safe defaults. Applying a template creates a new profile revision, requires confirmation when needed, and supports undo.
Drag, resize, removal, user customization, authentication boundaries, live integrations, and persisted profiles are all in scope, but should be delivered in phases.

## Data and domain decisions

- Seeded data comes through the same adapter interface as live data.
- Seeded data is deterministic and includes realistic anomalies.
- Stripe is the first live provider for billing and revenue.
- Expenses and cash initially use seeded adapters.
- Provider data is normalized into typed financial primitives before metric calculation.
- Metrics are calculated in dedicated domain services, not inside widgets.
- Initial metric catalog:
  - MRR
  - ARR
  - Revenue
  - Burn
  - Runway
  - Churn
- Metrics must include currency, timezone, period, source, and freshness metadata.
- Shared requests use deterministic cache keys and deduplication.
- Stale data remains visible with explicit status rather than being replaced by fabricated zeros.

## Persistence and identity

- The profile model includes layout, widget settings, filters, templates, theme, polling interval, and data-source configuration.
- localStorage is only a temporary repository implementation.
- The long-term model is a persisted user profile.
- Profiles are versioned and migrated.
- Organization identity and user identity are modeled separately.
- Template defaults are overridden by organization defaults, user profile settings, and live edits.
- Credentials and secrets must never be stored in localStorage.

## Reliability and testing

The system must handle:
- Widget creation and destruction
- Repeated layout changes
- Route navigation
- Widget removal during async requests
- Lazy-load failures
- Invalid or outdated profiles
- Provider rate limits and expired credentials
- Partial data responses
- Configuration changes without component recreation
Tests should verify:
- Stable ComponentRef identity after setInput()
- Stable DOM and local widget state
- Correct input delivery
- Output forwarding
- Teardown and request cancellation
- Lazy-load failures
- Profile migration and recovery
- Keyboard-accessible configuration and layout editing

## Knowledge gaps

The grill identified areas that the PRD does not fully specify and that still require implementation decisions:
1. Exact formulas for MRR, ARR, churn, burn, runway, refunds, and recognized revenue.
2. The organization’s fiscal calendar, timezone, currency conversion, and reporting rules.
3. Exact Stripe endpoints, event types, synchronization cursors, and backend responsibilities.
4. The final UserDashboardProfile schema and remote repository API.
5. Conflict resolution when the same profile is edited in multiple sessions.
6. Exact grid dimensions, breakpoints, minimum widget sizes, and collision rules.
7. Authentication provider and real authorization enforcement.
8. Numeric performance budgets for startup, lazy loading, dragging, and updates.
9. Final chart implementation choice: native SVG first, Chart.js only when needed.
10. Detailed accessibility acceptance criteria and automated test coverage.
These are deferred design details, not unresolved direction. The overall product and architecture decisions were accepted.