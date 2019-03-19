import React, {Component} from 'react';
import {Flex,Button,WhiteSpace,Toast} from 'antd-mobile';
import moment from "moment/moment";
import "../../iconfont-3.x/font_148784_y7rvx0pkve2buik9/iconfont.css";
import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css';
import marked from 'marked';
import highlight from 'highlight.js';


export default class Reply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editor:false,
            value:'@'+this.props.reply.author.loginname + ' ',


        }

    }


    showEditor = () => {
        this.setState({
            editor:!this.state.editor
        });
        if(!this.state.editor){
            this.setState({
                value:'@'+this.props.reply.author.loginname + ' ',
            });
        }
    };

    handleChange = value => {

        this.setState({
            value: value
        });
    };

    handleUp = () => {
        if(!this.props.userName){
            Toast.info('登录后才能点赞',1);
            return
        }else if(this.props.reply.author.loginname===this.props.userName){
            Toast.info('不能给自己点赞',1);
            return
        }
        this.props.up_post(this.props.reply.id)


    };

    componentWillReceiveProps(nextProps){
        if(nextProps.replySuccess && !this.props.replySuccess) {
            this.setState({
                editor:false,
                value:'@'+this.props.reply.author.loginname + ' ',
            })
        }
    };






    render(){
        return(
            <div id={this.props.reply.id}>
                <Flex wrap="wrap">
                    <Flex.Item style={{flex:'0.5'}} >
                        <img src={this.props.reply.author.avatar_url} alt='replyImg' style={{width:'3rem',height:'3rem'}}/>
                    </Flex.Item>
                    <Flex.Item style={{flex:'2'}}>
                        <span>{this.props.reply.author.loginname}</span>
                        •
                        <span>{moment(this.props.reply.create_at).locale('zh-cn').fromNow()}发布</span>
                    </Flex.Item>
                    <Flex.Item style={{flex:'0.3'}}>
                        {this.props.reply.is_uped &&
                            <Button  style={{background: 'transparent',borderStyle:'none'}} onClick={this.handleUp}><i className="icon anticon popoverIcon" style={{width:'0.5rem',height:'0.5rem',marginRight:'0rem',background: 'green'}}>&#xe69d;</i>{this.props.reply.ups.length}</Button>
                        }
                        {!this.props.reply.is_uped &&
                            <Button  style={{background: 'transparent',borderStyle:'none'}} onClick={this.handleUp} ><i className="icon anticon popoverIcon" style={{width:'0.5rem',height:'0.5rem',marginRight:'0rem'}}>&#xe69d;</i>{this.props.reply.ups.length}</Button>
                        }

                    </Flex.Item>
                    <Flex.Item style={{flex:'0.3'}} >
                        <Button  onClick={this.showEditor} style={{background: 'transparent',borderStyle:'none'}}><i className="icon anticon popoverIcon " style={{width:'0.5rem',height:'0.5rem',marginRight:'0rem'}}>&#xe612;</i></Button>
                    </Flex.Item>
                </Flex>
                <div>
                    <div className="markdown-body" dangerouslySetInnerHTML={{__html: this.props.reply.content}}/>
                </div>
                <WhiteSpace size='xs'/>

                {this.state.editor &&
                <div>
                    <SimpleMDE
                        value={this.state.value}
                        onChange={this.handleChange}
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
                    <div
                        style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                        onClick={()=>this.props.handleReply(this.state.value,this.props.reply.id)}
                    >
                        提交
                    </div>
                </div>}

            </div>



        )
    }
}