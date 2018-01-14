import {
    ADD_POST,
    REMOVE_POST,
    UPDATE_POST,
    LIST_POST,
    LIST_POST_CATEGORY,
    SORT_VOTE_ASC,
    SORT_VOTE_DESC,
    VOTE_UP,
    VOTE_DOWN,
    LIST_COMMENT, ADD_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT, LIKE_COMMENT, DISLIKE_COMMENT
} from '../actions';

import { compareValues } from '../utils/helper'
import { combineReducers } from 'redux';

const initialPostState =
    {
        post: []
    }

const initialCommentState = { comment: [] };

function removeItem(array, action) {
    return array.filter((item) => item.id !== action.post.id);
}


function commentList(state = initialCommentState, action) {
    switch (action.type) {
        case LIST_COMMENT:
            return {
                ...state,
                comment: action.comment
            }
        case ADD_COMMENT:
            return {
                ...state,
                comment: [...state.comment, action.comment]
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                comment: action.comment
            }
        case UPDATE_COMMENT:
            return {
                ...state, comment: state.comment.map(comment =>
                    (comment.id === action.comment.id)
                        ? { ...comment, body: action.comment.body, title: action.comment.title }
                        : comment
                )
            };

        default:
            return state;
    }
}



function postList(state = initialPostState, action) {


    switch (action.type) {

        case ADD_POST:
            return {
                ...state,
                post: [...state.post, action.post]
            }

        case REMOVE_POST:

            var filtered = removeItem(state.post, action);

            return {
                ...state,
                post: filtered
            }

        case UPDATE_POST:
            return {
                ...state, post: state.post.map(post =>
                    (post.id === action.post.id)
                        ? { ...post, body: action.post.body, title: action.post.title }
                        : post
                )
            };

        case LIST_POST:
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

export default combineReducers({ postList, commentList });