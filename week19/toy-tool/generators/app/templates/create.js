import {enableGesture} from './gesture'

function create(Cls,attributes,...children){
  let o

  if(typeof Cls==='string'){
    o=new Wrapper(Cls)
  }else{
    o=new Cls({
      timer:{}
    })
  }
  
  for(let name in attributes){
    o.setAttribute(name,attributes[name]) 
  }

  let visit=(children)=>{
    for(let child of children){        
      if(typeof child ==='object' && child instanceof Array){
        visit(child)
        continue
      }else  if(typeof child==='string'){
        child=new Text(child)
      }
      o.appendChild(child)
    }
  }

  visit(children)
  
  return o
}

class Text{
  constructor(text){
    this.root=document.createTextNode(text)
  }

  mountTo(parent){
    parent.appendChild(this.root)
  }
}

class Wrapper{
  constructor(type){
    this.children=[]
    this.root=document.createElement(type)
  }

  get style(){
    return this.root.style
  }

  setAttribute(name,value){// attribbute
    this.root.setAttribute(name,value)    
    if(name.match(/^on([\s\S]+)$/)){
      let eventName = RegExp.$1.replace(/^[\s\S]/,c=>c.toLowerCase())
      this.addEventListener(eventName,value)
    }
    if(name === 'enableGesture'){
      enableGesture(this.root)
    }    
  }

  appendChild(child){
    this.children.push(child)
  }

  addEventListener(type,handler,config){
    this.root.addEventListener(...arguments)
  }

  mountTo(parent){
    parent.appendChild(this.root)

    for(let child of this.children){
      child.mountTo(this.root)
    }
  }
}

export { create, Text, Wrapper }