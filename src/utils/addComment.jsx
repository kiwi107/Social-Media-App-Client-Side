
const addComment = (e, post_id, comments, setComments, JWT) => {
    e.preventDefault();


    let text = e.target.querySelector('textarea').value;

    fetch(`${process.env.REACT_APP_SERVER_URL}/posts/comment`, {
        method: 'POST',
        body: JSON.stringify({
            post_id: post_id,
            text: text
        }),
        headers: {
            'Content-Type': 'application/json',
            'JWT': JWT || '',
        }
        , credentials: 'include',
    })
        .then(res => res.json())
        .then(res => {
            if (res.message === "Comment created") {
                setComments([...comments, res.comment]);
                e.target.querySelector('textarea').value = '';
            } else {
                console.log(res.message);
            }
        })
        .catch(err => {
            console.log(err);
        });
};

export default addComment;
