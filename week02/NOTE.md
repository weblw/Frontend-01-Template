# 极客时间—前端训练营

# 第二周学习总结

## 编程语言通识

### 名词概念

- 乔姆斯基谱系：是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。它有四个层次：
  - 0-型文法：无限制文法或者短语结构文法，包括所有的文法。
  - 1-型文法：上下文相关文法，生成上下文相关语言。
  - 2-型文法：上下文无关文法，生成向下文无关语言。
  - 3-型文法：正则文法，生成正则语言。

- 巴科斯诺尔范式：英语：`Backus Normal Form`，缩写为`BNF`是一种用于表示上下文无关文法的语言。

- 图灵机：是英国数学家艾伦·图灵于 1936 年提出的一种将人的计算行为抽象掉的数学逻辑机，其更抽象的意义为一种`计算模型`，可以看作等价于任何有限逻辑数学过程的`终极强大逻辑机器`。
- 图灵完备性：在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指`具有无限存储能力的通用物理机器或编程语言`。

### 编程语言按照语法分类

- 非形式语言
  - 中文、英文
- 形式语言
  - 0型：无限制文法
    - 等号左边不止一个 `<a><b>::="c"` `?::=?`
  - 1型：上下文相关文法
    - `"a"<b>"c"::="a""x""c"` `?<A>?::=?<B>?`
  - 2型：上下文无关文法
    - `javascript`大部分是上下文无关 `<A>::=?`
  - 3型：正则文法
    - 限制表达能力 `<A>::=<A>?`

### 产生式

- 概念：在计算机中指 编译器将源程序经过词法分析和语法分析后得到的一系列符合文法规则（`Backus-Naur Form，BNF`）的语句。
- 用尖括号括起来的名称表示语法结构名
- 语法结构分成基础结构和需要用其他语法结构定义的复合结构
  - 基础结构成为终结符
  - 复合结构成为非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- \* 表示重复多次
- | 表示或
- \+ 表示至少一次

```txt
"a"
"b"
<Program>:="a"+ | "b"+ // aaa...bbb...
// 递归
<Program>:=<Program> "a"+ | <Program> "b"+ // abaabbaa...
<Program>: = ("a"+ | <Program> "b"+)+ // a | aabbbaabbb...

// 整数连加
"+"
<Number>: "0" | "1"...."9" // 0,1,2,...9
<DecimalNumber>: "0" | (("1"~"9") <Number>+) // 0 | 10112 | 21223
<Expression>: <DecimalNumber> ("+" <DecimalNumber>)+ // 1+2+3....

// 四则运算
<PrimaryExpression> = <DecimalNumber> | "(" <LogicalExpression> ")"

<MutiplicativeExpression> = <PrimaryExpression> |
	<MutiplicativeExpression> "*" <PrimaryExpression> |
	<MutiplicativeExpression> "/" <PrimaryExpression>
	
<AdditiveExpression> = <MutiplicativeExpression> |
	<AdditiveExpression> "+" <MutiplicativeExpression> |
	<AdditiveExpression> "-" <MutiplicativeExpression>
	
// 逻辑判断
<LogicalExpression> = <AdditiveExpression> |
	<LogicalExpression> "||" <AdditiveExpression> |
	<LogicalExpression> "&&" <AdditiveExpression>

```

- 终结符，引号括起来的，如："+"
- 非终结符，尖括号括起来的，如：<Program>

### 图灵完备性

- 命令式——图灵机
  - `goto`
  - `if while`
- 声明式——`lambda`
  - 递归
  - 分治

### 类型系统

