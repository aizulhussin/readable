import React from 'react'
import { connect } from 'react-redux';
import { fetchPostById } from '../utils/api';
import {viewPost} from '../actions';
import { withRouter } from 'react-router-dom'


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
        console.log("Render:",this.props)
        return (

            

            <div>
                Post Detail
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostDetail))

