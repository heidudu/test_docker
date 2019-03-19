import React, {Component} from 'react';
import {List, InputItem,Picker,Toast} from "antd-mobile";
import "../../iconfont-3.x/font_148784_y7rvx0pkve2buik9/iconfont.css"
import { createForm } from 'rc-form';
import SimpleMDE from 'react-simplemde-editor';
import marked from 'marked';
import highlight from 'highlight.js';
import 'simplemde/dist/simplemde.min.css';


const tab = [
    {
        label: '分享',
        value: 'share',
    },
    {
        label: '问答',
        value: 'ask',
    },
    {
        label: '测试',
        value: 'dev',
    },



];

class Public extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };



    };





    handleClick = (title,tab,content) => {
        if(!title){
            return Toast.fail('标题不能为空',1)
        }else if(title.length < 5){
            return Toast.fail('标题字数太少',1)
        }else if(title.length > 100) {
            return Toast.fail('标题字数太多', 1)
        }else if(!tab){
            return Toast.fail('请选择一个分类',1)
        }else if(!content) {
            return Toast.fail('内容不能为空', 1)
        }else if(!this.props.loginSuccess){
            return Toast.fail('请先登录',1)
        }

        this.props.public_article(title,tab,content)
    };

    render(){

        const { getFieldProps } = this.props.form;

        return(
            <div>
                <List>
                    <InputItem
                        {...getFieldProps('title')}
                        clear
                        ref={el => this.autoFocusInst = el}
                    >标题:</InputItem>
                    <Picker data={tab} cols={1} {...getFieldProps('tab')}>
                        <List.Item arrow="horizontal">选择分类:</List.Item>
                    </Picker>
                    <SimpleMDE
                        {...getFieldProps('content')}
                        options={{
                            autofocus: true,
	                        autosave: true,
                            previewRender: function(plainText) {
                                return marked(plainText,{
                                    renderer: new marked.Renderer(),
                                    gfm: true,
                                    pedantic: false,
                                    sanitize: false,
                                    tables: true,
                                    breaks: true,
                                    smartLists: true,
                                    smartypants: true,
                                    highlight: function (code) {
                                            return highlight.highlightAuto(code).value;
                                    }
                                });
                            },
                        }}
                    />
                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            onClick={() =>this.handleClick(getFieldProps('title').value,getFieldProps('tab').value,getFieldProps('content').value)}
                        >
                            提交
                        </div>
                    </List.Item>
                </List>
            </div>
        )
    }
}

export default Public = createForm()(Public)