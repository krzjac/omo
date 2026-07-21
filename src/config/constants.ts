// Agent names
export const AGENT_ALIASES: Record<string, string> = {
  explore: 'explorer',
  'frontend-ui-ux-engineer': 'designer',
};

export const SUBAGENT_NAMES = [
  'explorer',
  'librarian',
  'oracle',
  'designer',
  'fixer',
  'observer',
  'planner',
  'tester',
  'guardian',
  'detective',
  'council',
  'councillor',
] as const;

export const ALL_AGENT_NAMES = ['orchestrator', ...SUBAGENT_NAMES] as const;

// Agent name type (for use in DEFAULT_MODELS)
export type AgentName = (typeof ALL_AGENT_NAMES)[number];

/** Agents that cannot be disabled even if listed in disabled_agents config. */
export const PROTECTED_AGENTS = new Set(['orchestrator', 'councillor']);

/**
 * Get the list of orchestratable agents, excluding any disabled agents.
 * This is used for delegation validation at runtime.
 */
// Default models for each agent
// orchestrator is undefined so its model is fully resolved at runtime via priority fallback
export const DEFAULT_MODELS: Record<AgentName, string | undefined> = {
  orchestrator: 'openai/gpt-5.6-terra',
  oracle: 'openai/gpt-5.6-terra-fast',
  librarian: 'openai/gpt-5.6-terra-fast',
  explorer: 'openai/gpt-5.6-terra-fast',
  designer: 'openai/gpt-5.6-terra-fast',
  fixer: 'openai/gpt-5.6-terra',
  observer: 'openai/gpt-5.6-terra-fast',
  planner: 'openai/gpt-5.6-terra-fast',
  tester: 'openai/gpt-5.6-sol',
  guardian: 'openai/gpt-5.6-terra-fast',
  detective: 'openai/gpt-5.6-terra-fast',
  council: 'openai/gpt-5.6-terra-fast',
  councillor: 'openai/gpt-5.6-terra-fast',
};
