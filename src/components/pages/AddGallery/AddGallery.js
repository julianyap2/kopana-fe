import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const AddGallery = () => {
  const [selectedFile, setImg] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    const files = selectedFile;
    // if (files.length !== 0) {
    //   for (const single_file of files) {
    //     formData.append("galery", single_file);
    //   }
    // }
    Array.from(files).forEach(image => {
      formData.append("galery", image);
  });

    // formData.append('galery', selectedFile)
    // formData.append('imageSuratTeraTimbangan', fotoProfile)
    // formData.append('imageKelengkapanSarana', selectedFile)

    const url = "http://localhost:3000/api/v1/galeri";
    const res = await axios.post(url, formData);
    console.log(res);
  }

  return (
    <div>
      <div className="m-3">
        <label className="mx-3">Choose file:</label>
        <input
          className="d-none"
          type="file"
          multiple
          onChange={(e)=>setImg(e.target.files)}
        />
        <button
          onClick={handleSubmit}
          
        >
          upload
        </button>
      </div>
    </div>
  );
};

export default AddGallery;
