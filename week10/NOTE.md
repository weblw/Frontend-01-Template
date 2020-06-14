# 第十周总结

## `Range API`

**核心`API`**

- `var range =new Range()`
- `range.setStart(element,9)`
- `range.setEnd(element,4)`
- `var range=document.getSelection().getRangeAt(0)`

**辅助`API`**

- `range.setStartBefore`
- `range.setEndBefore`
- `range.setStartAfter`
- `range.setEndAfter`
- `range.selectNode`
- `range.selectNodeContents`

**使用**

- `var fragment=range.extractContents()`获取代码片段
- `range.insertNode(document.createTextNode('aaaa'))`直接插入节点

## `CSSOM`

### `document.styleSheet`

```html
<style title="Hello">
  a {
    color: red;
  }
</style>
<!-- data URI 写成内链形式 {}需要转义 -->
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">
```

### `Rules`

- `document.styleSheets[0].cssRules`
- `document.styleSheets[0].insertRule("p{color:pink}",0)`
- `document.styleSheets[0].removeRule(0)`

### `Rule`

- `CSSStyleRule`
  - `selectorText String`
  - `style K-V`结构
- `CSSChartsetRule`
- `CSSImportRule`
- `CSSMediaRule`
- `CSSFontFaceRule`
- `CSSPageRule`
- `CSSNamespaceRule`
- `CSSKeyframesRule`
- `CSSKeyframeRule`
- `CSSSupportsRule`

- . . . 

### `getComputedStyle`

- `window.getComputedStyle(elt,pseudoElt);`
  - `elt` 想要获取的元素
  - `pseudoElt` 可选，伪元素

### `CSSOM View`

### 所有`API`













