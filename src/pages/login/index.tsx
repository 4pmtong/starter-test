import { Button, Col, Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import logo from '@/assets/logo.svg';
import * as React from 'react';
import { login } from '@/services/api';
import { setToken, setStore } from '@/utils/auth';
import './style.scss';

const FormItem = Form.Item;

class Login extends React.PureComponent<FormComponentProps> {
  public state = {
    loading: false,
    validateCode: '',
    userNameFeedback: false,
    passwordFeedback: false,
    validateCodeFeedback: false
  };

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields(
      (err, { userName, password, validateCode }): void => {
        this.setState({
          userNameFeedback: !userName,
          passwordFeedback: !password,
          validateCodeFeedback: !validateCode
        });
        if (!err) {
          this.setState({
            loading: true
          });
          login({
            name: userName,
            password,
            validateCode
          })
            .then(res => {
              const { code } = res.data;
              if (code === 0) {
                setToken('token');
                setStore('userInfo', {
                  id: 1,
                  name: 'Super Admin'
                });
                window.location.href = '/';
              } else {
                this.refresh();
              }
            })
            .finally(() => {
              this.setState({
                loading: false
              });
            });
        }
      }
    );
  };

  public refresh = () => {
    this.setState({
      validateCode: `getValidateCode?${+new Date()}`
    });
  };
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-wrapper">
        <div className="login-top">
          <div className="login-top_logo">
            <img src={logo} className="logo" alt="logo" />
          </div>
          <h3 className="login-top_des">Tidal</h3>
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Username can not be empty' }]
            })(
              <Input
                prefix={<Icon type="user" />}
                placeholder="please enter user name"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Password can not be blank' }]
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="please enter your password"
              />
            )}
          </FormItem>
          <FormItem>
            <Col span={17}>
              <FormItem>
                {getFieldDecorator('validateCode', {
                  rules: [
                    {
                      required: true,
                      message: 'Verification code must be filled'
                    }
                  ]
                })(
                  <Input placeholder="please enter the verification code on the right" />
                )}
              </FormItem>
            </Col>
            <Col span={6} offset={1}>
              <img
                onClick={this.refresh}
                style={{ width: '100%', cursor: 'pointer' }}
                src={this.state.validateCode}
                alt="VerificationCode"
              />
            </Col>
          </FormItem>
          <FormItem className="login-form-item-button">
            <Button
              loading={this.state.loading}
              type="primary"
              htmlType="submit"
              className="login-form-button">
              Login
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
