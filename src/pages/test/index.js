import React, {Component} from 'react';
import {connect} from 'dva';
import {formatMessage, FormattedMessage} from 'umi/locale';
import {Login} from "ant-design-pro";

const {Tab, UserName, Password, Mobile, Captcha, Submit} = Login;

@connect(({test, loading}) => ({
  test,
}))
class Test extends Component {


  handleSubmit = (err, values) => {
    console.log(err.toString());

    const {dispatch} = this.props;
    dispatch({
      type: 'test/testf',
      payload: {
        ...values,
      },
    });

    if (!err) {

      console.log("tst");

    }
  };

  render() {
    const {test} = this.props;
    return (
      <div>
        <Submit onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default Test;
