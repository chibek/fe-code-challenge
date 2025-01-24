export const TREND_OPTIONS = {
  UP: 'UP',
  DOWN: 'DOWN'
} as const;

export type TREND_OPTIONS_TYPE = (typeof TREND_OPTIONS)[keyof typeof TREND_OPTIONS];
