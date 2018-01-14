import React from 'react'
import { fetchComments } from '../utils/api';
import { connect } from 'react-redux';

class PostComments extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            comments: []
        }
    }

    componentDidMount(){
        var id =  this.props.id;
        console.log("Post Id:",id);
        this.getComments(id);
        console.log("PostComments:",this.props);
    }

    getComments(postId){
        
        fetchComments(postId).then((comments)=>{
            console.log(comments);
            this.setState({comments:comments,loading:false});
        });
    }

    vote(){

    }

    render(){
        var comments = this.state.comments;
        return(
            <div>
                <div className="form-field">
                    <div className="comments-title">Comments</div>
                    <div className="post-subitem"><button>Add Comment</button></div>
                </div>
                <div>
                <ul className="comments-list">
                    {
                        comments.map((comment)=>(
                           <li key={comment.id} className="comments-list-item">
                              <div className="comments-body"> {comment.body}</div>
                              <div className='post-list-sub'>
                                <div> <span className="post-subtitle">Author</span> {comment.author}</div>
                                <div className="post-subitem"><span className="post-subtitle">Vote</span> {comment.voteScore}</div>
                                <div className="post-subitem"><button onClick={() => this.vote(comment.id, "upVote")}>Like</button></div>
                                <div className="post-subitem"><button onClick={() => this.vote(comment.id, "downVote")}>Dislike</button></div>
                                <div className="post-subitem"><button>Edit</button></div>
                                <div className="post-subitem"><button>Remove</button></div>
                            </div>
                           </li> 
                        ))
                    }
                </ul> 
                </div>   
            </div>
        );
    }


}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(PostComments)