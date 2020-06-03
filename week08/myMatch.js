function match(element, selector) {
  if (!selector || !element.attributes) {
    return false
  }
  let regId = /(#\w+)+/g
  let regClass = /(\.\w+)+/g
  let resId = selector.match(regId)
  let resClass = selector.match(regClass)

  // 处理多 class 选择器情况
  if (resClass) {
    let resClassArr = [] // style class selector数组
    for (let i = 0; i < resClass.length; i++) {
      // 处理 .cls1#id.cls2 匹配出来的 ['.cls1','.cls2']情况
      let tempArr = resClass[i].split('.')
      for (let j = 1; j < tempArr.length; j++) {
        // 索引从1开始，因为分隔后的数组为 ['','cls1','cls2']
        resClassArr.push(tempArr[j])
      }
    }
    let classAttr = element.attributes.filter(attr => attr.name === 'class')
    let classAttrRes = []
    // 元素 attr class 数组 classAttr:[{name:'class',value:'cls1 cls2'}]
    if (classAttr && classAttr[0]) {
      classAttrRes = classAttr[0]['value'].split(' ')
    }
    let tempFlag = null
    for (let i = 0; i < resClassArr.length; i++) {
      tempFlag = false
      let k = 0
      for (; k < classAttrRes.length; k++) {
        if (classAttrRes[k] === resClassArr[i]) {
          tempFlag = true
          break
        }
      }
      if (!tempFlag && k === classAttrRes.length) {
        return false;
      }
    }
  }

  // 先处理 id 选择器 + 类型选择器特殊情况
  if (resId && resId[0].charAt(0) === '#') {
    // id选择器有标识符#，因此可以出现在任意位置，需要用正则去匹配
    const attr = element.attributes.filter(attr => attr.name === 'id')[0]
    if (attr && attr.value === resId[0].replace('#', '')) {
      return true
    } else {
      return false
    }
  } else if (selector.charAt(0) !== '#' && selector.charAt(0) !== '.') {
    // 只需要判断选择器开头是不是非 id选择器的标识符 # 或者 class选择器的标识符 .
    if (element.tagName === selector) {
      return true
    } else {
      return false
    }
  } else if (resClass && resClass.length) {
    return true
  }
  return false
}

function specificity(selector) {
  const p = [0, 0, 0, 0]
  const selectorParts = selector.split(' ')
  let regClass = /(\.\w+)+/g
  let resClass = selector.match(regClass)
  if (resClass && resClass.length) {
    for (let i = 0; i < resClass.length; i++) {
      let tempArr = resClass[i].split('.')
      for (let j = 1; i < tempArr.length; j++) {
        p[2]++
      }
    }
  }
  for (let part of selectorParts) {
    let regId = /(#\w+)+/g
    let resId = part.match(regId)
    if (resId && resId[0].charAt(0) === '#') {
      p[1]++
    } else if (selector.charAt(0) !== '#' && selector.charAt(0) !== '.') {
      p[3]++
    }
  }
  console.log('selector', selector)
  console.log('p', p)
  return p
}