import React,{Component} from 'react';
import {Tabs} from 'antd-mobile' ;
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import {actions as topicActions} from "../../redux/action/topic";
import { ListView,} from 'antd-mobile';
import { StickyContainer,Sticky  } from 'react-sticky';
import TopicList from '../../components/home/topicList';
import { withRouter } from 'react-router-dom'



const tabs=[
    { title: '全部', sub: '1',tab:'all' },
    { title: '精华', sub: '2',tab:'good'},
    { title: '分享', sub: '3',tab:'share'},
    { title: '问答', sub: '4',tab:'ask' },
    { title: '招聘', sub: '5',tab:'job' },
    { title: '测试', sub: '6',tab:'dev' },
];

function renderTabBar(props) {
    return (<Sticky>
            {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
}
let page = 1;
class Home extends Component{
    constructor(props){
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource,
            isLoading:true,
            tab:'all',
            data:[],
        };
        this.props.topic_get(this.state.tab,page);

    }

    tabChange = (tab)=>{
        this.props.topic_get(tab,1);
        setTimeout(()=>window.scrollTo({
            top:0,
            left:0
        }),800);
        this.setState({
            tab:tab,
            data:[],
        })
        page = 1
    };





    componentWillReceiveProps(nextProps) {
        if (nextProps.topics !== this.props.topics) {
            this.setState({
                data:this.state.data.concat(nextProps.topics),
            },()=>{
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.state.data),
                    isLoading: false,

                });

            });
        }else{
            this.setState({
                hasMore:false
            })
        }
    }

    onEndReached = (event) => {
        if (this.state.isLoading  ) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        this.props.topic_get(this.state.tab,++page);

    };



    render(){
        const row = (rowData,sectionID,rowID) => {
            return(
                <TopicList
                    rowData={rowData}
                    rowID={rowID}
                    redirect={this.props.history.push}
                />
            );

        };



        return(
            <StickyContainer>
                <Tabs
                    tabs={tabs}
                    initialPage={0}
                    renderTabBar={renderTabBar}
                    swipeable
                    onChange={(tab,index)=>this.tabChange(tab.tab)}

                >

                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                            {this.state.isLoading ? '加载中...' : '没有更多数据'}
                        </div>)}
                        renderRow={row}
                        useBodyScroll
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                    />


                </Tabs>
            </StickyContainer>
        )
    };

}

Home.defaultProps = {
    tab:'all',
    limit: 40,

};

Home.propsTypes={



};

function mapStateToProps(state) {
    return{
        topics:state.topics.topics,
        tab : state.topics.topics,
        page: state.topics.topics,
        limit: state.topics.topics,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        topic_get:bindActionCreators(topicActions.topic_get,dispatch)

    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));


