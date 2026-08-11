import { useState, useRef } from "react";
import styled from "styled-components";

import cameraIcon from "../../assets/images/icons/camera_icon.svg";

const MAX_PHOTOS = 5;

const HiddenFileInput = styled.input`
  display: none;
`;

const PhotoGrid = styled.div`
  width: 350px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  background: #f6f6f6;
  border-radius: 2px;
  outline: 1px solid #e3e3e3;
  outline-offset: -1px;
  overflow: hidden;
`;

const PhotoThumbWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 117 / 200;
`;

const PhotoThumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const EmptyCell = styled.div`
  width: 100%;
  aspect-ratio: 117 / 200;
  background: #f6f6f6;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;

  width: 24px;
  height: 24px;

  border: none;
  border-radius: 50%;
  background: #f6f6f6;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  outline: 0.5px solid #ffffff;
  outline-offset: -0.5px;

  color: #141414;
  font-size: 12px;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const AddMoreCell = styled.button`
  width: 100%;
  aspect-ratio: 117 / 200;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  border: none;
  background: #f6f6f6;

  color: #141414;
  font-size: 10px;
  font-weight: 600;

  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #d0d0d0;
  }
`;

const AddMoreIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

export default function PhotoUploader({ onPhotosChange, onLimitExceeded }) {
  const fileInputRef = useRef(null);
  const [photos, setPhotos] = useState([]);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = MAX_PHOTOS - photos.length;
    const filesToAdd = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      onLimitExceeded?.();
    }

    const newPhotos = filesToAdd.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      url: URL.createObjectURL(file),
    }));

    const updated = [...photos, ...newPhotos];
    setPhotos(updated);
    onPhotosChange?.(updated);
    e.target.value = "";
  };

  const handleRemovePhoto = (id) => {
    const updated = photos.filter((photo) => photo.id !== id);
    setPhotos(updated);
    onPhotosChange?.(updated);
  };

  return (
    <>
      <HiddenFileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />

      <PhotoGrid>
        <AddMoreCell type="button" onClick={handleBoxClick}>
          <AddMoreIcon src={cameraIcon} alt="" />
          {photos.length}/{MAX_PHOTOS}
        </AddMoreCell>

        {Array.from({ length: MAX_PHOTOS }).map((_, index) => {
          const photo = photos[index];

          if (photo) {
            return (
              <PhotoThumbWrapper key={photo.id}>
                <PhotoThumb src={photo.url} alt="업로드된 제품 사진" />
                <RemoveButton
                  type="button"
                  onClick={() => handleRemovePhoto(photo.id)}
                  aria-label="사진 삭제"
                >
                  ✕
                </RemoveButton>
              </PhotoThumbWrapper>
            );
          }

          return <EmptyCell key={`empty-${index}`} />;
        })}
      </PhotoGrid>
    </>
  );
}