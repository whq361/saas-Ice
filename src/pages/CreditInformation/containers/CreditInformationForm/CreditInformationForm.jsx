import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';

import { Form, Icon, Input, Button, Checkbox, Select, Switch, Balloon, Grid, Field, Dialog, Upload } from '@icedesign/base';

const {Row, Col} = Grid;
const { DragUpload } = Upload;
const FormItem = Form.Item;

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import { Title } from 'components';
import  './CreditInformationForm.scss'
import { Feedback } from '@icedesign/base/index';

const formItemLayout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 23
  }
};

export default class CreditInformationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value :{},
          opption:[
            {label:'是', value:'Y'},
            {label:'否', value:'N'},
            ],
          dataList:[
            {
              "label": "正常",
              "value": "NORMAL"
            },
            {
              "label": "无贷款",
              "value": "NONE"
            },
            {
              "label": "呆账",
              "value": "BAD_DEBTS"
            },
            {
              "label": "损失",
              "value": "LOSS"
            },
            {
              "label": "可疑",
              "value": "SUSPICIOUS"
            },
            {
              "label": "次级",
              "value": "SECONDARY"
            },
            {
              "label": "关注",
              "value": "CONCERN"
            },
            {
              "label": "已转出",
              "value": "OUT"
            },
            {
              "label": "已结清",
              "value": "CLEAR"
            }
          ]

        };
        this.field = new Field(this);
    }

    /**
     * 初始化
     */
    componentDidMount() {
        let {actions, params} = this.props;

        if (params.id) {
            //actions.getDetail(params.id);
        }
    }

    //表单校验change
    formChange = value => {
        this.props.formData = value;
    }

    //保存
    submit = () => {
      this.formRef.validateAll((error, value) => {
        if (error) {
          // 处理表单报错
          return;
        }
        console.log(value)
        //
        // let AllValue = this.AllValue(value);
        // this.dataVerif(value);
        // this.props.actions.save(AllValue);
      });
    };

    //提交
    handleSubmit = () => {
        this.refs.form.validateAll((errors, values) => {
            console.log('errors', errors, 'values', values);
            return false;
        });
    }

    // 取消
    handleCancel() {}


    //验证 正整数 不限制数位
    isInteger = (rule, value, callback) => {
      if(value != 0){
        if (rule.required && !value) {
          callback('请输入');
          return;
        }
      }
      if (value){
        if(parseFloat(value)<0 || value.indexOf('.')!==-1){
          callback('只能输入正整数');
          return;
        }
      }
      callback();
    }
    //金额 验证
    priceRange = (rule, value, callback) =>{
      if(value != 0){
        if (rule.required && !value) {
          callback('请输入');
          return;
        }
      }
        if (value && isNaN(value)) {
          callback('只能填写数字');
          return ;
        } else if (value && !isNaN(value) && parseFloat(value) < 0) {
          callback('不能小于0');
          return ;
        } else if (value && !isNaN(value) && parseFloat(value) > 9999999999999999) {
          callback('不能超过9999999999999999');
          return ;
        }
      callback();
    }

    /**
     * 渲染
     */
    render() {
        let {formData = {}} = this.props;
        const { init, getError, getState } = this.field;

        return (
            <IceContainer className="pch-container report">
                    <Title title="人行报告" />
                <IceFormBinderWrapper value={formData} onBlur={this.formChange} ref={(formRef) => {
                  this.formRef = formRef;
                }}>
                  <div>
                      <DragUpload
                      className='upload-picture'
                      listType="picture-card"
                      action="/loanApi/file/upload"
                      data={{'path':'path/to/file'}}
                      defaultFileList={[
                        {
                          name: "IMG.png",
                          status: "done",
                          size: 1024,
                          downloadURL:
                            "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
                          fileURL:
                            "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
                          imgURL:
                            "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg"
                        },
                        {
                          name: "IMG.png",
                          status: "done",
                          size: 1024,
                          downloadURL:
                            "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
                          fileURL:
                            "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
                          imgURL:
                            "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg"
                        }
                      ]}
                      // onDragOver={onDragOver}
                      // onDrop={onDrop}
                    />
                      <Form>
                        <Row wrap>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>姓名:</span>}>
                              <IceFormBinder
                                name="name"
                                required
                                message="请输入"
                                disabled
                                validator={this.prepaymentAmountMinChange}

                              >
                                <Input size="large" placeholder="最小提前还款金额" className="custom-input" />
                              </IceFormBinder>
                              <div> <IceFormError name="name" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>证件号码:</span>}>
                              <IceFormBinder
                                disabled
                                name="name"
                                required
                                message="请输入"
                              >

                                <Input size="large" placeholder="最早提前还款期数" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="name" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>手机号码:</span>}>
                              <IceFormBinder
                                disabled
                                name="name"
                                required
                                message="请输入"
                                validator={this.prepaymentAmountMinChange}

                              >
                                <Input size="large" placeholder="最小提前还款金额" className="custom-input" />
                              </IceFormBinder>
                              <div> <IceFormError name="name" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>主贷人中征信评分:</span>}>
                              <IceFormBinder
                                name="customCreditScore"
                                required
                                validator={this.priceRange}
                              >
                                <Balloon  style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/customCreditScore.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="customCreditScore" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>近3个月贷款审批或信用卡审批查询次数</span>}>
                              <IceFormBinder
                                name="threeMonApproveCount"
                                required
                                validator={this.isInteger}
                              >

                                <Balloon  style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/threeMonApproveCount.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="threeMonApproveCount" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>信用报告是否空白</span>}>
                              <IceFormBinder
                                name="creditIsBlank"
                                message="请选择"
                                required
                              >
                                <Select size="large" placeholder="请选择" className="custom-input"
                                        dataSource={this.state.opption}
                                />
                              </IceFormBinder>
                              <div><IceFormError name="creditIsBlank" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>信用卡当前逾期总额(元)</span>}>
                              <IceFormBinder
                                name="creditAmountPastDue"
                                required
                                validator={this.priceRange}
                              >

                                <Balloon  style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/creditAmountPastDue.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="creditAmountPastDue" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>贷款当前逾期总额(元)</span>}>
                              <IceFormBinder
                                name="loanAmountExpDue"
                                required
                                validator={this.priceRange}
                              >

                                <Balloon  style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/loanAmountExpDue.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="loanAmountExpDue" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>以资抵偿(元)</span>}>
                              <IceFormBinder
                                name="pledgeOfAssets"
                                required
                                validator={this.priceRange}
                              >

                                <Balloon  align ='bl'  style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/pledgeOfAssets.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="pledgeOfAssets" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>贷款账户状态</span>}>
                              <IceFormBinder
                                name="loanAccountStatus"
                                required
                                message="请输入"
                                validator={this.prepaymentPeriodsLimitChange}
                              >
                                <Balloon  align ='rb'  style={styles.box}  trigger={ <Select size="large" placeholder="请选择" className="custom-input"
                                                                                             dataSource={this.state.dataList} /> } triggerType="click">
                                  <img src="/public/images/creditInformation/loanAccountStatus.png" alt=""/>
                                </Balloon>

                              </IceFormBinder>
                              <div><IceFormError name="loanAccountStatus" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>呆账信用卡余额(元)</span>}>
                              <IceFormBinder
                                name="creditBadDebtsMaxAmount"
                                required
                                validator={this.priceRange}
                              >
                                <Balloon    style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/creditBadDebtsMaxAmount.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="creditBadDebtsMaxAmount" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>冻结信用卡余额(元)</span>}>
                              <IceFormBinder
                                name="creditFrozenMaxAmount"
                                required
                                validator={this.priceRange}
                              >

                                <Balloon   align ='bl'  style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/creditFrozenMaxAmount.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="creditFrozenMaxAmount" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>60天内信用卡或贷款审批查询次数</span>}>
                              <IceFormBinder
                                name="twoMonApproveCount"
                                required
                                validator={this.isInteger}
                              >

                                <Balloon    style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/twoMonApproveCount.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="twoMonApproveCount" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>担保代偿(元)</span>}>
                              <IceFormBinder
                                name="guaranteedCompensatory"
                                required
                                validator={this.priceRange}
                              >
                                <Balloon    style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/guaranteedCompensatory.png" alt=""/>
                                </Balloon>

                              </IceFormBinder>
                              <div><IceFormError name="guaranteedCompensatory" /></div>
                            </FormItem>
                          </Col>
                        </Row>
                        <Row wrap>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔信用卡最近24月内大于等于3的数字有几个</span>}>
                              <IceFormBinder
                                name="creditTwoConsecutiveYear"
                                required
                                validator={this.isInteger}

                              >
                                <Balloon    style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/creditTwoConsecutiveYear.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div> <IceFormError name="creditTwoConsecutiveYear" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔信用卡最近12月内大于等于2的数字有几个</span>}>
                              <IceFormBinder
                                name="creditOneConsecutiveYear"
                                required
                                validator={this.isInteger}
                              >

                                <Balloon    style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/creditOneConsecutiveYear.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="creditOneConsecutiveYear" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔信用卡最近6月内大于等于1的数字有几个</span>}>
                              <IceFormBinder
                                name="creditHalfConsecutiveYear"
                                required
                                validator={this.isInteger}

                              >
                                <Balloon  align ='bl'  style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/creditHalfConsecutiveYear.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div> <IceFormError name="creditHalfConsecutiveYear" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔信用卡最近12月内大于等于1的数字有几个</span>}>
                              <IceFormBinder
                                name="creditOneYear"
                                required
                                validator={this.isInteger}
                              >

                                <Balloon   style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/creditOneYear.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="creditOneYear" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>单笔贷款最大逾期期数</span>}>
                              <IceFormBinder
                                name="loanMaxOverdue"
                                required
                                validator={this.isInteger}
                              >

                                <Balloon   style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/loanMaxOverdue.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="loanMaxOverdue" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔信用卡最大逾期期数</span>}>
                              <IceFormBinder
                                name="creditMaxOverdue"
                                required
                                validator={this.isInteger}
                              >

                                <Balloon  align ='bl' style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/creditMaxOverdue.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="creditMaxOverdue" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>2年内是否有贷款记录</span>}>
                              <IceFormBinder
                                name="twoIsLoanRecord"
                                required
                                message="请输入"
                              >

                                <Balloon  align ='rb'  style={styles.box}  trigger={ <Select size="large" placeholder="请选择" className="custom-input"
                                                                                             dataSource={this.state.opption} /> } triggerType="click">
                                  <img src="/public/images/creditInformation/twoIsLoanRecord.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="twoIsLoanRecord" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>主贷人与共借人均不存在强制执行信息</span>}>
                              <IceFormBinder
                                name="customNonExistEnforce"
                                required
                                message="请输入"
                                validator={this.prepaymentPeriodsLimitChange}
                              >
                                <Balloon  align ='lb'  style={styles.box}  trigger={ <Select size="large" placeholder="请选择" className="custom-input"
                                                                                             dataSource={this.state.opption} /> } triggerType="click">
                                  <img src="/public/images/creditInformation/customNonExistEnforce.png" alt=""/>
                                </Balloon>

                              </IceFormBinder>
                              <div><IceFormError name="customNonExistEnforce" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔贷款最近24月内大于等于3的数字有几个</span>}>
                              <IceFormBinder
                                name="loanTwoConsecutiveYear"
                                required
                                validator={this.isInteger}
                              >

                                <Balloon  align ='bl'   style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/loanTwoConsecutiveYear.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="loanTwoConsecutiveYear" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔贷款最近12月内大于等于2的数字有几个</span>}>
                              <IceFormBinder
                                name="loanOneConsecutiveYear"
                                required
                                validator={this.isInteger}
                              >

                                <Balloon     style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/loanOneConsecutiveYear.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="loanOneConsecutiveYear" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔贷款最近6月内大于等于1的数字有几个</span>}>
                              <IceFormBinder
                                name="loanHalfConsecutiveYear"
                                required
                                validator={this.isInteger}
                              >

                                <Balloon     style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/loanHalfConsecutiveYear.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="loanHalfConsecutiveYear" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔贷款最近12月内大于等于1的数字有几个</span>}>
                              <IceFormBinder
                                name="loanOneYear"
                                required
                                validator={this.isInteger}
                              >

                                <Balloon   align ='bl'  style={styles.box}  trigger={ <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />} triggerType="focus">
                                  <img src="/public/images/creditInformation/loanOneYear.png" alt=""/>
                                </Balloon>
                              </IceFormBinder>
                              <div><IceFormError name="loanOneYear" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近1个月内小于30天的次数</span>}>
                              <IceFormBinder
                                name="card1MonthLessThan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="card1MonthLessThan30" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近3个月内小于30天的次数</span>}>
                              <IceFormBinder
                                name="card3MonthLessThan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="card3MonthLessThan30" /></div>
                            </FormItem>
                          </Col>




                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近3个月内连续大于等于30天的次数</span>}>
                              <IceFormBinder
                                name="card3MonthMoreThan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="card3MonthMoreThan30" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近6个月内小于30天的次数</span>}>
                              <IceFormBinder
                                name="card6MonthLessThan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="card6MonthLessThan30" /></div>
                            </FormItem>
                          </Col>

                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近12个月内小于30天的次数</span>}>
                              <IceFormBinder
                                name="card12MonthLessThan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="card12MonthLessThan30" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近12个月内连续大于等于30天的次数</span>}>
                              <IceFormBinder
                                name="card12MonthMoreThan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="card12MonthMoreThan30" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近24个月内小于30天的次数</span>}>
                              <IceFormBinder
                                name="card24MonthLessThan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="card24MonthLessThan30" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近24个月内连续大于等于30天的次数</span>}>
                              <IceFormBinder
                                name="card24MonthMoreThan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="card24MonthMoreThan30" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近24个月内连续大于等于60天的次数</span>}>
                              <IceFormBinder
                                name="card24MonthMoreThan60"
                                required
                                validator={this.isInteger}
                              >
                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="card24MonthMoreThan60" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>历史贷款和信用卡出现大于等于90天及以上逾期</span>}>
                              <IceFormBinder
                                name="historyMoreThan90"
                                required
                                message="请输入"
                              >

                                <Select size="large" placeholder="请选择" className="custom-input"
                                        dataSource={this.state.opption}
                                />
                              </IceFormBinder>
                              <div><IceFormError name="historyMoreThan90" /></div>
                            </FormItem>
                          </Col>





                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>申请人已有贷款</span>}>
                              <IceFormBinder
                                name="prepaymentPeriodsLimit"
                                required
                                message="请输入"
                              >

                                <Select size="large" placeholder="请选择" className="custom-input"
                                        dataSource={this.state.opption}
                                />


                              </IceFormBinder>
                              <div><IceFormError name="prepaymentPeriodsLimit" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>信用卡近6个月平均透支额度</span>}>
                              <IceFormBinder
                                name="overdrawAmount"
                                required
                                validator={this.priceRange}
                              >

                                <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="overdrawAmount" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>申请人配偶已有贷款</span>}>
                              <IceFormBinder
                                name="spouseHasLoan"
                                required
                                message="请输入"
                              >

                                <Select size="large" placeholder="请选择" className="custom-input"
                                        dataSource={this.state.opption}
                                />


                              </IceFormBinder>
                              <div><IceFormError name="spouseHasLoan" /></div>
                            </FormItem>
                          </Col>

                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>申请人配偶信用卡近6个月平均透支额度</span>}>
                              <IceFormBinder
                                name="spoouseOverdrawAmount"
                                required
                                validator={this.priceRange}
                              >

                                <Input size="large" htmlType='number' placeholder="请选择" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="spoouseOverdrawAmount" /></div>
                            </FormItem>
                          </Col>


                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近3个月内小于30天的次数</span>}>
                              <IceFormBinder
                                name="loan3monthLessthan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="loan3monthLessthan30" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近3个月内连续大于等于30天的次数</span>}>
                              <IceFormBinder
                                name="loan3monthMorethan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="loan3monthMorethan30" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近6个月内小于30天的次数</span>}>
                              <IceFormBinder
                                name="loan6monthLessthan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="loan6monthLessthan30" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近12个月内小于30天的次数</span>}>
                              <IceFormBinder
                                name="loan12monthLessthan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="loan12monthLessthan30" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近12个月内连续大于等于30天的次数</span>}>
                              <IceFormBinder
                                name="loan12monthMorethan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="loan12monthMorethan30" /></div>
                            </FormItem>
                          </Col><Col xxs={24} xs={12} l={8} >
                          <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近24个月内小于30天的次数</span>}>
                            <IceFormBinder
                              name="loan24monthLessthan30"
                              required
                              validator={this.isInteger}
                            >

                              <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                            </IceFormBinder>
                            <div><IceFormError name="loan24monthLessthan30" /></div>
                          </FormItem>
                        </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近24个月内连续大于等于30天的次数</span>}>
                              <IceFormBinder
                                name="loan24monthMorethan30"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="loan24monthMorethan30" /></div>
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近24个月内连续大于等于60天的次数</span>}>
                              <IceFormBinder
                                name="loan24monthMorethan60"
                                required
                                validator={this.isInteger}
                              >

                                <Input size="large"  htmlType='number' placeholder="请填写" className="custom-input" />
                              </IceFormBinder>
                              <div><IceFormError name="loan24monthMorethan60" /></div>
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className='button-box'>

                              <Button onClick={this.submit}>完成</Button>

                            </div>
                          </Col>
                        </Row>
                      </Form>
                  </div>
                </IceFormBinderWrapper>
            </IceContainer>
            );
    }
}
const styles = {
  box:{
    width : "780px",
    hegiht: "120px",
    maxWidth: '780px'
  }
};
