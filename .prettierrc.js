module.exports = {
  // 是否在语句末尾添加分号
  semi: true,
  // 是否使用单引号而不是双引号
  singleQuote: true,
  // 缩进的空格数
  tabWidth: 2,
  // 每行的最大字符数
  printWidth: 120,
  // 是否在多行元素的最后一行放一个括号
  bracketSameLine: true,
  // 箭头函数的参数是否总是用括号包裹
  arrowParens: 'always',
  // 在JSX中是否使用单引号而不是双引号
  jsxSingleQuote: true,
  // 在对象字面量中是否添加空格，例如 { foo: bar }
  bracketSpacing: true,
  // 使用制表符而不是空格缩进行
  useTabs: true,
  // 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
  quoteProps: 'as-needed',
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
  rangeStart: 0,
  rangeEnd: Infinity,
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准 always\never\preserve
  proseWrap: 'preserve',
  // 指定HTML文件的全局空格敏感度 styles\strict\ignore
  htmlWhitespaceSensitivity: 'css',
  // Vue文件脚本和样式标签缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: 'lf',
};
