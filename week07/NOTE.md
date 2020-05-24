css 的顶层样式表由两种规则列表构成，一种被称为 at-rule，也就是 at 规则，另一种是 qualified rule，也就是普通规则。

- at-rule 由一个 @ 关键字和后续的区块组成，如果没有区块，则以分号结束
- qualified rule 则是普通的 css 规则，也就是由选择器和属性指定构成的规则

### at 规则

- @charset 用于提示 css 文件使用的字符编码方式

  ```css
  @charset "utf-8";
  ```

- @import 用于引入一个 css 文件

  ```css
  @import 'mystyle.css' @import url('mystyle.css');
  ```

- @media 能够对设备的类型进行一些判断

  ```css
  @media print {
    body {
      font-size: 10pt;
    }
  }
  ```

- @page 用于分页媒体访问页面时的表现设置

  ```css
  @page {
    size: 8.5in 11in;
    margin: 10%;
    @top-left {
      content: 'Hamlet';
    }
    @top-right {
      content: 'Page ' counter(page);
    }
  }
  ```

- @counter-style 产生一种数据，用于定义列表项表现

  ```css
  @counter-style triangle {
    system: cyclic;
    symbols: ‣;
    suffix: ' ';
  }
  ```

- @key-frames 产生一种数据，用于定义动画关键帧

  ```css
  @key-frames diagonal-slide {
    from {
      left: 0;
      top: 0;
    }
    to {
      left: 100px;
      top: 100px;
    }
  }
  ```

- @font-face 用于定义一种字体

  ```css
  @font-face {
    font-family: Gentium;
    src: url(http://example.com/fonts/Gentium.woff);
  }
  p {
    font-family: Gentium;
  }
  ```

- @support 检查环境特性，类似于 media

- @namespace 用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间

- @viewport 用于设置视口的一些特性，不过兼容性目前不是很好，多数时候被 HTML 的 meta 代替

- 还有一些目前不太推荐使用的 at 规则

### 普通规则

