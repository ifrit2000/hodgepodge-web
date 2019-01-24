import React, {Component, Fragment} from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import {connect} from 'dva';
import {Button, Col, Dropdown, Icon, Menu, Row,} from 'antd';
import {DescriptionList} from 'ant-design-pro';
import PageHeaderWrapper from './components/PageHeaderWrapper';
import styles from './style.less';
import Image from "@/pages/t66y-advanced-profile/image";

const {Description} = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth && document.documentElement.clientWidth;

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const action = (
  <Fragment>
    <ButtonGroup>
      <Button>操作</Button>
      <Button>操作</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>
          <Icon type="ellipsis"/>
        </Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">主操作</Button>
  </Fragment>
);

const extra = (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}>待审批</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>订单金额</div>
      <div className={styles.heading}>¥ 568.08</div>
    </Col>
  </Row>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="创建人">曲丽丽</Description>
    <Description term="订购产品">XX 服务</Description>
    <Description term="创建时间">2017-07-07</Description>
    <Description term="关联单据">
      <a href="">12421</a>
    </Description>
    <Description term="生效日期">2017-07-07 ~ 2017-08-08</Description>
    <Description term="备注">请于两个工作日内确认</Description>
  </DescriptionList>
);


@connect(({t66yDetail, loading}) => ({
  t66yDetail,
  loading: loading.effects['t66yDetail/fetchAdvanced'] || loading.effects['t66yDetail/fetchTopicDetail'],
}))
class AdvancedProfile extends Component {
  state = {};

  componentDidMount() {
    const {dispatch} = this.props;
    const topicId = this.props.location.query.topicId;
    dispatch({
      type: 't66yDetail/fetchTopicDetail',
      payload: {topicId}
    });


    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, {passive: true});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const {stepDirection} = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    const {t66yDetail, loading} = this.props;
    const {topic = {}} = t66yDetail;

    // if (loading === false) {
    //   // https://www.cnblogs.com/huzidaha/articles/6598442.html
    //   image =;
    // }

    return (
      <PageHeaderWrapper
        title={topic.topicTitle}
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"/>
        }
        action={action}
        content={description}
        extraContent={extra}
        loading={loading}
      >
        <Image imageList={topic.imageDTOList}/>
      </PageHeaderWrapper>
    );
  }
}

export default AdvancedProfile;
