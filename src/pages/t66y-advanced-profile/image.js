import React, {Component} from "react";
import {connect} from "dva";
import {Card} from "antd";

@connect(({imageModel, loading}) => ({
  imageModel,
  loading: loading.effects['imageModel/fetchImage']
}))
class Image extends Component {

  componentDidMount() {
    const {dispatch, imageList, imageModel} = this.props;
    const {images} = imageModel;
    if (images === undefined) {
      dispatch({
        type: 'imageModel/fetchImage',
        payload: imageList
      });
    }
  };

  render() {
    const {imageModel, loading} = this.props;
    const {images} = imageModel;
    let imgs = [];
    if (loading === false) {
      imgs = images.map((b64, index) => (<p><img key={index} alt='' src={b64}/></p>));
    }
    return (<Card title="流程进度" style={{marginBottom: 24}} bordered={false}>
      {imgs}
    </Card>)
  }
}

export default Image;
