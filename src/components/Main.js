import 'normalize.css/normalize.css';
import 'antd/dist/antd.css'
import 'styles/App.scss';
import {Button, Input, Alert} from 'antd'
import React from 'react';
const {TextArea} = Input;
const inputValid = (val) => {
  if (!val) return false;
  let judge = true;
  let string = (val.substr(0, 1) === '[' && val.substr(-1, 1) === ']') ? val.slice(1, -1) : val;
  let _arr = string.split(',');
  // 数组去掉后面的空的内容
  if (_arr[_arr.length - 1] === '') _arr.length = _arr.length - 1;
  const re = /^[0-9]+$/;
  // 检查数组的值是否符合
  _arr.forEach(item => {
    if (!re.test(item)) {
      judge = false;
    }
  });
  return judge ? _arr : false;
};
const arrValance = (arr) => {
  const left = (arr, index) => {
    let _left = 0;
    if (index == 0) {
      _left = +arr[0];
      return _left;
    }
    for (let i = 0; i < index; i++) {
      _left = _left + (+arr[index - 1 - i])
    }
    return _left;
  };
  const right = (arr, index) => {
    let _right = 0;

    if (index == arr.length - 1) {
      _right = +arr[arr.length - 1];
      return _right;
    }
    for (let i = index + 1; i < arr.length; i++) {

      _right = _right + (+arr[i]);
    }
    return _right;
  };
  let key = -1;
  let leftNumber = 0;
  let rightNumber = 0;
  for (let i = 0; i < arr.length; i++) {
    leftNumber = left(arr, i);
    rightNumber = right(arr, i);
    if (leftNumber == rightNumber) {
      key = i;
    }
  }
  return key;
}
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWarningMessage: '',
      arr: []
    }
  }

  handleSubmit = () => {
    let result = arrValance(this.state.arr)
    alert('平衡点为' + result)
  };
  inputChange = (event) => {
    const val = event.target.value;
    const _arr = inputValid(val);
    if (_arr) {
      this.setState({arr: _arr, isWarningMessage: false})
    } else {
      this.setState({isWarningMessage: '填写内容不符合规范，无法计算。'})
    }
  };

  render() {
    return (
      <div className="index">
        <h2 className="mg-b-sm">计算数组平衡点</h2>
        <p>平衡点：它左边所有的数字之和===右边所有数字之和。</p>
        <p className="mg-b-sm">例如：arr = [1，2，3，0，6]这个数组中， 0所在的位置是“平衡位”， 因为左边数字之和 1+2+3=6右边数字之和6=60所在的位置下标为3。</p>
        <TextArea onChange={this.inputChange}
                  className="mg-b-sm" ref="text"
                  placeholder="请填写一个数组；如：[1,3,4,2,3,6,5,3,1,2]；或一个以逗号分开的字符串" autosize/>
        {this.state.isWarningMessage && <Alert message={this.state.isWarningMessage} type="warning"/>}
        <div className="mg-t-sm">

          <Button type="primary"
                  disabled={this.state.isWarningMessage}
                  onClick={() => {
                    this.handleSubmit()
                  }}
          >开始计算</Button>
        </div>
      </div>
    );
  }
}

export default AppComponent;
