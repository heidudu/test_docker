import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actions as authorInfoActions} from "../../redux/action/authorInfo";
import React, {Component} from "react";
import  './style.css';
import {Flex,Tabs,WhiteSpace} from 'antd-mobile'
import moment from "moment/moment";


const tabs=[
    { title: '最近回复' },
    { title: '最近发布'},
    {title:'最近收藏'},

];

class AuthorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.author_get(this.props.match.params.name)
        this.props.collect_get(this.props.match.params.name)


    }




    componentWillReceiveProps(nextProps){

    };







    render(){

        return(
            <div>
                <div style={{padding:'1rem',textAlign:'center'}}>
                    <img src={this.props.info.avatar_url}  alt='头像' className='authorImg'/><br/>
                    <span>{this.props.info.loginname}</span>
                        <Flex justify="between">
                            <span>注册时间：{moment(this.props.info.create_at).locale('zh-cn').fromNow()}</span>
                            <span>积分：{this.props.info.score}</span>
                        </Flex>

                </div>
                <div>
                    <Tabs tabs={tabs} initialPage={0}>
                        <div style={{  alignItems: 'center', justifyContent: 'center',  backgroundColor: '#fff' }}>
                            {this.props.info.recent_replies && this.props.info.recent_replies.map((reply) =>
                                <Flex key={reply.id} style={{padding:'0.2rem'}}>
                                    <Flex.Item style={{flex:'0.2'}}><img src={reply.author.avatar_url} alt='authorImg' style={{width:'3rem',height:'3rem'}}/></Flex.Item>
                                    <Flex.Item >
                                        <strong style={{fontSize:'medium',lineHeight:'2rem'}}>{reply.title}</strong><br/>
                                        <span>{reply.author.loginname}</span>
                                        <span style={{display:'float',float:'right',marginRight:'0.2rem'}}>{moment(reply.last_reply_at).locale('zh-cn').fromNow()}</span>
                                    </Flex.Item>
                                    <WhiteSpace size='xs'/>
                                </Flex>
                            )}
                        </div>
                        <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                            {this.props.info.recent_topics && this.props.info.recent_topics.map((topic) =>
                                <Flex key={topic.id} style={{padding:'0.2rem'}}>
                                    <Flex.Item style={{flex:'0.2'}}><img src={topic.author.avatar_url} alt='authorImg' style={{width:'3rem',height:'3rem'}}/></Flex.Item>
                                    <Flex.Item >
                                        <strong style={{fontSize:'medium',lineHeight:'2rem'}}>{topic.title}</strong><br/>
                                        <span>{topic.author.loginname}</span>
                                        <span style={{display:'float',float:'right',marginRight:'0.2rem'}}>{moment(topic.last_reply_at).locale('zh-cn').fromNow()}</span>
                                    </Flex.Item>
                                    <WhiteSpace size='xs'/>
                                </Flex>
                            )}
                        </div>
                        <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                            {this.props.collectTopics && this.props.collectTopics.map((topic) =>
                                <Flex key={topic.id} style={{padding:'0.2rem'}}>
                                    <Flex.Item style={{flex:'0.2'}}><img src={topic.author.avatar_url} alt='authorImg' style={{width:'3rem',height:'3rem'}}/></Flex.Item>
                                    <Flex.Item >
                                        <strong style={{fontSize:'medium',lineHeight:'2rem'}}>{topic.title}</strong><br/>
                                        <span>{topic.author.loginname}</span>
                                        <span style={{display:'float',float:'right',marginRight:'0.2rem'}}>{moment(topic.last_reply_at).locale('zh-cn').fromNow()}</span>
                                    </Flex.Item>
                                    <WhiteSpace size='xs'/>
                                </Flex>
                            )}
                        </div>
                    </Tabs>

                </div>
            </div>

        )
    }
}

AuthorInfo.defaultProps = {


};

AuthorInfo.propsTypes={

};

function mapStateToProps(state) {
    return{
        info:state.authorInfo.info,
        collectTopics:state.authorInfo.collectTopics



    }
}

function mapDispatchToProps(dispatch) {
    return{
        author_get:bindActionCreators(authorInfoActions.author_get,dispatch),
        collect_get:bindActionCreators(authorInfoActions.collect_get,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorInfo);