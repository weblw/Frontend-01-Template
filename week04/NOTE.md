# 极客时间—前端训练营

# 第四周学习总结

## `JS`执行粒度

- 宏任务（`setTimeout`）
- 微任务（`Promise`）
- 函数调用（`Execution Context`）
- 语句/声明
- 表达式
- 直接量/变量/this ...

## `Realm`

- `JS Context => Realm`
- 宏任务（`setTimeout`）
- 微任务（`Promise`）
- 函数调用（`Execution Context`）
- 语句/声明
- 表达式
- 直接量/变量/this ...

## 函数调用

函数调用的时候会有 `Execution Context Stack`保存函数变量环境

`Execution Context`:

- `Code evaluation state`：用于恢复代码执行位置
- `Funtion`：执行的任务是函数时使用，表示正在被执行的函数
- `Script or Module`：执行的任务是脚本或者模块时使用，表示正在被执行的代码
- `Generator`：仅生成器上下文有这个属性，表示当前生成器
- `Realm`：使用基础库和内置对象实例
- `LexicalEnvironment`：词法环境，当获取this或者变量值时使用
- `VariableEnvironment`：变量环境，当变量声明时使用

### `LexicalEnvironment`词法环境

- this
- `new.target`
- super
- 变量

### `VariableEnvironment`变量环境

`VariableEnvironment`是个历史遗留的包袱，仅仅用于处理var声明。

### `Environment Record`

- - `Function Environment Record`
  - `module Environment Record`
- `Global Environment Record`
- `Object Environment Record`

### `Function Closure`

函数导出时会携带它执行的词法环境

### `Realm`

- 在`JS`中，函数表达式和对象直接量均会创建对象。

- 使用.做隐式转换也会创建对象。

- 这些对象也是有原型的，如果我们没有`Realm`，就不知道它们的原型是什么。
- 对不同 Realm 中的对象操作，会有一些需要格外注意的问题，比如 `nstanceOf `几乎是失效的。

```javascript
var iframe=document.createElement('iframe')
document.documentElement.appendChild(iframe)
iframe.scr="javascript:var b={}"

var b1=iframe.contentWindow.b
var b2={}

console.log(typeof b1,typeof b2)// object object

console.log(b1 instanceof Object,b2 instanceof Object) // false true
```

## 作业

```html
<!DOCTYPE html>
<script>
  var set = new Set()
  var objects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect
  ]
  objects.forEach(o => set.add(0))
  for (var i = 0; i < objects.length; i++) {
    var o = objects[i]
    for (var p of Object.getOwnPropertyNames(o)) {
      var d = Object.getOwnPropertyDescriptor(o, p)
      if ((d.value !== null && typeof d.value === 'object') || (typeof d.value === 'function'))
        if (!set.has(d.value))
          set.add(d.value), objects.push(d.value)
      if (d.get)
        if (!set.has(d.get))
          set.add(d.get), objects.push(d.get)
      if (d.set)
        if (!set.has(d.set))
          set.add(d.set), objects.push(d.set)
    }
  }
  console.log(set)
</script>
```

```html
<!DOCTYPE html>
<script>
  let set = new Set()
  let current
  var globalProperties = [
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "Array",
    "Date",
    "RegExp",
    "Promise",
    "Proxy",
    "Map",
    "WeakMap",
    "Set",
    "WeakSet",
    "Function",
    "Boolean",
    "String",
    "Number",
    "Symbol",
    "Object",
    "Error",
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8ClampedArray",
    "Atomics",
    "JSON",
    "Math",
    "Reflect"
  ]
  var queue = []
  for (var p of globalProperties) {
    queue.push({
      path: [p],
      object: this[p]
    })
  }
  while (queue.length) {
    current = queue.shift()
    console.log(current.path.join('.'))
    if (set.has(current.object))
      continue
    set.add(current.object)
    for (let p of Object.getOwnPropertyNames(current.object)) {
      var property = Object.getOwnPropertyDescriptor(current.object, p)
      if (property.hasOwnProperty('value') &&
        ((property.value !== null) && (typeof property.value === 'object') || (typeof property.value === 'object')) &&
        property.value instanceof Object
      )
        queue.push({
          path: current.path.concat([p]),
          object: property.value
        })
      if (property.hasOwnProperty('get') && (typeof property.get === 'function'))
        queue.push({
          path: current.path.concat([p]),
          object: property.get
        })
      if (property.hasOwnProperty('set') && (typeof property.set === 'function'))
        queue.push({
          path: current.path.concat([p]),
          object: property.set
        })
    }
  }
</script>
```

