import React ,{ useState } from "react";

const ImageInput = ({ onImageChange, multiple = false }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    console.log(files)
    console.log(files[0])
    console.log(files.length)
    if (files && files.length > 0) {
      const reader = new FileReader();
      console.log('boas1')
      reader.onload = (e) => setPreviewImage(e.target.result);
      console.log('boas2')
      reader.readAsDataURL(files[0]);
      onImageChange(event);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-lg cursor-pointer  bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-center text-gray-400">
            <span className="font-semibold">Clique para dar upload</span> ou
            arraste e largue
          </p>
          <p className="text-xs text-gray-400">SVG, PNG, JPG, GIF</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleImageUpload}
          multiple={multiple}
          accept="image/*,video/*"
        />
      </label>
      {previewImage && (
        <div className="flex-shrink-0 ml-4">
          <img src={previewImage} alt="Uploaded preview" style={{ maxWidth: "200px", maxHeight: "200px" }} />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
