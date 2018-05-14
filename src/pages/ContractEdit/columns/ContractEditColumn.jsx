
import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
 const typeTrans = {
   1:'电子',
   2:'纸质'
 }
 const statusTrans = {
   1:'待确认',
   2:'已取消',
   5:'已签字'
 }
class ContractEditColumn extends BaseColumn {

    constructor() {
        super();
        this._columns = [{
            title: '贷款编号',
            dataIndex: 'loanNo',
            width: 120
        }, {
            title: '合同编号',
            dataIndex: 'contractNo',
            width: 120
        }, {
            title: '客户姓名',
            dataIndex: 'name',
            width: 100
        }, {
            title: '证件类型',
            dataIndex: 'documentType',
            width: 160
        }, {
            title: '证件号码',
            dataIndex: 'documentCode',
            width: 160
        }, {
            title: '合同时间',
            dataIndex: 'contractTime',
            width: 160
        }, {
            title: '贷款金额',
            dataIndex: 'loanAmount',
            width: 160
        }, {
            title: '资方',
            dataIndex: 'capital',
            width: 120
        }, {
            title: '产品类型',
            dataIndex: 'productType',
            width: 120
        }, {
            title: '产品名称',
            dataIndex: 'productName',
            width: 120
        }, {
            title: '客户经理',
            dataIndex: 'customerManagerName',
            width: 120
        }, {
            title: '状态',
            dataIndex: 'visible',
            width: 120,
            cell:(value, index, record)=> {
              return statusTrans[record.status]
            }
        }, {
            title: '操作',
            dataIndex: 'visible',
            lock: 'right',
            width: 200,
            cell: (value, index, record) => {
                return (
                    <div className="contract-handle-btn-list-wrap">
                        <button className="editbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.EDIT)}>
                            编辑
                        </button>
                        {
                          record.status != 2 &&
                          <button className="searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.CANCEL)}>
                              取消
                          </button>
                        }
                        {
                          record.type != 2 &&
                          <button className="searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.CHANGE)}>
                              改纸质
                          </button>
                        }
                    </div>
                    );
            }
        }]
    }
}

export default new ContractEditColumn().getColumns();
