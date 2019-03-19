import React,{Component} from 'react';
import {connect} from "react-redux";
//import PropTypes from 'prop-types';
import "../../iconfont-3.x/font_148784_y7rvx0pkve2buik9/iconfont.css";
import Update from '../../components/updateArticle/update';
import {Toast} from 'antd-mobile';
import {actions as updateArticleActions} from "../../redux/action/updateArticle";
import {bindActionCreators} from "redux";
import {actions as articleActions} from "../../redux/action/article";



class UpdateArticle extends Component {
    constructor(props){
        super(props);
        this.state = {


        }


    }
    componentDidMount(){
        this.props.article_get(this.props.match.params.id,'false');


    }



    componentWillReceiveProps(nextProps){
        if(nextProps.updateSuccess && !this.props.updateSuccess){
            Toast.info('更新成功',1);
            this.props.history.push('/article/'+nextProps.responseData);
        }

    }



    render(){
        return(
            <Update
                update_article={this.props.update_article}
                loginSuccess={this.props.loginSuccess}
                title={this.props.title}
                tab={this.props.tab}
                content={this.props.content}
                articleId={this.props.articleId}
                article_get={this.props.article_get}


            />)

    };
}

UpdateArticle.defaultProps = {

};

UpdateArticle.propsTypes={


};

function mapStateToProps(state) {
    return{
        updateSuccess:state.updateArticle.success,
        loginSuccess:state.users.success,
        responseData:state.updateArticle.data,
        title:state.article.article.title,
        tab:state.article.article.tab,
        content:state.article.article.content,
        articleId:state.article.article.id,



    }
}

function mapDispatchToProps(dispatch) {
    return{
        update_article:bindActionCreators(updateArticleActions.update_article_post,dispatch),
        article_get:bindActionCreators(articleActions.article_get,dispatch),

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateArticle);