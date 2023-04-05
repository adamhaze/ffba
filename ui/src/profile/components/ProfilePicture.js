
export const ProfilePicture = ({ imageUrl, size }) => {
  const style = {
    width: size || '50px',
    height: size || '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    objectPosition: 'center center',
    position: 'absolute',
    top: '20px',
    right: '20px',
  };

  return (
    <img
      src={imageUrl}
      alt="profile"
      style={style}
    />
  );
};

// export ProfilePicture;
