import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import imoocForm from '../../components/imooc-form/imooc-form';
/* function Wrapper(Comp) {
  class WrapperComp extends Comp{
    componentDidMount() {
      console.log('高阶组件新增的生命周期')
    }
    render() {
      return <Comp></Comp>
    }
  }
  return WrapperComp;
}

@Wrapper
class Hello extends React.Component{
  render() {
    return <div>Hello</div>
  }
}
 */

@connect(
  state => state.user,
  {login}
)
@imoocForm
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  register() {
    this.props.history.push('./register')
  }
  handleLogin() {
    this.props.login(this.props.state); 
  }
  render() {
    return( 
    <div>
        {this.props.redirectTo && this.props.redirectTo!== '/login' ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo></Logo>
        <WhiteSpace />
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
            <WhiteSpace />
            <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type="primary">登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
    </div>  
  )
  }
}

export default Login;