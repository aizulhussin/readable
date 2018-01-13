import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'


class PostAdd extends React.Component {


    componentDidMount() {
        console.log('Category:', this.props.match.params.category);
    }

    render() {
        return (
            <div className="form-container">
                <div>Add Post</div>
                <div className="form-field">Category {this.props.match.params.category}</div>
                <div className="form-field">Title</div>
                <div className="form-value"></div>
                <div className="form-field">Body</div>
                <div className="form-value"></div>
                <div className="form-field">Author</div>
                <div className="form-value"></div>
            </div>
        );
    }
}

export default withRouter(PostAdd)