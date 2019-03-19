import React,{Component} from 'react';
import {connect} from "react-redux";
//import PropTypes from "prop-types";
import {actions as articleActions} from "../../redux/action/article";
import {bindActionCreators} from 'redux';
import './style.css'
import 'highlight.js/styles/github.css';
import moment from "moment/moment";
import {WhiteSpace,Flex,Button,Modal} from 'antd-mobile'
import {badge} from "../../components/home/topicList";
import Reply from '../../components/article/reply';
import highlight from "highlight.js";
import marked from "marked";
import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css';
import {Toast} from 'antd-mobile';
import "../../iconfont-3.x/font_148784_y7rvx0pkve2buik9/iconfont.css";
import {Link} from 'react-router-dom';




class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            value:'',

        };

        setTimeout(()=>window.scrollTo({
            top:0,
            left:0
        }),800);

    }

    componentDidMount(){
        this.props.article_get(this.props.match.params.id,'true');

    }

    componentDidUpdate(){
        let anchorName = this.props.location.hash;
        if (anchorName) {
            anchorName = anchorName.replace("#","");
            let anchorElement = document.getElementById(anchorName);
            if(anchorElement) { anchorElement.scrollIntoView(); }
        }

    }

    handleChange = value => {
        this.setState({
            value: value
        });
    };

    handleReply = (content,id) => {
        if(!this.props.loginSuccess){
            Toast.info('请先登录',1);
            return
        }
        this.props.reply_post(content,id,this.props.match.params.id)

    };

    handleCollect = () =>{
        if(this.props.article.is_collect){
            this.props.collect_post('de_collect',this.props.match.params.id)
        }else{
            this.props.collect_post('collect',this.props.match.params.id)
        }
    };


    componentWillReceiveProps(nextProps){
        if(nextProps.replySuccess && !this.props.replySuccess) {
            this.props.article_get(this.props.match.params.id,'true');
            this.setState({
                value:''
            })
        }else if(nextProps.upSuccess && !this.props.upSuccess){
            this.props.article_get(this.props.match.params.id,'true');
        }else if(nextProps.collectSuccess && !this.props.collectSuccess){
            this.props.article_get(this.props.match.params.id,'true');
        }else if(nextProps.deleteSuccess && !this.props.deleteSuccess){
            this.props.history.push('/');
        }
    };


    render(){
        const alert = Modal.alert;
        const showAlert = () => {
            alert('删除','确定要删除吗？' ,[
                { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
                { text: 'OK', onPress: () => this.props.delete_post(this.props.article.id) },
            ]);
        };
        return(
            <div className='main'>
                <Flex>
                    <Flex.Item  style={{flex:'0.8'}}>
                        <img src={this.props.author.avatar_url} alt='userImg' style={{width:'3rem',height:'3rem'}}/>
                    </Flex.Item>
                    <Flex.Item style={{flex:'2'}}>
                        <span>{this.props.author.loginname}</span><br/>
                        <span>{moment(this.props.article.create_at).locale('zh-cn').fromNow()}发布</span>
                    </Flex.Item>
                    <Flex.Item>
                        {this.props.article.top? this.props.article.good? badge['top']:badge['good']:badge[this.props.article.tab]}<br/>
                        <span>{this.props.article.visit_count}浏览</span>
                    </Flex.Item>
                </Flex>

                <WhiteSpace size="lg" />

                <div style={{display:'block',overflow:'hidden'}}>
                    {this.props.loginSuccess && <div>
                        <h2>{this.props.article.title}</h2>
                        {this.props.userName===this.props.author.loginname &&<Link to={`/article/${this.props.article.id}/update`} ><i className="icon anticon popoverIcon" style={{marginLeft:'0.1rem'}}>&#xe692;</i></Link>}
                        {this.props.userName===this.props.author.loginname && <i onClick={showAlert} className="icon anticon popoverIcon" style={{marginLeft:'0.1rem'}} >&#xe69f;</i>}
                        <Button type='primary' onClick={this.handleCollect} inline size="small" style={{ float:'right' }}>{this.props.article.is_collect? '取消收藏':'收藏'}</Button>
                    </div>}

                </div>

                <WhiteSpace size="lg" />

                <div>
                    <div className="markdown-body" dangerouslySetInnerHTML={{__html: this.props.article.content}}/>
                </div>

                <WhiteSpace size="lg" />

                <div>
                    <div>
                        <h3>{this.props.article.reply_count}回复</h3>
                    </div>
                        {this.props.article.replies && this.props.article.replies.map((reply) =>
                            <Reply
                                reply={reply}
                                key={reply.id}
                                handleReply={this.handleReply}
                                replySuccess={this.props.replySuccess}
                                loginSuccess={this.props.loginSuccess}
                                userName={this.props.userName}
                                up_post={this.props.up_post}
                            />
                        )}
                </div>
                <WhiteSpace size="xs" />
                {this.props.loginSuccess && <div>
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
                        onClick={()=>this.handleReply(this.state.value,'')}
                    >
                        提交
                    </div>
                </div>}

            </div>

        )
    }
}

Article.defaultProps = {
    article:{},
    success:'false',
    author:{},

};

Article.propsTypes={


};

function mapStateToProps(state) {
    return{
        loginSuccess:state.users.success,
        success:state.article.success,
        article:state.article.article,
        author:state.article.author,
        replySuccess:state.article.replySuccess,
        userName:state.users.loginName,
        upSuccess:state.article.upSuccess,
        collectSuccess:state.article.collectSuccess,
        deleteSuccess:state.article.deleteSuccess,


    }
}

function mapDispatchToProps(dispatch) {
    return{
        article_get:bindActionCreators(articleActions.article_get,dispatch),
        reply_post:bindActionCreators(articleActions.reply_post,dispatch),
        up_post:bindActionCreators(articleActions.up_post,dispatch),
        collect_post:bindActionCreators(articleActions.collect_post,dispatch),
        delete_post:bindActionCreators(articleActions.delete_post,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Article);