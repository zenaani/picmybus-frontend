import React, {useState} from 'react';
import BannerTopLogo from "../HomePage/Components/BannerTopLogo.jsx";
import malayalam from "../../assets/malayalam.png";
import PicMyBusMalayalam from "../AboutUsPage/Components/PicMyBusMalayalam.jsx";
import {Button, Input, message, Rate} from "antd";
import TextArea from "antd/es/input/TextArea.js";
import Footer from "../HomePage/Components/Footer.jsx";

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
    const handleSubmit = () => {
        if (!feedback.trim()) {
            // If feedback is empty, show an error message
            message.error('Please enter your feedback.');
            return;
        }

        // Send data to backend
        console.log('Feedback Submitted:', { rating, feedback });

        // Reset form after submit
        setRating(3);  // Reset to default rating
        setFeedback("");  // Clear feedback text
        message.success('Thank you for your feedback!');
    };

    return (
        <div className="flex-col h-screen">
            <BannerTopLogo/>

            <div className="flex h-full bg-green-600">

                {/* Left half with Bus Image */}
                <div className="h-full w-1/2 bg-green-600">
                    {/* Bus Image comes here */}
                </div>


                {/* Right half with Logo and Content */}
                <div className="flex flex-col h-full w-1/2 bg-green-600 items-center">

                    <PicMyBusMalayalam/>

                    <div
                        className="flex-col h-full w-4/5 bg-white rounded-tl-3xl rounded-tr-3xl mt-10 p-14 flex items-center gap-8">
                        <div className="font-bold text-2xl">How was your experience?</div>
                        <Rate defaultValue={3} rootClassName="text-3xl" onChange={handleRatingChange}/>
                        <TextArea placeholder="Enter your feedback here" className="text-lg" style={{ height: '150px' }} onChange={handleFeedbackChange}/>

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