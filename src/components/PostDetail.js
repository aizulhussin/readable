import React from 'react'
import { connect } from 'react-redux';
import { fetchPost, updatePostById, vote } from '../utils/api';
import { listPost,updatePost, upVote, downVote } from '../actions';
import { Link, withRouter } from 'react-router-dom'
import PostComments from './PostComments'


class PostDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            title: undefined,
            body: undefined,
            isEdit: false
        }
    }

    vote(id, type) {
        vote(id, type).then((resp) => {

            type === 'upVote' ? this.props.upVote(resp) : this.props.downVote(resp)
        })
    }

    save(id) {
        console.log("Save! ",this.state);
        if (this.state.title !== undefined || this.state.body !== undefined) {
            updatePostById(id, { title: this.state.title, body: this.state.body }).then((response) => {
                console.log(response);
                this.props.editPost(response);
            });
        }

    }

    componentDidMount() {
        console.log("Component Did Mount");
        var id = this.props.match.params.id;
        this.getPost(id);
    }

    handleTitleInput = (title) => {
        this.setState({ title: title });
    }

    handleBodyInput = (body) => {
        this.setState({ body: body });
    }

    getPost(id) {


        var postList = this.props.postList.post;
        
        if (postList.length === 0) {
            console.log("Fetch Post");
            fetchPost().then((posts) => {
                this.props.listPost(posts);
                this.setState({ loading: false });
            });
        }
    }

    edit() {
        console.log("Edit");
        this.setState({ isEdit: true });

    }

    render() {

        var postList = this.props.postList.post;
        var filtered = postList.filter((item => item.id === this.props.match.params.id));

        var post = filtered[0];
        var isEdit = this.state.isEdit;


        if (post === undefined) {
            return <div />
        }


        return (
            <div>
                <div className="header">
                    <div><Link to="/">Back</Link></div>
                </div>
                <div className="form-container">
                    <div className="form-field">
                        {isEdit ? <div><button onClick={() => this.save(post.id)}>Save</button></div> : <div><button onClick={() => this.edit()}>Edit</button></div>}
                        <div><button className="form-value">Remove</button></div>
                        <div className="post-subitem"><button onClick={() => this.vote(post.id, "upVote")}>Like</button></div>
                        <div className="post-subitem"><button onClick={() => this.vote(post.id, "downVote")}>Dislike</button></div>
                    </div>
                    <div className="form-field">
                        {isEdit ? <div className="form-post-title">
                            <input className="input-text" type="text" defaultValue={post.title} onChange={(event) => this.handleTitleInput(event.target.value)} /></div>

                            : <div className="form-post-title">{post.title}</div>}
                    </div>
                    <div className="form-field">
                        <div className="post-detail-sub">
                            <div><span className="post-subtitle">Author</span> {post.author}</div>
                            <div><span className="post-subtitle">Category</span> {post.category}</div>
                            <div><span className="post-subtitle">Vote</span> {post.voteScore}</div>
                            <div><span className="post-subtitle">Comments</span> {post.commentCount}</div>
                        </div>
                    </div>

                    <div className="form-field">
                        {isEdit ? <div className="form-post-body">
                            <textarea className="input-text" defaultValue={post.body} onChange={(event) => this.handleBodyInput(event.target.value)} />
                        </div> : <div className="form-post-body">{post.body}</div>}
                    </div>
                    <PostComments id={post.id} />
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("State:", state);
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        listPost: (data) => dispatch(listPost(data)),
        editPost:(data)=>dispatch(updatePost(data)),
        upVote: (data) => dispatch(upVote(data)),
        downVote: (data) => dispatch(downVote(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))

