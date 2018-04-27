import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 12
    }
};
//获取下拉
import { company_type } from '../../../config'
import { Field } from '@icedesign/base/index';

export default class Filter extends Component {
    field = new Field(this);
    constructor() {
        super();

        // 搜索框表单的对应的值，可以设置默认值
        this.state = {
            value: {
                type: '10',
                lenderType: '10',
                name: '',
            }
        };
    }

    handleAdd() {
        let path = {
            pathname: 'process/add',
            state: this.state.value
        }
        hashHistory.push(path)
    }

    filterFormChange = (value) => {
        this.setState({
            value: value,
        });
    }

    handleSubmit() {
        this.props.onSubmit && this.props.onSubmit(this.state.value);
    }

    render() {
      const init = this.field.init;
        return (
            <div className="pch-condition">
                <IceFormBinderWrapper value={this.state.value} onChange={this.filterFormChange}>
                    <Form size="large" direction="hoz">
                        <Row wrap>
                            <Col xxs={24} xs={12} l={8} xl={8}>
                          <FormItem {...formItemLayout} label="业务类型：">
                              <IceFormBinder
                                name="productCode"
                              >
                              <Input size="large" placeholder="贷款编号" />
                            </IceFormBinder>
                          </FormItem>
                        </Col>
                            <Col xxs={24} xs={12} l={8} xl={8}>
                              <FormItem {...formItemLayout} label="贷款状态：">
                                <IceFormBinder
                                  name="borrowerMobile"
                                >
                                  <Input size="large" placeholder="贷款状态" />
                                </IceFormBinder>
                              </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={8}>
                              <FormItem {...formItemLayout} label="主贷人姓名：">
                                <IceFormBinder
                                  name="borrowerName"
                                >
                                  <Input size="large" placeholder="主贷人姓名" />
                                </IceFormBinder>
                              </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={8}>
                              <FormItem {...formItemLayout} label="证件号码：">
                                <IceFormBinder
                                  name="borrowerID"
                                >
                                  <Input size="large" placeholder="证件号码" />
                                </IceFormBinder>
                              </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={8}>
                              <FormItem {...formItemLayout} label="手机号码：">
                                <IceFormBinder
                                  name="borrowerID"
                                >
                                  <Input size="large" placeholder="手机号码" />
                                </IceFormBinder>
                              </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={8}>
                              <FormItem {...formItemLayout} label="申请金额：">
                                <IceFormBinder
                                  name="borrowerID"
                                >
                                  <Input size="large" placeholder="申请金额" />
                                </IceFormBinder>
                              </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={8}>
                              <FormItem {...formItemLayout} label="贷款产品：">
                                <IceFormBinder
                                  name="borrowerID"
                                >
                                  <Input size="large" placeholder="贷款产品" />
                                </IceFormBinder>
                              </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={8}>
                              <FormItem {...formItemLayout} label="展厅名称：">
                                <IceFormBinder
                                  name="borrowerID"
                                >
                                  <Input size="large" placeholder="展厅名称" />
                                </IceFormBinder>
                              </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={8}>
                              <FormItem {...formItemLayout} label="申请开始时间：">
                                <IceFormBinder
                                  name="startTime"
                                >
                                  <DatePicker
                                    format={"YYYY-MM-DD"}
                                    size="large"
                                    style={{width:"100%"}}
                                    placeholder="申请开始时间"
                                    {...init('startTime', {
                                      getValueFromEvent: this.onChange
                                    })}
                                  />
                                </IceFormBinder>
                              </FormItem>
                            </Col>
                          <Col xxs={24} xs={12} l={8} xl={8}>
                          </Col>
                          <Col xxs={24} xs={12} l={8} xl={8}>
                          </Col>
                            <Col xxs={24} xs={12} l={8} xl={8}>
                                <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate">
                                    <Button onClick={this.handleSubmit.bind(this)} type="secondary">
                                        查询
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </IceFormBinderWrapper>
            </div>
            );
    }
}
