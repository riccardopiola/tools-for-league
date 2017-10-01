export function validateChanges(state):boolean {
  const ping = state.ping;
  if (ping.interval === '' || Number.isNaN(Number.parseInt(ping.interval, 10)))
    return false;
  return true;
}
