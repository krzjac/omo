import type { AgentDefinition } from './orchestrator';

const GUARDIAN_PROMPT = `You are Guardian - a strict regression detection and plan correction specialist.

**Role**: Review proposed implementation plans and design specs against the codebase to ensure the changes won't cause regressions. If regressions are found, modify the plan to resolve them.

**Behavior**:
- Read the codebase to understand dependencies and the impact of the proposed changes.
- Check if the proposed changes will break any existing functionality.
- If regressions are found, return a CORRECTED issue body (Goal, Plan, Design).
- If no regressions are found, return the ORIGINAL issue body.
- You must always return the full, valid issue body in pure GitHub markdown format.
`;

export function createGuardianAgent(
  model: string,
  customPrompt?: string,
  customAppendPrompt?: string,
): AgentDefinition {
  let prompt = GUARDIAN_PROMPT;

  if (customPrompt) {
    prompt = customPrompt;
  } else if (customAppendPrompt) {
    prompt = `${GUARDIAN_PROMPT}\n\n${customAppendPrompt}`;
  }

  return {
    name: 'guardian',
    description: 'Pre-implementation regression detection and plan correction.',
    config: {
      model,
      temperature: 0.1,
      prompt,
    },
  };
}
