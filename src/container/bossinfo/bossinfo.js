
import React from 'react';
import { NavBar, InputItem, TextareaItem, Button  } from 'antd-mobile';
import AvatarSelector from '../../components/avatar-selector/avatar-selector';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { update } from '../../redux/user.redux';
 
@connect(
  state => state.user,
  {update}
)
class BossInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: ''
    }
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (<div>
      {redirect !== path && this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
      <NavBar mode="dark" >Boss 信息</NavBar>
      <AvatarSelector selectAvatar={imgName => {
        this.setState({
          avatar: imgName
        })
      }}></AvatarSelector>
      <InputItem onChange={(v) => this.onChange('title', v)}>招聘职位</InputItem>
      <InputItem onChange={(v) => this.onChange('company', v)}>公司名称</InputItem>
      <InputItem onChange={(v) => this.onChange('money', v)}>职位薪资</InputItem>
      <TextareaItem onChange={(v) => this.onChange('desc', v)} 
      row={3} title='职位要求' autoHeight></TextareaItem>
      <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
    </div>)
  }
}

export default BossInfo;