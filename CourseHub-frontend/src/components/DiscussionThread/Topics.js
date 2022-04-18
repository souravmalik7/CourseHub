/**
 * @Author  Jay Bipinchandra Patel
 * @Banner  B00886902
 * @NetID   jy439129
 * @EmailId jy439129@dal.ca
 */
import axios from "axios";
import { useEffect, useState } from "react";
import NavbarComp from "../NavbarComp";
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from "@mui/icons-material";
import './../../assets/css/Topic.css'
import DeleteIcon from '@mui/icons-material/Delete';

const DiscussionThreadEndpoint = "https://csci-5709-course-hub-backend.herokuapp.com/discussion";

export default function Topics(props) {
    const [userId, setUserId] = useState(localStorage.getItem("logged_in_user"));
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();
    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        let fetchTopicsUrl = DiscussionThreadEndpoint + "/topics";
        axios.get(fetchTopicsUrl).then((res) => {
            setTopics(res.data.topics);
        });
    }, []);

    useEffect(() => {
        if(selectedTopic != null) {
            navigateToTopic();
        }
    }, [selectedTopic]);

    const openComments = (topic) => {
        setSelectedTopic(topic);
    };

    async function navigateToTopic() {
        navigate("/discussion/topic/" + selectedTopic);
    }

    const createNewThread = () => {
        if (localStorage.getItem("logged_in_user") == '') {
            navigate(`/login`);
        } else {
            navigate("/discussion/new-thread");
        }
    }

    const deleteTopic = (topicId) => {
        let deleteTopicUrl = DiscussionThreadEndpoint + "/topic/" + topicId;
        axios.delete(deleteTopicUrl).then((res) => {
            let fetchTopicsUrl = DiscussionThreadEndpoint + "/topics";
            axios.get(fetchTopicsUrl).then((res) => {
                setTopics(res.data.topics);
            });
        });
    }

    return (
        <div>
            <NavbarComp />
            <div className="discussion-forum-root">
                <h1>Discussion Forum</h1>
                <hr/>
                <div className='new-thread-btn' onClick={createNewThread}>
                    <button type="button" class="btn btn-light">Start a New Thread</button>
                </div>
                <div className="discussion-root">
                    {topics.map((topic) => (
                        <div className="topic">
                            <div className="topic-user">
                                <div>
                                    <AccountCircle style = {{ fontSize : 70 }}/>
                                </div>
                                <div>
                                    {topic.userId}
                                </div>
                            </div>
                            <div className="topic-metadata">
                                <div className='topic-name' onClick={() => openComments(topic._id)}>
                                    <h3>{topic.topic}</h3>
                                </div>
                                <div className='topic-description-limit'>
                                    {topic.description}
                                </div>
                            </div>
                            <div className="delete-icon">
                                {userId == topic.userId ? (<DeleteIcon className='icon_delete' sx={{ color: "darkred" }} onClick={() => deleteTopic(topic._id)}/>) : (<></>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}