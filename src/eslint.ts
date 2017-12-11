export function getFixableRules(rules: object, enabledRules: Map<string, any>) {
  const fixableRules = {};
  for (const [name, { meta: { fixable } }] of enabledRules) {
    if (fixable && rules.hasOwnProperty(name)) {
      fixableRules[name] = rules[name]
    }
  }

  return fixableRules;
}
