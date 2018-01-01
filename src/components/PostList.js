import React from 'react'
import { listPost,sortPostByVoteAsc, sortPostByVoteDesc, upVote, downVote } from '../actions';
import { fetchPost, vote } from '../utils/api';
import { connect } from 'react-redux';
import { Link,withRouter } from 'react-router-dom'




class PostList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: false,
            posts: []
        }
    }


    componentWillMount() {
        console.log("componentWillMount")
        this.getAllPost();
    }

    getAllPost() {
        fetchPost().then((posts) => {
            this.props.listPost(posts);
        });
    }


    vote(id, type) {
        vote(id, type).then((resp) => {

            type === 'upVote' ? this.props.upVote(resp) : this.props.downVote(resp)
        })
    }

    sortVoteScoreAsc(posts) {

        this.props.sortByVoteAsc(posts);
        this.setState({ posts: this.props.post });
    }

    sortVoteScoreDesc(posts) {
        this.props.sortByVoteDesc(posts);
        this.setState({ posts: this.props.post });
    }


    render() {

        var posts = this.props.post;

        console.log("props ", this.props);
        console.log("post ", this.props.post);
        

        if (posts === undefined) {
            return (<div>loading...</div>)
        }


        if (posts.length === 0) {
            return <p>Your search has 0 results.</p>
        }

        if(!Array.isArray(posts)){
            return <p>dddd</p>
        }

        return (
            <div>
                <div className='action-container'>
                <div className="button-container"><button className="button">Add Post</button></div>
                    <div className="button-container"><button className="button" onClick={() => { this.sortVoteScoreAsc(posts) }}>Sort Vote Score Asc</button></div>
                    <div className="button-container"><button className="button" onClick={() => { this.sortVoteScoreDesc(posts) }}>Sort Vote Score Desc</button></div>
                </div>
                <ul className='contact-list'>
                    {posts.map((item) => (
                        <li key={item.id} className='contact-list-item'>

                            <div className='contact-details'>
                                <Link to={`/detail/${item.id}`} state={{detail:true}}> {item.title}</Link>
                            </div>
                            <div className='post-list-sub'>
                                <div> <span className="post-subtitle">Author</span> {item.author}</div>
                                <div className="post-subitem"><span className="post-subtitle">Comments</span> {item.commentCount}</div>
                                <div className="post-subitem"><span className="post-subtitle">Vote score</span> {item.voteScore}</div>
                                <div className="post-subitem"><button onClick={() => this.vote(item.id, "upVote")}>Like</button></div>
                                <div className="post-subitem"><button onClick={() => this.vote(item.id, "downVote")}>Dislike</button></div>
                                <div className="post-subitem"><button>Remove</button></div>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}


function mapDispatchToProps(dispatch) {
    return {
        listPost: (data) => dispatch(listPost(data)),
        sortByVoteAsc: (data) => dispatch(sortPostByVoteAsc(data)),
        sortByVoteDesc: (data) => dispatch(sortPostByVoteDesc(data)),
        upVote: (data) => dispatch(upVote(data)),
        downVote: (data) => dispatch(downVote(data))
    }
}



export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList))