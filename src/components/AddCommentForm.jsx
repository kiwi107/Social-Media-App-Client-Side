import addComment from '../utils/addComment';
import { useState } from "react";

const AddCommentForm = ({ post_id, comments, setComments }) => {
    const [text, setText] = useState('');


    return (
        <div>
            <form onSubmit={(e) => addComment(e, post_id, comments, setComments)} className="m-3">
                <textarea
                    id='commentFormTextarea'
                    className="form-control"
                    rows="3"
                    placeholder={`Add a comment`}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <div className="d-flex justify-content-end m-2">
                    <button
                        disabled={!text}
                        type="submit"
                        className="btn btn-primary"
                    >Post
                    </button>
                </div>
            </form>

        </div>
    )
}

export default AddCommentForm