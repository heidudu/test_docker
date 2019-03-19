import React,{Component} from 'react';
import { NavBar, Button,Popover,Badge} from 'antd-mobile';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import "../../iconfont-3.x/font_148784_y7rvx0pkve2buik9/iconfont.css";
import LoginDialog from '../../components/header/loginDialog';
import {actions as userActions} from "../../redux/action/users";
import {bindActionCreators} from 'redux';
import {localItem,removeItem} from "../../utils/tool";
import  './style.css';
import {Link} from 'react-router-dom';


const Item = Popover.Item;

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginDialog:false,
            registerDialog: false,
            userPopover:false,
            menu: false,

        }
    }

    handleLoginDialogOpen = () => {
        this.setState({loginDialog: true});
    };

    handleLoginDialogClose = () =>{
        this.setState({loginDialog: false});
    };

    onSelect =(opt) => {
        if(opt.props.value==='logout'){
            this.props.logout();
            if(localItem('userInfo')){
                removeItem('userInfo');
                return;
            }
        }else if(opt.props.value==='publish'){
            this.props.history.push('/article/public');
        }else if(opt.props.value==='authorInfo'){
            this.props.history.push('/user/' + this.props.loginName);
        }
        this.setState({userPopover:false})

    };


    componentWillReceiveProps(nextProps){
        if(nextProps.success && localItem('userinfo')){
            this.setState({loginDialog:false});

        }else if(nextProps.success && !localItem('userinfo')){
            let accessToken = nextProps.accessToken;
            let loginName = nextProps.loginName;
            let userInfo = {accessToken,loginName};
            userInfo = JSON.stringify(userInfo);
            localItem('userInfo',userInfo);
            this.setState({loginDialog:false});
            this.props.message_get(accessToken);

        }
    }


    render(){

        if(!this.props.success){
            return(
                <div>
                    <NavBar
                        key='1'
                        mode="light"
                        icon={<a><img alt="掘金" src={require('../../static/img/logo.svg')}/></a>}
                        rightContent={[
                            <Button key='0' style={{borderStyle:'none',}} onClick={this.handleLoginDialogOpen}>登录</Button>,
                        ]}
                    > </NavBar>
                    <LoginDialog visible={this.state.loginDialog} onClose={this.handleLoginDialogClose}
                                 handleLogin={this.props.handleLogin}/>
                </div>
            )

        }else{
            return(
                <div>
                    <NavBar
                        key='2'
                        mode="light"
                        icon={<a><img key='6' alt="掘金" src={require('../../static/img/logo.svg')}/></a>}
                        rightContent={[
                            <Badge text={this.props.messageCount}>
                                <Link to={`/user/message`} ><i className="icon anticon" >&#xe64e;</i></Link>
                            </Badge>,
                            <Popover
                                visible={this.state.userPopover}
                                overlay={[
                                    (<Item key='3' value='logout' className='popover' ><i className="icon anticon popoverIcon" >&#xe65a;</i>登出</Item>),
                                    (<Item key='4' value='publish' className='popover' ><i className="icon anticon popoverIcon" >&#xe692;</i>写文章</Item>),
                                    (<Item key='5' value='authorInfo' className='popover' ><i className="icon anticon popoverIcon" >&#xe66a;</i>个人中心</Item>),
                                ]}
                                onSelect={this.onSelect}
                            >
                                <img key='7' src={this.props.avatarUrl}  alt='头像' className='userImg'/>
                            </Popover>
                        ]}
                    > </NavBar>
                </div>
            )
        }

    };
}

Header.defaultProps = {
    success: false
};

Header.propsTypes={
    success:PropTypes.bool.isRequired

};

function mapStateToProps(state) {
    return{
        success : state.users.success,
        loginName: state.users.loginName,
        avatarUrl:state.users.avatarUrl,
        accessToken:state.users.accessToken,
        messageCount:state.users.messageCountData,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        handleLogin:bindActionCreators(userActions.user_login,dispatch),
        logout:bindActionCreators(userActions.user_logout,dispatch),
        message_get:bindActionCreators(userActions.message_count_get,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);