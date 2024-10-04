import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

export const VideoEmbed = ({thumbnail, videolink}) => {

    const videoRef = useRef(null);
    const [videoPlay, setVideoPlay] = useState(true);

    const handlePlay = () => {
        if (videoRef.current) {
            setVideoPlay(!videoPlay);
            videoRef.current.play();
        }else{
            setVideoPlay(!videoPlay);
            videoRef.current.pause();
        }
    };

    return (
        <div className="flex items-center justify-center">
            <video ref={videoRef} poster={thumbnail} muted style={{ width: '100%' }}>
                <source src={videolink} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {videoPlay?<button className="absolute" onClick={()=>handlePlay()}><FontAwesomeIcon icon={faPlayCircle} className="text-white" style={{height: 30, width: 30}}/></button>:<></>}
        </div>
    );
};
