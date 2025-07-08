import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

const MAX_FILES = 20;

export interface MediaItem {
  url: string;
  type: 'image' | 'video';
  caption: string;
}

interface Props {
  media: MediaItem[];
  onChange: (media: MediaItem[]) => void;
}

// Simulated upload function – replace with real Cloudinary logic
const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_upload_preset');
  formData.append('folder', 'properties');

  // Example static response for now
  // const res = await fetch("https://api.cloudinary.com/v1_1/<cloud_name>/auto/upload", {
  //   method: "POST",
  //   body: formData,
  // });
  // const data = await res.json();
  // return data.secure_url;

  return "https://res.cloudinary.com/dhhknhoo2/image/upload/v1751956131/property.jpg";
};

const PropertyGalleryStep: React.FC<Props> = ({ media, onChange }) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const uploads = await Promise.all(
        acceptedFiles.map(async (file) => {
          const url = await uploadFile(file);
          const type = file.type.startsWith('image/')
            ? 'image'
            : file.type.startsWith('video/')
              ? 'video'
              : 'image';

          return {
            url,
            type: type as 'image' | 'video',
            caption: '',
          };
        })
      );

      const next = [...media, ...uploads].slice(0, MAX_FILES);
      onChange(next);
    },
    [media, onChange]
  );

  const removeMedia = (index: number) => {
    const updated = media.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateCaption = (index: number, newCaption: string) => {
    const updated = [...media];
    updated[index].caption = newCaption;
    onChange(updated);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'video/*': [],
    },
    noClick: true,
    noKeyboard: true,
    maxFiles: MAX_FILES,
  });

  return (
    <div className="space-y-4 p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
      >
        <input {...getInputProps()} />
        <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-2" />
        <p className="text-gray-600 mb-4">
          {isDragActive
            ? 'Drop files here…'
            : `Drag & drop up to ${MAX_FILES} images or videos, or`}
        </p>
        <button
          type="button"
          onClick={open}
          className="px-4 py-2 bg-black text-white rounded hover:bg-secondary-red"
        >
          Browse files
        </button>
      </div>

      {Array.isArray(media) && media.length > 0 && (
        <div>
          <p className="text-sm text-gray-600 mb-2">
            {media.length} / {MAX_FILES} uploaded
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((item, index) => (
              <div key={index} className="relative">
                {item.type === 'video' ? (
                  <video
                    src={item.url}
                    className="w-full h-24 object-cover rounded"
                    controls
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={`Media ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                )}

                <input
                  type="text"
                  placeholder="Enter caption"
                  value={item.caption}
                  onChange={(e) => updateCaption(index, e.target.value)}
                  className="w-full mt-1 px-2 py-1 text-sm border border-gray-300 rounded"
                />

                <button
                  type="button"
                  onClick={() => removeMedia(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGalleryStep;
