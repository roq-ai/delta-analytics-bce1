const mapping: Record<string, string> = {
  'csv-files': 'csv_file',
  groups: 'group',
  organizations: 'organization',
  themes: 'theme',
  'theme-groups': 'theme_group',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