- 选择器

  - 元素选择器

    | 选择器       | 名称         | 描述                        |
    | :----------- | :----------- | :-------------------------- |
    | `*`          | 通配符选择器 | 选择所有元素                |
    | `E`          | 元素选择器   | 选择指定元素                |
    | `#idName`    | id 选择器    | 选择 id 为 IdName 的元素    |
    | `.className` | class 选择器 | 选择类名为 className 的元素 |

  - 关系选择器

    | 选择器 | 名称       | 描述                               |
    | :----- | :--------- | :--------------------------------- |
    | `E F`  | 包含选择器 | 选择所有包含在 E 元素中的 F 元素   |
    | `E>F`  | 子选择器   | 选择所有作为 E 元素子元素的 F 元素 |
    | `E+F`  | 相邻选择器 | 选择紧贴在 E 元素之后的 F 元素     |
    | `E~F`  | 兄弟选择器 | 选择 E 元素所有兄弟 F 元素         |

    **注意点：**

    - 子选择器不能选中孙辈，包含选择器，包含所有符合条件的后代；
    - 相邻选择器只会选中相邻的兄弟元素，而兄弟选择器会选中所有兄弟；
    - 在 Android Browser4.2.\*及以下，伪类选择器`:checked`与兄弟选择符一起使用会有一个 bug，[详情](https://github.com/doyoe/trip#user-content-checked-sibling-bug)。

  - 属性选择器

    | 选择器          | 描述                                                                                                     |
    | --------------- | -------------------------------------------------------------------------------------------------------- |
    | `E[att]`        | 选择具有 att 属性的 E 元素                                                                               |
    | `E[att='val']`  | 选择具有 att 属性且属性值等于 val 的 E 元素                                                              |
    | `E[att~='val']` | 选择具有 att 属性且属性值其中一个等于 val 的 E 元素（包含只有一个值且该值等于 val 的情况）               |
    | `E[att|='val']` | 选择具有 att 属性且属性值为以 val 开头并用连接符`-`分隔的字符串的 E 元素，如果属性值仅为 val，也将被选择 |
    | `E[att^='val']` | 选择具有 att 属性且属性值为以 val 开头的字符串的 E 元素                                                  |
    | `E[att$="val"]` | 选择具有 att 属性且属性值为以 val 结尾的字符串的 E 元素                                                  |
    | `E[att*="val"]` | 选择具有 att 属性且属性值为包含 val 的字符串的 E 元素                                                    |

  - 伪类选择器

    | 选择器                  | 描述                                                                              |
    | ----------------------- | --------------------------------------------------------------------------------- |
    | `E:link`                | 设置超链接 a 在未被访问前的样式                                                   |
    | `E:visited`             | 设置超链接 a 在已访问时的样式                                                     |
    | `E:hover`               | 设置元素鼠标在其悬停时的样式                                                      |
    | `E:active`              | 设置元素在被用户激活（在鼠标点击与释放之间发生的事件）时的样式                    |
    | `E:focus`               | 设置元素在成为输入焦点（该元素的 onfocus 事件发生）时的样式。(一般应用于表单元素) |
    | `E:checked`             | 匹配用户界面上处于选中状态的元素 E。(用于 input type 为 radio 与 checkbox 时)     |
    | `E:enabled`             | 匹配用户界面上处于可用状态的元素 E。(一般应用于表单元素)                          |
    | `E:disabled`            | 匹配用户界面上处于禁用状态的元素 E。(一般应用于表单元素)                          |
    | `E:empty`               | 匹配没有任何子元素（包括 text 节点）的元素 E                                      |
    | `E:root`                | 匹配 E 元素在文档的根元素。在 HTML 中，根元素永远是 HTML                          |
    | `E:not(s)`              | 匹配不含有 s 选择符的元素 E                                                       |
    | `E:first-child`         | 匹配父元素的第一个子元素 E                                                        |
    | `E:last-child`          | 匹配父元素的最后一个子元素 E                                                      |
    | `E:only-child`          | 匹配父元素仅有的一个子元素 E                                                      |
    | `E:nth-child(n)`        | 匹配父元素的第 n 个子元素 E                                                       |
    | `E:nth-last-child(n)`   | 匹配父元素的倒数第 n 个子元素 E                                                   |
    | `E:first-of-type`       | 匹配同类型中的第一个同级兄弟元素 E                                                |
    | `E:last-of-type`        | 匹配同类型中的最后一个同级兄弟元素 E                                              |
    | `E:only-of-type`        | 匹配同类型中的唯一的一个同级兄弟元素 E                                            |
    | `E:nth-of-type(n)`      | 匹配同类型中的第 n 个同级兄弟元素 E                                               |
    | `E:nth-last-of-type(n)` | 匹配同类型中的倒数第 n 个同级兄弟元素 E                                           |

    **注意点：**

    - 超链接的 4 中状态，需要有特定的书写顺序才能生效，hover 必须位于 link 和 visited 之后，visited 必须位于 hover 之后。

    - `E:first-child`选择符，E 必须是它的兄弟元素中的第一个，就是说 E 必须是父元素的第一个子元素。

    - `:not()`用法

      ```css
      // 除了最后一个li，每个都有底边线
      li:not(:last-child) {
        border-bottom: 1px solid #ccc;
      }
      ```

    - `:nth-child()`用法

      要使`E:nth-child(n)`生效，E 元素必须是某个元素的子元素，E 的父元素最高是 body，即 E 可以是 body 的子元素。`:first-child`、`:last-child`、`:only-child`、`:nth-last-child(n)`也是一样。
      `nth-child(n)`括号里的 n 可以是一个数字，一个关键字，或者一个公式。

    - 关于`:...-child`和`:...-of-type`的差异

      - E:first-of-type 总是能命中父元素的第 1 个为 E 的子元素，不论父元素第 1 个子元素是否为 E；而 E:first-child 里的 E 元素必须是它的兄弟元素中的第一个元素，否则匹配失效。E:last-of-type 与 E:last-child 也是同理。
        - E:nth-of-type(n)总是能命中父元素的第 n 个为 E 的子元素，不论父元素第 n 个子元素是否为 E；而 E:nth-child(n)会选择父元素的第 n 个子元素 E，如果第 n 个子元素不是 E，则是无效选择符，但 n 会递增。
        - 关于`:nth-child()`与`:nth-of-type()`的区别可以看 [这篇文章](http://www.zhangxinxu.com/wordpress/2011/06/css3选择器nth-child和nth-of-type之间的差异/)。

    - 用`:empty`区分空元素

      ```css
      // 不包含子元素的div
      div:empty
      // 包含子元素的div
      div:not(:empty)
      ```

  - 伪对象选择器

    | 选择器                             | 描述                                                       |
    | ---------------------------------- | ---------------------------------------------------------- |
    | `E:before`/`E::before`             | 在目标元素 E 的前面插入的内容。用来和 content 属性一起使用 |
    | `E:after`/`E::after`               | 在目标元素 E 的后面插入的内容。用来和 content 属性一起使用 |
    | `E:first-letter`/`E::first-letter` | 设置元素内的第一个字符的样式                               |
    | `E:first-line`/`E::first-line`     | 设置元素内的第一行的样式                                   |
    | `E::placeholder`                   | 设置元素文字占位符的样式。(一般用于 input 输入框)          |
    | `E::selection`                     | 设置元素被选择时的字体颜色和背景颜色                       |

    **注意点：**

    - `::placeholder`在使用时需要加上各个浏览器的前缀；除了 Firefox 是 `::[prefix]placeholder`，其他浏览器都是使用 `::[prefix]input-placeholder`。

- 声明：属性和值

  声明部分是一个由“属性：值”组成的序列。

  - 属性使用中划线、下划线、字母等组成的标识符。连续两个中划线开头的属性会被当做变量，与之配合的是 var 函数。

    ```css
    :root {
      --main-color: #06c;
      --accent-color: #006;
    }
    // 使用变量
    #foo h1 {
      coloe: var(--main-color);
    }
    ```

  - 值部分可以是下面的类型

    - CSS 范围的关键字：initial，unset，inherit，任何属性都可以的关键字
    - 字符串：比如 content 属性
    - URL：使用 url() 函数的 URL 值
    - 整数 / 实数：比如 flex 属性
    - 维度：单位的整数 / 实数，比如 width 属性。
    - 百分比：大部分维度都支持
    - 颜色：比如 background-color 属性
    - 图片：比如 background-image 属性
    - 2D 位置：比如 background-position 属性
    - 函数：来自函数的值，比如 transform 属性

  - css 支持的计算型函数

    - calc() 函数是基本的表达式计算，它支持加减乘除四则运算。在针对维度进行计算时，calc() 函数允许不同单位混合运算，这非常的有用。

      ```css
      section {
        float: left;
        margin: 1em;
        border: 1px solid #ccc;
        width: calc(100% / 3-2 * 1em-2 * 1px);
      }
      ```

    - max()、min() 和 clamp() 则是一些比较大小的函数，max() 表示取两数中较大的一个，min() 表示取两数之中较小的一个，clamp() 则是给一个值限定一个范围，超出范围外则使用范围的最大或者最小值。

    - toggle() 函数在规则选中多于一个元素时生效，它会在几个值之间来回切换，比如我们要让一个列表项的样式圆点和方点间隔出现，可以使用下面代码：

      ```css
      ul {
        list-style-type: toggle(circle, square);
      }
      ```

    - attr() 函数允许 CSS 接受属性值的控制
