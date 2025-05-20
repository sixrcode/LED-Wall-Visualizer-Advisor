// This file can be used for shared TypeScript types across the application.

// Example (can be expanded as needed):
export interface NavItem {
  href: string;
  label: string;
  icon?: React.ElementType; // For Lucide icons or other React components
}

// Types related to AI Flow outputs if needed for client-side processing beyond the flow definitions.
// For example, if we transform RankToolsOutput before displaying.
// import type { RankToolsOutput as AiRankToolsOutput } from '@/ai/flows/rank-tools';
// export type DisplayTool = AiRankToolsOutput[0] & { someClientSideProperty?: string };

// Add other shared types here as the application grows.
