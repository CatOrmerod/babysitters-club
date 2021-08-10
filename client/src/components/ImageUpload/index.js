import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";
import './image.css';

import defaultImage from "../../assets/images/image_placeholder.jpg";
import defaultAvatar from "../../assets/images/placeholder.jpg";

function ImageUpload(props) {
  const [file, setFile] = React.useState();
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.avatar ? defaultAvatar : defaultImage
  );
  const fileInput = React.useRef(null);
  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        props.setFormState( (formState) => {
          return {
            ...formState,
            babysitterPic: reader.result
          }
        });
        console.log(reader.result)
        setFile(reader.result)
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleClick = () => {
  //   fileInput.current.click();
  // };
  // const handleRemove = () => {
  //   props.setFormState(null);
  //   setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
  //   fileInput.current.value = null;
  // };
  return (
    <div className="fileinput text-center fileinput-new" data-provides='fileinput'>
      <div className={"thumbnail" + (props.avatar ? " img-circle" : "")}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <input type="file" onChange={handleImageChange} ref={fileInput} className='btn'/>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
};

export default ImageUpload;
