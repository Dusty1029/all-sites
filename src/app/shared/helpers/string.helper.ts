export function format(template: string, params: any): string {
  return template.replace(/{(.*?)}/g, (_, key) => params[key]);
}