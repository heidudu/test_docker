import React,{Component} from "react";
import {Badge,List} from 'antd-mobile'
import moment from 'moment'
import 'moment/locale/zh-cn';


export const badge = {
    'top':<Badge text='置顶' style={{marginRight:'0.2rem', padding: '0 3px', backgroundColor: '#ff4757', borderRadius: 2}}/>,
    'good':<Badge text='精华' style={{marginRight:'0.2rem', padding: '0 3px', backgroundColor: '#ff6348', borderRadius: 2}}/>,
    'share':<Badge text='分享' style={{ marginRight:'0.2rem',padding: '0 3px', backgroundColor: '#ffa502', borderRadius: 2}}/>,
    'ask':<Badge text='问答' style={{marginRight:'0.2rem', padding: '0 3px', backgroundColor: '#5352ed', borderRadius: 2}}/>,
    'job':<Badge text='招聘' style={{ marginRight:'0.2rem',padding: '0 3px', backgroundColor: '#70a1ff', borderRadius: 2}}/>,
    'dev':<Badge text='测试' style={{marginRight:'0.2rem',padding: '0 3px', backgroundColor: '#7bed9f', borderRadius: 2}}/>,

};

const Item = List.Item;


export default class TopicList extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <List key={this.props.rowID}
            >
                <Item
                    multipleLine
                    onClick={()=>this.props.redirect('/article/'+this.props.rowData.id)}
                >
                    {this.props.rowData.top? this.props.rowData.good? badge['top']:badge['good']:badge[this.props.rowData.tab]}
                    {this.props.rowData.title}<br />
                    <div style={{display:'flex',fontSize:'0.1rem'}}>
                        <img src={this.props.rowData.author.avatar_url} alt='userimg' style={{display:'flex',width:'2rem',height:'2rem'}}/>
                        <div style={{marginLeft:'0.8rem',width:'60%'}}>
                            <span>{this.props.rowData.author.loginname}</span><br/>
                            <span>{moment(this.props.rowData.create_at).locale('zh-cn').fromNow()}</span>

                        </div>
                        <div>
                            <span >{this.props.rowData.reply_count}/{this.props.rowData.visit_count}</span><br/>
                            <span>{moment(this.props.rowData.last_reply_at).locale('zh-cn').fromNow()}</span>
                        </div>
                    </div>

                </Item>
            </List>

        )
    }

}