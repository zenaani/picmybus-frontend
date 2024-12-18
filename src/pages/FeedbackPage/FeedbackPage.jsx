import React, {useState} from 'react';
import BannerTopLogo from "../HomePage/Components/BannerTopLogo.jsx";
import malayalam from "../../assets/malayalam.png";
import PicMyBusMalayalam from "../AboutUsPage/Components/PicMyBusMalayalam.jsx";
import {Button, Input, message, Rate} from "antd";
import TextArea from "antd/es/input/TextArea.js";
import Footer from "../HomePage/Components/Footer.jsx";
import imgBus from "../../assets/img_bus.png";
import api from "../../services/api.js";

const FeedbackPage = () => {

    const [rating, setRating] = useState(3);  // Default rating is 3
    const [feedback, setFeedback] = useState("");

    // Handle change in rating
    const handleRatingChange = (value) => {
        setRating(value);
    };

    // Handle change in feedback text
    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };


    // Handle feedback submission
    const handleSubmit = async () => {
        if (!feedback.trim()) {
            // If feedback is empty, show an error message
            message.error('Please enter your feedback.');
            return;
        }

        // Send data to backend
        try {
            const payload = {
                rating: rating,
                message: feedback
            };

            // Send data to backend
            const response = await api.post('/feedback', payload);

            // Check if the response was successful
            if (response.status === 200) {
                console.log('Feedback Submitted:', payload);
                message.success('Thank you for your feedback!');
            } else {
                message.error('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            message.error('An error occurred. Please try again.');
        }

        // Reset form after submit
        setRating(3);  // Reset to default rating
        setFeedback("");  // Clear feedback text
    };

    return (
        <div className="flex-col h-screen">
            <BannerTopLogo/>

            <div className="flex h-full bg-green-600">

                {/* Left half with Bus Image */}
                <div className="h-full w-1/2 bg-green-600 md:block hidden">
                    <img src={imgBus} className="h-full absolute translate-x-[-70px]"/>
                </div>


                {/* Right half with Logo and Content */}
                <div className="flex flex-col h-full w-full md:w-1/2 bg-green-600 items-center">

                    <PicMyBusMalayalam/>

                    <div
                        className="flex-col h-full w-4/5 bg-white rounded-tl-3xl rounded-tr-3xl mt-10 p-14 flex items-center gap-8">
                        <div className="font-bold md:text-2xl text-xl text-center">How was your experience?</div>
                        <Rate  value={rating} defaultValue={3} rootClassName="md:text-3xl text-2xl" onChange={handleRatingChange}/>
                        <TextArea placeholder="Enter your feedback here" className="md:text-lg text-base" style={{ height: '150px' }} value={feedback} onChange={handleFeedbackChange}/>

                        <button
                            className="h-10 bg-green-800 hover:bg-green-900 text-white py-2 px-5 transition duration-500 rounded-lg w-full"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>


                </div>


            </div>



        </div>
    );
};

export default FeedbackPage;