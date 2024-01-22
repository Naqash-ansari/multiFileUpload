import React, { useState, useEffect } from 'react';

const MultiFileUpload = ({ getImages, getEvidenceImage, getCurntImgId }) => {
  const [files, setFiles] = useState([]);
  const [filesEdit, setFilesEdit] = useState([]);
  const [filesRender, setFilesRender] = useState(false);

  const addFile = (file) => {
    const isImage = file.type.startsWith('image/');

    if (isImage) {
      setFiles((prevFiles) => [...prevFiles, file]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    for (const file of e.dataTransfer.files) {
      addFile(file);
    }
  };

  const handleInputChange = (e) => {
    for (const file of e.target.files) {
      addFile(file);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleRemoveFileEdit = (index) => {
    const newFiles = [...filesEdit];
    newFiles.splice(index, 1);
    setFilesEdit(newFiles)
    setFilesRender(true)
  }

  useEffect(() => {
    // if(filesEdit?.length > 0 && files.length > 0){
    //   let newObj = [...filesEdit, ...files]
    //     getImages(newObj)
    //     setFilesRender(false)

    // }else{
    //   getImages(filesEdit)
    //   setFilesRender(false)
    // }

    let ImgId = filesEdit?.map(({ _id }) => {
      return _id
    })

    // if (ImgId?.length > 0) {
    // }

    getCurntImgId(ImgId)
    console.log('Submitted Files:', files);

    getImages(files)


  }, [files, filesRender, filesEdit])


  useEffect(() => {
    setFilesEdit(getEvidenceImage)
    setFilesRender(true)
  }, [getEvidenceImage])


  return (
    <main className="mx-auto w-full max-w-screen-xl">
      <div
        className={`relative h-full flex flex-col rounded-md ${files.length > 0 ? 'border-1 border-[#53aebd] border-dashed p-8' : ''}`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* Rest of the modal content */}

        {/* Scroll area */}
        <section className="h-full w-full h-full flex flex-col">
          {/* Header */}
          <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            {/* Label for selecting files */}
            <label
              htmlFor="hidden-input"
              className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none cursor-pointer"
            >
              Upload images
            </label>
            {/* Input for selecting files */}
            <input
              id="hidden-input"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleInputChange}
            />
          </header>

          {/* List of uploaded images */}
          <div className=''>

            <ul id="gallery" className="flex mt-2 flex-1 flex-wrap -m-1">
              {filesEdit && filesEdit?.length > 0 && filesEdit?.map((file, index) => (
                <li
                  key={index}
                  className="block evidence_image p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24 relative"
                >
                  <img
                    src={`data:image/png;base64,${file.data}`}
                    alt={file.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type='button'
                    className="absolute top-2 right-2 tx-4 text-red bg-gray-300 hover:bg-gray-100 p-1 rounded-full "
                    onClick={() => handleRemoveFileEdit(index)}
                  >
                    <i className="bi bi-trash3 text-danger"></i>
                  </button>
                </li>
              ))}
              {files?.map((file, index) => (
                <li
                  key={index}
                  className="block evidence_image p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24 relative"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type='button'
                    className="absolute top-2 right-2 tx-4 text-red bg-gray-300 hover:bg-gray-100 p-1 rounded-full "
                    onClick={() => handleRemoveFile(index)}
                  >
                    <i className="bi bi-trash3 text-danger"></i>
                  </button>
                </li>
              ))}


            </ul>
          </div>

        </section>



      </div>


    </main>
  );
};

export default MultiFileUpload;
