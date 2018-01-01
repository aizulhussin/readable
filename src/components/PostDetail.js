import React from 'react'


class PostDetail extends React.Component{

    componentWillMount(){
        console.log(this.props.match.params.id);
    }

    render(){
        return (

            <div>
                Post Detail
            </div>    
        )
    }
}

export default PostDetail


