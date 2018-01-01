
export function fetchPost() {
    return fetch("http://localhost:3001/posts",
        {
            method: 'GET',
            headers: {
                'Authorization': 'mytoken123',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());
}

export function fetchPostById(id) {
    return fetch("http://localhost:3001/posts/"+id,
        {
            method: 'GET',
            headers: {
                'Authorization': 'mytoken123',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());
}

export function vote(id,voteType) {
    return fetch("http://localhost:3001/posts/"+id,
        {
            method: 'POST',
            headers: {
                'Authorization': 'mytoken123',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({option:voteType})
        }).then((res) => res.json());
}

