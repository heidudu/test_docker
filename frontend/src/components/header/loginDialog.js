import React, {Component} from 'react';
import { Modal,Button,InputItem,List } from 'antd-mobile';
import { createForm } from 'rc-form';


class Dialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            accesstoken:''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleLogin(this.state.accesstoken)
    };

    render(){
        const { getFieldProps} = this.props.form;
        return(
            <Modal
                visible={this.props.visible}
                onClose={()=>{this.props.form.resetFields();this.props.onClose();}}
                animationType="slide-up"
                closable="true"
            >
                <List renderHeader={() => '登录'}>
                    <InputItem
                        {...getFieldProps('accesstoken')}
                        placeholder="Accesstoken"
                        onChange={(val)=>{this.setState({accesstoken:val})}}
                        value={this.state.accesstoken}
                    >
                    </InputItem>
                    <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                </List>


            </Modal>
        )
    }

}
const LoginDialog = createForm()(Dialog);
export default LoginDialog;