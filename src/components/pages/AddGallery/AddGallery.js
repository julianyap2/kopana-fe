import React, { useState, useRef } from "react";

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

    Kopana.post('/galeri', formData)
      .then(console.log)
      .catch(console.error);
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
