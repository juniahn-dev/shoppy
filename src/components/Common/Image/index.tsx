import Image, { StaticImageData } from 'next/image';

interface IImageComponentProps {
  src: string | StaticImageData;
  className?: string;
}

const ImageComponent: React.FC<IImageComponentProps> = ({ src, className }) => {
  return <Image className={className} src={src} alt="image" width="1000" height="1000" />;
};

export default ImageComponent;
