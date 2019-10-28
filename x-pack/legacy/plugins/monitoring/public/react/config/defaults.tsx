
type TimefilterSettings = {
  refreshInterval: number,
  isPaused: boolean,
  start: string,
  end: string
}

export const timefilterSettings: Readonly<TimefilterSettings> = {
  refreshInterval: 10000,
  isPaused: false,
  start: 'now-1h',
  end: 'now',
};