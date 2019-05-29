import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function MyDropzone(props) {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    // Do something with the files
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div
      style={{
        border: '2px solid red',
        height: '300px',
        backgroundImage: `url(${props.backgroundPicture})`,
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {true ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  )
}

export default MyDropzone
