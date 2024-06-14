import React from "react";
import classNames from "classnames";

const Image = ({ className, url, fullUrl, alt }) => {
  const combinedClasses = classNames("object-cover", className);
  const imgUrl = fullUrl || `http://localhost:4000/${url}`;
  console.log(imgUrl);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <img src={imgUrl} alt={alt} className={`${combinedClasses}`} />
    </div>
  );
};

export default Image;
