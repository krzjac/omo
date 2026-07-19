# Remove retired external integration

## Goal

Remove the retired external integration from repository-owned source, prompts, configuration, documentation, filenames, and rebuilt generated output. Make local subagents the primary workflow while preserving project-derived backend handling and the exact-two screenshot evidence contract.

## Success Criteria

- [ ] No case-insensitive retired marker remains in repository-owned tracked filenames or safe text content.
- [ ] Non-ignored new worktree files are included; deleted paths are skipped.
- [ ] Git internals, dependencies, and `.slim/clonedeps/repos` are narrowly excluded.
- [ ] Binary and sensitive files are never printed or content-scanned.
- [ ] `opencode.jsonc.template` remains parseable after permission/MCP removal.
- [ ] `@planner`, conditional `@designer`, and `@fixer` are primary local specialists.
- [ ] Generic local workflow documentation replaces the obsolete external workflow.
- [ ] Stale external templates and the CR-suffixed duplicate orchestrator source are deleted.
- [ ] Rebuilt ignored `dist/` contains no retired marker.
- [ ] Approval gates, Guardian, backend readiness, eight-viewport tester audit, exact-two final PNG publication, and no automatic merge/push remain intact.

## Implementation Plan

1. **[@fixer]** Remove the retired permission and MCP registration from `opencode.jsonc.template`; validate parsing.
2. **[Orchestrator]** Record configuration cleanup on the selected GitHub evidence surface.
3. **[@fixer]** Rewrite `src/agents/orchestrator.ts`, `planner.ts`, `designer.ts`, and `fixer.ts` so local specialists are primary; preserve all current safeguards.
4. **[Orchestrator]** Record routing changes.
5. **[@fixer]** Rename the obsolete workflow document to `docs/workflow.md`, rewrite it for the local subagent workflow, update links, and remove three obsolete external prompt templates.
6. **[Orchestrator]** Record documentation changes.
7. **[@fixer]** Delete only the tracked CR-suffixed duplicate orchestrator path.
8. **[Orchestrator]** Verify the active orchestrator source remains intact.
9. **[@fixer]** Add a regression test that derives the prohibited marker from fragments, scans tracked/non-ignored worktree names and safe text, excludes only Git/dependencies/cloned dependencies, parses the config template, and scans rebuilt `dist/` when present.
10. **[@guardian]** Review the final diff for missed references and workflow/evidence regressions.
11. **[@fixer]** Run focused tests, Biome, typecheck, full tests, build, generated-output scan, and diff checks.
12. **[@tester or Orchestrator]** Audit all eight viewports, publish only mobile 390×844 and laptop 1366×768, and enforce personal Orchestrator inspection and verdicts.

## Verification

```bash
bun run check:ci
bun run typecheck
bun test
bun run build
```

The final scan must report sanitized paths only and must never emit credentials, file contents, or binary data.