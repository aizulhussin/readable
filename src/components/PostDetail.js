import React from 'react'
import { connect } from 'react-redux';
import { fetchPostById } from '../utils/api';
import { viewPost } from '../actions';
import { Link, withRouter } from 'react-router-dom'


class PostDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            posts: []
        }
    }

    componentWillMount() {
        //console.log(this.props);
        this.getPost(this.props.match.params.id);
    }

    getPost(id) {

        fetchPostById(id).then((post) => {
            this.props.viewPost(post);
        })

    }

    render() {
        console.log("Render:", this.props)

        var post = this.props.post;

        return (
            <div>
                <div className="header">
                    <div><Link to="/">Back</Link></div>
                </div>
                <div className="form-container">


                    <div className="form-field">
                        <div><button>Edit</button></div>
                        <div><button className="form-value">Remove</button></div>
                        <div><button className="form-value">Like</button></div>
                        <div><button className="form-value">Dislike</button></div>

                    </div>
                    <div className="form-field">
                        <div className="form-post-title">{post.title}</div>
                    </div>
                    <div className="form-field">
                        <div className="post-detail-sub">
                            <div><span className="post-subtitle">Author</span> {post.author}</div>
                            <div><span className="post-subtitle">Category</span> {post.category}</div>
                            <div><span className="post-subtitle">Vote Score</span> {post.voteScore}</div>
                            <div><span className="post-subtitle">Comments</span> {post.commentCount}</div>
                        </div>
                    </div>

                    <div className="form-field">
                        <div className="form-post-body">{post.body}</div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        viewPost: (data) => dispatch(viewPost(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))

