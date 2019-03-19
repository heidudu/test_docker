import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch,} from 'react-router-dom';
import Header from './containers/header/index';
import Home from './containers/home/index';
import Article from './containers/article/index';
import PublishArticle from './containers/publicArticle/index'
import UpdateArticle from './containers/updateArticle/index'
import AuthorInfo from './containers/authorInfo/index'
import Message from './containers/message/index'
import {localItem,} from "./utils/tool";
import {actions as userActions,} from './redux/action/users'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


class App extends Component {
    componentWillMount(){
        if(localItem('userInfo')){
            const userInfo = JSON.parse(localItem('userInfo'));
            this.props.handleLogin(userInfo.accessToken);
            this.props.message_get(userInfo.accessToken);
        }
    }
    render(){
        return(
            <Router >
                <div className="APP">
                    <Route component={Header} />
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/article/public' component={PublishArticle} />
                        <Route exact path='/article/:id/update' component={UpdateArticle} />
                        <Route exact path='/user/message' component={Message} />
                        <Route path='/article/:id' component={Article} />
                        <Route path='/user/:name' component={AuthorInfo} />


                    </Switch>

                </div>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return{}

}

function mapDispatchToProps(dispatch) {
    return{
        handleLogin:bindActionCreators(userActions.user_login,dispatch),
        message_get:bindActionCreators(userActions.message_count_get,dispatch),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);