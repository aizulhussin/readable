import {
    ADD_POST,
    REMOVE_POST,
    VIEW_POST,
    LIST_POST,
    SORT_VOTE_ASC,
    SORT_VOTE_DESC,
    VOTE_UP,
    VOTE_DOWN
} from '../actions';

import { compareValues } from '../utils/helper'


const initialPostState =
    {
        post: [
            {
                id: 0,
                timestamp: "03-12-2017", title: "Post", body: "Post Body", author: "author", category: "react", voteScore: 1, deleted: false, commentCount: 0
            }]
    }

function post(state = initialPostState, action) {


    switch (action.type) {

        case ADD_POST:
            return {
                ...state,
                post: action.post
            }
        case REMOVE_POST:
            return {
                ...state,
                post: action.post
            }

        case LIST_POST:
            console.log("LIST:",action)
            return {
                ...state,
                post: action.post
            }
        case VIEW_POST:
        console.log("VIEW:",action.post)
            return {
                ...state,
                post: action.post
            }
        case SORT_VOTE_ASC:

            var sortedAsc = action.post.sort(compareValues('voteScore'));
            
            return {
                ...state,
                post: sortedAsc
            }
        case SORT_VOTE_DESC:

            var sortedDesc = action.post.sort(compareValues('voteScore', 'desc'));

            return {
                ...state,
                post: sortedDesc
            }

        case VOTE_UP:

            var posts = state.post.map(post =>
                (post.id === action.post.id)
                    ? { ...post, voteScore: action.post.voteScore }
                    : post
            )

            return {
                ...state, post: posts
            };

        case VOTE_DOWN:
            return {
                post: state.post.map(post =>
                    (post.id === action.post.id)
                        ? { ...post, voteScore: action.post.voteScore }
                        : post
                )
            };

        default:
            return state;
    }
}

export default post;