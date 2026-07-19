# Enforce dual screenshot evidence contract

## Goal

Require every successful workflow to publish exactly two verified GitHub-hosted PNG screenshots—mobile 390×844 and laptop 1366×768—while `@tester` still captures and visually assesses all eight supported viewport sizes. Require the orchestrator to personally inspect both final images against user intent and every Success Criterion before announcing success.

## Success Criteria

- [ ] `@tester` captures and visually assesses 390×844, 844×390, 768×1024, 1024×768, 1366×768, 1920×1080, 2560×1440, and 3840×2160.
- [ ] Successful tester output reports a text-only assessment matrix for all eight viewports but returns only the 390×844 and 1366×768 PNG paths.
- [ ] Every successful workflow, including non-UI and tester-unavailable fallback, publishes exactly those two final evidence images.
- [ ] Both images are real non-empty PNGs with exact dimensions and verified direct GitHub raw/download URLs.
- [ ] Final chat includes one clickable link and one inline Markdown image for each screenshot.
- [ ] The orchestrator personally opens both images, explains what each visibly proves, compares them with intent and all Success Criteria, and explicitly accepts or rejects each.
- [ ] Blank, unreadable, clipped, partial, unrelated, inconclusive, malformed, text-disguised, zero-byte, wrong-size, or unreachable evidence blocks success.
- [ ] Failure diagnostics may include additional screenshots, but successful completion publishes exactly two.
- [ ] Stale root `tester.md` is deleted; configured external tester prompt overrides remain supported.
- [ ] No Delegation Gate, execution-mode selector, hardcoded `origin/dev`, fixed deployment wait, or test-pass completion shortcut is introduced.

## Design Spec

No application UI change. The evidence contract requires representative output at mobile 390×844 and laptop 1366×768.

## Implementation Plan

1. **[@fixer]** Update `src/agents/tester.ts` to assess all eight viewports, emit an eight-row text audit, and return only mobile/laptop evidence on success while retaining additional failure diagnostics.
2. **[Orchestrator]** Record the tester prompt implementation on the selected GitHub evidence surface.
3. **[@fixer]** Update `src/agents/orchestrator.ts` with the exact-two evidence gate, non-UI/tester-unavailable fallback, binary upload verification, direct links, inline rendering, and mandatory personal orchestrator inspection/verdict.
4. **[Orchestrator]** Record the orchestrator prompt implementation on the selected GitHub evidence surface.
5. **[@fixer]** Synchronize planner prompt sources in `src/agents/orchestrator.ts` and `src/agents/planner.ts` with the evidence contract.
6. **[Orchestrator]** Record planner synchronization.
7. **[@fixer]** Extend `src/agents/orchestrator.test.ts`, add `src/agents/tester.test.ts`, update focused workflow/configuration templates, and delete root `tester.md` without changing external override loading.
8. **[Orchestrator]** Record tests/docs/deletion results.
9. **[@oracle]** Review the final diff for evidence-count loopholes, prompt contradictions, override regressions, and loss of existing local changes.
10. **[Orchestrator]** Record review findings and remediation.
11. **[@fixer]** Run focused tests, `bun run check:ci`, `bun run typecheck`, full tests, and build; remediate failures without weakening the contract.
12. **[Orchestrator or @tester]** Verify all eight viewports, produce exactly two final PNGs, upload them through an authenticated binary-capable GitHub path, verify bytes/dimensions/reachability, and personally inspect both images.
13. **[Orchestrator]** Publish exactly two links plus two inline images and announce success only after explicit per-image acceptance.

## Testing & Verification

```bash
bun test src/agents/tester.test.ts src/agents/orchestrator.test.ts
bun run check:ci
bun run typecheck
bun test
bun run build
```

Manual verification must confirm the eight-viewport audit, exactly-two successful evidence handoff, PNG validity and dimensions, direct URL reachability, inline rendering, and explicit orchestrator verdicts.

## Notes

Full prompt replacement overrides remain intentional replacements; append overrides remain additive. Replacement owners remain responsible for preserving mandatory workflow policy.