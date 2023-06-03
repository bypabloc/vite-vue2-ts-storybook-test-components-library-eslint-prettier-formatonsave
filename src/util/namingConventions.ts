export default (str: string, type: string) => {
  interface ObjectFunction {
    [key: string]: Function
    default: Function
  }

  const types: ObjectFunction = {
    camelCase: (str: string) => {
      return str.replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
      )
    },
    PascalCase: (str: string) => {
      return str.replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
      )
    },
    snake_case: (str: string) => {
      return str.replace(/([A-Z])/g, (group) => '_' + group.toLowerCase())
    },
    'kebab-case': (str: string) => {
      return str.replace(/([A-Z])/g, (group) => '-' + group.toLowerCase())
    },
    UPPER_CASE: (str: string) => {
      return str.toUpperCase()
    },
    default: (str: string) => {
      return str
    },
  }

  const convert: Function = types[type] || types.default

  return convert(str)
}
