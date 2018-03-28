import React, { PureComponent, Component } from 'react';
import { Balloon, Icon, Badge, Breadcrumb, Dropdown } from '@icedesign/base';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/styled-menu';
import FoundationSymbol from 'foundation-symbol';
import { Link } from 'react-router';
import { headerNavs } from './../navs';
import Logo from './Logo';
import {Recrysuve} from '../base/utils';

export default class Header extends PureComponent {
  getBreadCrumb(data,pathname){
    let result = Recrysuve(data, pathname, 'value', 'leaf', 'breadcrumb')[0]
    return result;
  }
  render() {
    const { width, theme, isMobile, menus, pathname } = this.props;
    let data = this.getBreadCrumb(menus, pathname);
    let result = data ? [data.parentNode, data.node] : ['未知页面'];

    return (
      <Layout.Header
        theme={theme}
        className="ice-design-layout-header"
        style={{ width }}
      >
        
        <Breadcrumb className='all-breadcrumb'>
          {result && result.map((item, i) => {
            return <Breadcrumb.Item link="javascript:void(0);" key={i}>{item.name}</Breadcrumb.Item>
          })}
        </Breadcrumb>
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          {headerNavs && headerNavs.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerNavs.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.to;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.to;
                } else {
                  linkProps.to = nav.to;
                }
                return (
                  <Menu.Item key={idx}>
                    <Link {...linkProps}>
                      {nav.text}
                      {idx == 1 ? <Badge count={25} /> : ''}
                      {/* <Badge count={25} /> */}
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}
          <div className="ice-layout-header-right">
              <UserPanel
                offset={[0, 11]}
                size={20}
                shape="circle"
                userName="Jack"
                avatar="//img.alicdn.com/tfs/TB1JLbBQXXXXXcUapXXXXXXXXXX-215-185.png"
                style={{marginRight: 20}}
              >
                <div>
                  <Menu
                    style={{
                      minWidth: 120,
                      boxShadow: '0 0 2px #ccc'
                    }}
                  >
                    <Menu.Item>
                      <a href="/">信息中心</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a href="/">设置</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a href="/">退出</a>
                    </Menu.Item>
                  </Menu>
                </div>
              </UserPanel>
            </div>

          {/* Header 右侧内容块 */}
          
        </div>
      </Layout.Header>
    );
  }
}

// 项目内敛 用户面板 组件
class UserPanel extends Component {
  static displayName = 'UserPanel';


  static defaultProps = {
    size: 50,
    shape: 'sharp',
    type: 'cover',
    avatar: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      dropdownVisible: false
    };
  }

  handleDropChange = value => {
    this.setState({
      dropdownVisible: value
    });
  };

  render() {
    const {
      offset,
      size,
      shape,
      type,
      avatar,
      style,
      children,
      className = ''
    } = this.props;
    const hasChildren = React.Children.count(children) > 0;
    const trigger = (
      <div
        className={`ice-user-panel ${className}`}
        style={{
          ...style,
          overflow: 'hidden',
          cursor: hasChildren ? 'pointer' : 'default'
        }}
      >
        <div className="avatar" style={{ float: 'left' }}>
          <IceImg
            height={size}
            width={size}
            type={type}
            shape={shape}
            src={avatar}
          />
        </div>
        <div
          className="user-name"
          style={{
            float: 'left',
            height: size,
            lineHeight: `${size}px`
          }}
        >
          <span style={{ padding: '10px' }}>
            {this.props.userName}
          </span>
          <Icon
            type={this.state.dropdownVisible ? 'arrow-up' : 'arrow-down'}
            size="xxs"
          />
        </div>
      </div>
    );
    if (hasChildren) {
      return (
        <Dropdown
          offset={offset}
          align="tr br"
          trigger={trigger}
          onVisibleChange={this.handleDropChange}
        >
          {this.props.children}
        </Dropdown>
      );
    } else {
      return trigger;
    }
  }
}
