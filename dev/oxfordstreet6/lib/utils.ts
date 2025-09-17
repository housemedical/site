export function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(' ');
}

/** Ensures external links use security attributes. */
export function externalProps() {
  return { target: "_blank", rel: "noopener noreferrer" };
}
