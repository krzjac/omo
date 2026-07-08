# Jules/Milestone Workflow

This document describes the milestone-driven planning and execution workflow powered by Jules via MCP, with local subagents as fallback.

## Overview

The orchestrator operates in two modes:

1. **Planning Mode** — create a GitHub milestone, decompose the work into issues, and document each issue with a detailed Design Spec.
2. **Execution Mode** — run through the milestone issues one by one, dispatching Jules to implement, testing, and iterating until done.

## Models

- **Orchestrator** and **Tester**: `kimi-for-coding/k2p7`
- **All other subagents** (planner, designer, fixer, oracle, etc.): `deepseek/deepseek-v4-flash`
- **Jules**: external agent accessed via MCP

## Planning Mode

1. User describes the desired work.
2. Orchestrator scans the repository (starting with `AGENTS.md`) and asks exactly four questions:
   - Where exactly should changes happen? (files, components, pages)
   - What is the problem or need?
   - What solution is expected?
   - What are the success criteria?
3. User confirms.
4. Orchestrator creates a GitHub milestone via `gh api` or GitHub MCP.
5. Orchestrator dispatches **Jules** (using `docs/templates/jules-planner-prompt.md`) to create each issue body.
6. If Jules planning fails, `@planner` is used as fallback.
7. Issues are created with `github_create_issue` and assigned to the milestone.
8. Orchestrator dispatches **Jules** (using `docs/templates/jules-designer-prompt.md`) to fill the `## Design Spec` section.
9. If Jules design fails, `@designer` is used as fallback.
10. The completed issue body is updated with `github_update_issue`.

## Issue Body Structure

Every issue must contain:

- Goal
- Problem
- Context
- Success Criteria (checkboxes)
- Design Spec
- Implementation Plan
- Testing & Verification
- Risks & Mitigations
- Dependencies

See templates in `docs/templates/issue-body.md` and `docs/templates/design-spec.md`.

## Execution Mode

1. User says something like "zrób ten milestone" or "execute issue #N".
2. Orchestrator fetches the issue(s).
3. For each issue in order:
   - **Pre-flight check**: verify the previous issue is done, assumptions still hold, Design Spec is valid, and success criteria are achievable.
   - Dispatch **Jules** (using `docs/templates/jules-implementer-prompt.md`) with the full issue body.
   - If Jules implementation fails, use `@fixer` as fallback.
   - Poll for the PR/branch created by Jules.
   - Checkout the branch locally.
   - Delegate to `@tester` for verification.
   - If tests pass: comment success and move to the next issue.
   - If tests fail: add feedback comment and retry Jules up to **3 times**.
   - After 3 failures, stop and escalate to the user.
   - Add a milestone health update after each issue.
   - If the next issue no longer fits, trigger the **replan gate**.

## Fallback Rules

| Jules step | Local fallback |
|------------|---------------|
| Planning   | `@planner`    |
| Design     | `@designer`   |
| Implementation | `@fixer`  |
| All fail   | User          |

## Templates

- `docs/templates/jules-planner-prompt.md`
- `docs/templates/jules-designer-prompt.md`
- `docs/templates/jules-implementer-prompt.md`
- `docs/templates/issue-body.md`
- `docs/templates/design-spec.md`
- `docs/templates/pre-flight-check.md`
- `docs/templates/milestone-health.md`
- `docs/templates/execution-log.md`

## Notes

- The orchestrator does **not** merge PRs automatically. After successful tests, the PR is left open for user review.
- Every test case must map to a success criterion from the issue body.
- `@tester` also runs a regression smoke test of the most critical paths from previous issues in the same milestone.
