import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import {
  Dialog,
  Input,
  Grid,
  Select,
  Button,
  DatePicker,
  Form
} from '@icedesign/base';

import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import { PchDialog } from 'components';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 7
    },
    wrapperCol: {
        span: 14
    }
};
const label =(name) => (
  <span><span className="label-required">*</span>{name}:</span>
);

const dataSource = [
        {label:'客户信息错误', value:'客户信息错误',type:'cancel'},
        {label:'客户信息修改', value:'客户信息修改',type:'change'},
        {label:'其他', value:'其他',type:'other'}
      ]

class DialogModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherReason:false,
      value:{}
    };
  }
  onOk() {
    this.refs.form.validateAll((errors, values) => {
      if(errors) {
        return
      };
      this.props.submit(values);
    });
  }
  selectedEvent(value,option) {
    if(option.type == 'other') {
      this.setState({
        otherReason:true
      })
    } else {
      this.setState({
        otherReason:false
      })
    }
  }
  render() {
      const { otherReason, value } = this.state;
      const { visible, onCancel } =this.props;
      return (
        <PchDialog
          title={'合同作废'}
          submitText="确认"
          cancelText="取消"
          visible={visible}
          onOk={()=>this.onOk()}
          onCancel={()=>onCancel()}
          footer={[]}>
          <div className="pch-form">
            <IceFormBinderWrapper ref="form" value={value}>
              <Form size="large" direction="hoz">
                <Row wrap>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label={label('请选择作废原因')}>
                      <IceFormBinder
                        required
                        message="请选择作废原因"
                        name="reason">
                          <Select
                            dataSource={dataSource}
                            size="large"
                            onChange={this.selectedEvent.bind(this)}/>
                      </IceFormBinder>
                      <div><IceFormError name="reason" /></div>
                    </FormItem>
                  </Col>
                  {
                    otherReason && <Col span={24}>
                                      <FormItem {...formItemLayout} label={label('请输入(200字符)')}>
                                        <IceFormBinder
                                          required
                                          message="请输入具体原因"
                                          name="memo">
                                            <Input size="large" multiple maxLength={200} hasLimitHint />
                                        </IceFormBinder>
                                        <div><IceFormError name="memo" /></div>
                                      </FormItem>
                                    </Col>
                  }
                </Row>
              </Form>
            </IceFormBinderWrapper>
          </div>
        </PchDialog>
    );
  }
}

export default DialogModule;
