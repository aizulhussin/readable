export const LIST_POST = 'LIST_POST';
export const LIST_POST_CATEGORY = 'LIST_POST_CATEGORY';
export const ADD_POST = 'ADD_POST';
export const VIEW_POST = 'VIEW_POST';
export const REMOVE_POST = 'REMOVE_POST';

export const LIST_CATEGORIES = 'LIST_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const VIEW_CATEGORY = 'VIEW_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

export const LIST_COMMENTS = 'LIST_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const VIEW_COMMENT = 'VIEW_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const VOTE_UP='VOTE_UP';
export const VOTE_DOWN='VOTE_DOWN';

export const SORT_VOTE_ASC = 'SORT_VOTE_ASC';
export const SORT_VOTE_DESC = 'SORT_VOTE_DESC';

export function addPost({ post }) {
    return {
        type: ADD_POST,
        post: post
    }
}



export function removePost(post) {
    return {
        type: REMOVE_POST,
        post: post
    }
}

export function viewPost(post) {
    return {
        type: VIEW_POST,
        post: post
    }
}

export function listPostByCategory(posts) {
    return {
        type: LIST_POST_CATEGORY,
        post: posts
    }
}

export function listPost(posts) {
    return {
        type: LIST_POST,
        post: posts
    }
}

export function sortPostByVoteAsc(posts){
    return {
        type:SORT_VOTE_ASC,
        post:posts
    }
}

export function sortPostByVoteDesc(posts){
    return {
        type:SORT_VOTE_DESC,
        post:posts
    }
}

export function upVote(post){
    return{
        type: VOTE_UP,
        post:post
    }
}

export function downVote(post){
    return{
        type: VOTE_DOWN,
        post:post
    }
}


