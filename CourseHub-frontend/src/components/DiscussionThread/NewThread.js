/**
 * @Author  Jay Bipinchandra Patel
 * @Banner  B00886902
 * @NetID   jy439129
 * @EmailId jy439129@dal.ca
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComp from "../NavbarComp";
import './../../assets/css/NewThread.css';

const DiscussionThreadEndpoint = "https://csci-5709-course-hub-backend.herokuapp.com/discussion";

export default function NewThread(props) {
    const [userId, setUserId] = useState(localStorage.getItem("logged_in_user"));
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
    }, [topic]);

    useEffect(() => {
    }, [description]);

    const changeDescription = (event) => {
        setDescription(event.target.value);
    }

    const changeTopic = (event) => {
        setTopic(event.target.value);
    }

    const createThread = (event) => {
        if(topic == "" || description == "") return;
        let createThreadUrl = DiscussionThreadEndpoint + "/topic";
        let createThread = {
            userId: userId,
            topic: topic,
            description: description
        };
        axios.post(createThreadUrl, createThread).then((res) => {
            navigate("/discussion");
        });
    }

    return (
        <div>
            <NavbarComp />
            <div className="new-thread-root">
                <h1>New Thread</h1>
                <hr/>
                <form>
                    <div class="form-group">
                        <label>Heading</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" onChange={changeTopic} placeholder="Heading" />
                    </div>
                    <br/>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" onChange={changeDescription} rows="3" placeholder="Description"></textarea>
                    </div>
                    <br/>
                    <button type="button" class="btn btn-primary" onClick={createThread}>Create New Thread</button>
                </form>
            </div>
        </div>
    );
};