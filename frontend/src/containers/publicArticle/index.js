import React,{Component} from 'react';
import {connect} from "react-redux";
//import PropTypes from 'prop-types';
import "../../iconfont-3.x/font_148784_y7rvx0pkve2buik9/iconfont.css";
import Public from '../../components/publicArticle/public';
import {Toast} from 'antd-mobile';
import {actions as publicArticleActions} from "../../redux/action/publicArticle";
import {bindActionCreators} from "redux";
import {actions as userActions} from "../../redux/action/users";



class PublicArticle extends Component {
    constructor(props){
        super(props);
        this.state = {


        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.publicSuccess){
            Toast.info('提交成功',1);
            this.props.history.push('/article/'+nextProps.id);
        }else if (!nextProps.loginSuccess){
            this.props.history.push('/');
        }

    }
    componentDidMount(){
        if(!this.props.loginSuccess){
            this.props.history.push('/');
        }
        this.props.message_get()


    }



    render(){
        return(
            <Public
                public_article={this.props.public_article_post}
                loginSuccess={this.props.loginSuccess}
            />)

    };
}

PublicArticle.defaultProps = {

};

PublicArticle.propsTypes={


};

function mapStateToProps(state) {
    return{
        publicSuccess:state.publicArticle.success,
        loginSuccess:state.users.success,
        id:state.publicArticle.data,

    }
}

function mapDispatchToProps(dispatch) {
    return{
        public_article_post:bindActionCreators(publicArticleActions.public_article_post,dispatch),
        message_get:bindActionCreators(userActions.message_count_get,dispatch),



    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PublicArticle);