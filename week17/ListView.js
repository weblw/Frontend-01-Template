import {create, Text, Wrapper} from './create'

export class ListView {
  constructor(config){
    this.children=[]
    this.attributes=new Map()
    this.properties=new Map()
  }

  setAttribute(name,value){// attribute
    this[name]=value
  }

  getAttribute(name){// attribute
    return this[name]
  }

  appendChild(child){
    this.children.push(child)
  }

  select(i) {
    console.log(i)
    for(let view of this.childViews) {
      view.style.display = 'none'
    }
    this.childViews[i].style.display = ''
    // this.titleView.innerText = this.children[i].title

    for(let view of this.titleViews) {
      view.classList.remove('selected')
    }
    this.titleViews[i].classList.add('selected')
  }

  render(){
    let data = this.getAttribute('data')
    return <div class='list-view' style='width:300px;'>
      {
        data.map(this.children[0])
      }
    </div>
  }

  mountTo(parent){
    this.render().mountTo(parent)
  }
}