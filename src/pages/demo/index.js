import React, {Component} from 'react';
import {connect} from 'dva';
import {formatMessage, FormattedMessage} from 'umi/locale';
import {Button, Input} from "antd";

// connect model namespace
@connect(({demo}) => ({
  demo,
}))
class Demo extends Component {


  handleSubmit = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'demo/process',
      payload: {
        data: document.getElementById("input").value
      },
    });
  };

  render() {
    let data = this.props.demo.data;
    return (
      <div>
        <Input placeholder={data} disabled={true}/>
        <Input id="input"/>
        <Button onClick={this.handleSubmit}/>
      </div>
    );
  }
}

export default Demo;
