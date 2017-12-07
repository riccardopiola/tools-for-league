export function getPathToResources() {
  if (process.env.NODE_ENV === 'development')
    return `${process.cwd()}/resources`;
  return process.resourcesPath;
}
