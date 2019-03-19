import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actions as messageActions} from "../../redux/action/message";
import React, {Component} from "react";
import {Tabs,Flex,WhiteSpace} from 'antd-mobile'
import {Link} from 'react-router-dom';
import {Toast} from "antd-mobile/lib/index";


const tabs=[
    { title: '未读消息' },
    { title: '已读消息'},

];

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        if(!this.props.success){
            this.props.history.push('/');
        }
        this.props.message_get()


    }
    componentWillReceiveProps(nextProps){
        if(! nextProps.success ){
            this.props.history.push('/');
        }
    }


    render(){

        return(
            <div>
                <div>
                    <Tabs tabs={tabs} initialPage={0}>
                        <div style={{  alignItems: 'center', justifyContent: 'center',  backgroundColor: '#fff' }}>
                            { this.props.messageData.hasnot_read_messages && this.props.messageData.hasnot_read_messages.map((message) =>
                                <Flex>
                                    {message.type==='reply' &&
                                    <Flex.Item key={message.id}>
                                        <Link to={`/user/${message.author.loginname}`} > {message.author.loginname}</Link>
                                        回复了你的话题
                                        <Link to={`/article/${message.topic.id}#${message.reply.id}`} >{message.topic.title}</Link>
                                        <WhiteSpace size='xs'/>
                                    </Flex.Item>}
                                    {message.type==='reply2' &&
                                    <Flex.Item key={message.id}>
                                        <Link to={`/user/${message.author.loginname}`} > {message.author.loginname}</Link>
                                        在话题
                                        <Link to={`/article/${message.topic.id}#${message.reply.id}`} >{message.topic.title}</Link>
                                        回复了你
                                        <WhiteSpace size='xs'/>
                                    </Flex.Item>}
                                    {message.type==='at' &&
                                    <Flex.Item key={message.id}>
                                        <Link to={`/user/${message.author.loginname}`} > {message.author.loginname}</Link>
                                        在话题
                                        <Link to={`/article/${message.topic.id}#${message.reply.id}`} >{message.topic.title}</Link>
                                        @了你
                                        <WhiteSpace size='xs'/>
                                    </Flex.Item>}
                                </Flex>
                            )}
                        </div>
                        <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                            {this.props.messageData.has_read_messages && this.props.messageData.has_read_messages.map((message) =>
                                <div>
                                    {message.type==='reply' &&
                                    <div key={message.id}>
                                        <Link to={`/user/${message.author.loginname}`} > {message.author.loginname}</Link>
                                        回复了你的话题
                                        <Link to={`/article/${message.topic.id}#${message.reply.id}`} >{message.topic.title}</Link>
                                    </div>}
                                    {message.type==='reply2' &&
                                    <div key={message.id}>
                                        <Link to={`/user/${message.author.loginname}`} > {message.author.loginname}</Link>
                                        在话题
                                        <Link to={`/article/${message.topic.id}#${message.reply.id}`} >{message.topic.title}</Link>
                                        回复了你
                                    </div>}
                                    {message.type==='at' &&
                                    <div key={message.id}>
                                        <Link to={`/user/${message.author.loginname}`} > {message.author.loginname}</Link>
                                        在话题
                                        <Link to={`/article/${message.topic.id}#${message.reply.id}`} >{message.topic.title}</Link>
                                        @了你
                                    </div>}
                                </div>
                            )}
                        </div>
                    </Tabs>

                </div>
            </div>

        )
    }
}

Message.defaultProps = {


};

Message.propsTypes={

};

function mapStateToProps(state) {
    return{
        messageData:state.message.messageData,
        success : state.users.success,



    }
}

function mapDispatchToProps(dispatch) {
    return{
        message_get:bindActionCreators(messageActions.message_get,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message);