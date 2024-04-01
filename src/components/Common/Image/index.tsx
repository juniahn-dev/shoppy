interface IImageComponentProps {
  src: string;
  className?: string;
}

const ImageComponent: React.FC<IImageComponentProps> = ({ src, className }) => {
  return <img className={className} src={src} alt="image" width="1000" height="1000" />;
};

export default ImageComponent;