- 静态语言/动态语言([参考链接](https://www.cnblogs.com/raind/p/8551791.html)）
  - 静态语言：在编译时变量的数据类型即可确定的语言，多数静态语言要求在使用变量之前必须声明数据类型。如`C++、Java、Delphi、C#`等。
  - 动态语言：在运行时确定数据类型的语言，变量在使用之前不需要类型声明，通常变量的类型是被赋值的那个值的类型。如`PHP/ASP/Ruby/Python/Perl/ABAP/SQL/JavaScript/Unix Shell`等。
- 强类型/弱类型
  - 强类型：强制数据类型的语言，也就是说，一旦一个变量被指定了某个数据类型，如果不经过强制转换，那么它永远就是这个数据类型了。
  - 弱类型：数据类型可以被忽略的语言，它与强类型语言相反，一个变量可以赋不同数据类型的值。
  - 两者区别
    - 强类型语言是一旦变量的类型被确定，就不能转化的语言，`无隐式转换`。
    - 弱类型语言则反之，一个变量的类型是由其应用上下文确定的，`有隐式转换`。
  - 各自优势
    - 静态语言优势：由于类型的强制声明，使得`IDE`有很强的代码感知能力，故，在实现复杂的业务逻辑、开发大型商业系统、以及那些生命周期很长的应用中，依托`IDE`对系统的开发很有保障；由于静态语言相对比较封闭，使得第三方开发包对代码的侵害性可以降到最低。
    - 动态语言优势：思维不受束缚，可以任意发挥，把更多的精力放在产品本身上；集中思考业务逻辑实现，思考过程即实现过程。
- 复合类型
  - 结构体/函数签名
- 子类型
  - 逆变/协变（[参考链接](https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html#一个有趣的问题)）

### 命令式编程语言结构

- `Atom`：原子
- `Identifier`：变量
  - `Literal`：直接量
- `Expression`：表达式
- `Atom`：原子
  - `Operator`：运算符
  - `Punctuator`：符号
- `Statement`：语句
- `Expression`：表达式
  - `Keyword`：关键字
  - `Punctuator`：符号
- `Structure`：结构化
  -  `Function`：函数
  -  `Class`：类
  -  `Process`：执行过程
  -  `Namespace`：命名空间
- `Program`：程序
  - `Program`：程序
  - `Module`：模块
  - `Package`：包
  - `Library`：库


## `Javascript`词法、类型

### 预备知识：`Unicode`字符集

- [Blocks](https://www.fileformat.info/info/unicode/block/index.htm) 编码组

  -  `0 ~ U+007F`：常用拉丁字符
    - `String.fromCharCodeAt(num)`
  - `U+4E00 ~ U+9FFF`：`CJK ChineseJapaneseKorean`三合一
    - 有一些增补区域（`extension`）
  - `U+0000 - U+FFFF`：[BMP]([https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84](https://zh.wikipedia.org/wiki/Unicode字符平面映射)) 基本平面

- [Categories](https://www.fileformat.info/info/unicode/category/index.htm)

  - [space空格系列](https://www.fileformat.info/info/unicode/category/Zs/list.htm)

- 实践（中文变量名）

  - 因涉及到文件的编码保存方式，使用 `\u十六进制unicode`

  - 转译（`'厉'.codeCodeAt().toString(16)`）

### `Atom`词

#### `InputElement`

- `whiteSpace`（可查阅 `unicode` [space列表](https://www.fileformat.info/info/unicode/category/Zs/list.htm)）
  - `Tab`：制表符（打字机时代：制表时隔开数字很方便）
  - `VT`：纵向制表符
  - `FF: FormFeed`
  - `SP: Space`
  - `NBSP: NO-BREAK SPACE`（和 SP 的区别在于不会断开、不会合并）
  - ...
- `LineTerminator` 换行符
  - `LF: Line Feed \n`
  - `CR: Carriage Return \r`
  - ...
- `Comment` 注释
- `Token`记号：一切有效的东西
  - `Punctuator`: 符号 比如 `> = < }`
  - `Keywords`：比如 `await`、`break`... 不能用作变量名，但像 `getter` 里的 `get`就是个例外
  - `IdentifierName`：标识符，可以以字母、_ 或者 $ 开头，代码中用来标识**[变量](https://developer.mozilla.org/en-US/docs/Glossary/variable)、[函数](https://developer.mozilla.org/en-US/docs/Glossary/function)、或[属性](https://developer.mozilla.org/en-US/docs/Glossary/property)**的字符序列
    - 变量名不能用 `Keywords`
    - 可以用 `Keywords`
  - `Literal`: 直接量
    - `Number`
      - 存储 `Uint8Array`、`Float64Array`
      - 各种进制的写法：二进制`0b`、八进制`0o`、十进制`0x`
      - 实践：比较浮点是否相等：`Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON`
    - `String`
      - `Character`
      - `Code Point`
      - `Code Point`：`unicode`编码 - `utf`，`utf-8` 可变长度 （控制位的用处）
      - `Grammar`：`''`、`""`、``` `
    - `Boolean`
    - `Null`
    - `Undefined`

### 小作业

- 写一个正则 匹配所有`Number`直接量
  - 二进制：`(^0b1[0|1]+)`
  - 八进制：`(^0[1-7][0-7]+)`
  - 十进制：`([1-9][0-9]+)`
  - 十六进制：`(^0x[1-9a-fA-F][0-9a-fA-F]+)`
- 完成 `UTF8__Encoding` 的函数
- 写一个正则表达式来匹配字符串









