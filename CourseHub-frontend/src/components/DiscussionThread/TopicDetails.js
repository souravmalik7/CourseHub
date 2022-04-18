/**
 * @Author  Jay Bipinchandra Patel
 * @Banner  B00886902
 * @NetID   jy439129
 * @EmailId jy439129@dal.ca
 */

import axios from "axios";
import { useEffect, useState } from "react";
import NavbarComp from "../NavbarComp";
import { useNavigate, useParams } from 'react-router-dom';
import { AccountCircle } from "@mui/icons-material";
import './../../assets/css/TopicDetails.css'
import DeleteIcon from '@mui/icons-material/Delete';

const DiscussionThreadEndpoint = "https://csci-5709-course-hub-backend.herokuapp.com/discussion";

export default function TopicDetails(props) {
	const [userId, setUserId] = useState(localStorage.getItem("logged_in_user"));
	const [topic, setTopic] = useState({});
	const [comments, setComments] = useState([]);
	const params = useParams();
	const [comment, setComment] = useState("");

	useEffect(() => {
		let topicId = params.topicId;
		let fetchTopicUrl = DiscussionThreadEndpoint + "/topic" + "/" + topicId;
		let fetchCommentsUrl = DiscussionThreadEndpoint + "/comments" + "/" + topicId;
		axios.get(fetchTopicUrl).then((res) => {
			setTopic(res.data.topic);
		});
		axios.get(fetchCommentsUrl).then((res) => {
			setComments(res.data.comments);
		});
	}, []);

	useEffect(() => {
	}, [comments]);

	const handleCommentChange = (event) => {
		setComment(event.target.value);
	}

	useEffect(() => {
	}, [comment]);

	const doComment = (event) => {
		if(comment == "") return;
		let commentModel = {
			topicId: topic._id,
			userId: userId,
			comment: comment
		};
		let saveCommentUrl = DiscussionThreadEndpoint + "/comment";
		axios.post(saveCommentUrl, commentModel).then((res) => {
			let fetchCommentsUrl = DiscussionThreadEndpoint + "/comments" + "/" + topic._id;
			axios.get(fetchCommentsUrl).then((res) => {
				setComments(res.data.comments);
			});
			setComment("");
		});
	}

	const deleteComment = (commentId) => {
		let deleteCommentUrl = DiscussionThreadEndpoint + "/comment/" + commentId;
		axios.delete(deleteCommentUrl).then((res) => {
            let fetchCommentsUrl = DiscussionThreadEndpoint + "/comments" + "/" + params.topicId;
            axios.get(fetchCommentsUrl).then((res) => {
				setComments(res.data.comments);
			});
        });
	}

	return (
		<div>
			<NavbarComp />
			<div className='topic-root'>
				<div className='topic-detail'>
					<div className="topic-user">
						<div>
							<AccountCircle style = {{ fontSize : 70 }}/>
						</div>
						<div>
	                        {topic.userId}
						</div>
					</div>
					<div className="topic-desc">
						<div className='topic-title'>
							<h2>{topic.topic}</h2>
						</div>
						<div className='topic-description'>
							{topic.description}
						</div>
					</div>
				</div>
				<hr/>
				<div className='topic-comments-root'>
					<div className='add-comment'>
						<input className='comment-box' value={comment} onChange={handleCommentChange} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Add Comment"></input>
						<button className='comment-btn' onClick={doComment} type="submit" class="btn btn-primary">Comment</button>
					</div>
					<div className='comment-root'>
						{comments.map((comment) => (
	                        <div className='comment'>
	                        	<div className='comment-user'>
									<div>
										<AccountCircle style = {{ fontSize : 50 }}/>
									</div>
									<div>
	                        			{comment.userId}
									</div>
	                        	</div>
	                        	<div className='comment-text'>
	                        		{comment.comment}
	                        	</div>
								<div className="delete-icon">
									{userId == comment.userId ? (<DeleteIcon className='icon_delete' sx={{ color: "darkred" }} onClick={() => deleteComment(comment._id)}/>) : (<></>)}
								</div>
	                        </div>
	                    ))}
                    </div>
				</div>
			</div>
		</div>
	);
}