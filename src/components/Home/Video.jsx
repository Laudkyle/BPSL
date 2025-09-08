import React from 'react';
const video = "https://res.cloudinary.com/dvadtratp/image/upload/v1747327037/bestpointgh/alnskzzb5ond5r0ofxpi.gif"

const BackgroundVideo = () => {
  return (
    <div className="relative w-[90vw] h-full overflow-hidden">
      {/* Use <img> for GIFs */}
      <img
        src={video}
        alt="Background animation"
        className="absolute top-0 left-0 w-full h-full object-fill"
      />
    </div>
  );
};

export default BackgroundVideo;
