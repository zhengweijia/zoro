import React, { Component } from 'react';
import './paste.css';

/**
 * 操作剪贴板, 触发 paste 事件
 * 
 * 可以从本地复制,然后粘贴到页面里:
 *  mac 能粘贴一张, windows 一张都不行
 *  网上有一个使用插件程序实现以上功能, 只是需要用户安装额外的程序; 访问 http://www.ncmem.com/products/wordpaster2.1/ckeditor4x/index.aspx
 * 
 * 拖动多张图片是直接能从剪切板里拿到的;
 * 
 * chrome 有 api 可以支持向用户申请读和写剪切板权限, 获得权限后就能代码操作剪切板了, 参考文章 https://juejin.im/post/5aaf427d518825557e78305d
 * 
 */
class Paste extends Component {

  constructor(p) {
    super(p);

    this.state = {
      imgList: [],
      strList: [],
    };

    navigator.permissions && navigator.permissions.query({
      name: 'clipboard-read'
    }).then(permissionStatus => {
      // permissionStatus.state 的值是 'granted'、'denied'、'prompt':
      console.log(`1111:${permissionStatus.state}`);
    
      // 监听权限状态改变事件
      permissionStatus.onchange = () => {
        console.log(`1111:${permissionStatus.state}`);
      };
    });

  }

  // m = require('../m.png')
  past(event){
    debugger;

    let items = (event.clipboardData || event.originalEvent.clipboardData).items;
    this.dealItem(items);
    // navigator.clipboard.readText().then(text => {
    //   console.log(`text: ${text}`);
    // });

  }
  drop(event) {
    event.preventDefault();
    event.stopPropagation();
    let items = event.dataTransfer.items;

    this.dealItem(items);
  }

  dealItem(items) {

    let formData = new FormData();
    let blobList = [];

    for (let item of items) {
      if (item.kind === 'file') {
        let blob = item.getAsFile();
        let reader = new FileReader();
        blobList.push(blob);
        reader.onload = ()=> {
          this.change(reader.result);
        }
        reader.readAsDataURL(blob);
      } else if(item.kind === 'string') {
        item.getAsString((s)=>{
          this.changeString(s);
        });
      }
    }
    formData.append('files[]', blobList);
    

    // this.upload(formData);
  }

  upload(data){
    let xhr = new XMLHttpRequest();
    // 上传结束
    xhr.onload = function () {
        // let json = JSON.parse(xhr.responseText);
    };
    xhr.open('POST', '/upload', true);
    xhr.send(data);
  }

  change(url) {
    this.state.imgList.push(url);
    this.setState({
      imgList:  this.state.imgList
    });
  }
  changeString(str) {
    this.state.strList.push(str);
    this.setState({
      str:  this.state.str
    });
  }

  drop_handler(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  }

  render() {
    return (
      <div className="App">
        {/* <div className='editableDiv' contentEditable="true" onPaste={this.past.bind(this)}  */}
        <div className='editableDiv' onPaste={this.past.bind(this)} 
        onDrop={this.drop.bind(this)} onDragEnter={this.drop_handler.bind(this)} onDragOver={this.drop_handler.bind(this)}>
          {this.state.imgList.map(item => (
            <img key={item} src={item} />
          ))}
          {this.state.strList.map(item => (
            <p key={item}>{item}</p>
          ))}
        </div>

        <img src={require("./m.png")} />
      </div>
    );
  }
}

export default Paste;
