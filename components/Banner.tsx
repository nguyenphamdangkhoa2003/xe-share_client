import Image from "next/image";

const Banner = ({ src, alt }) => {
  return (
    <div className="w-full h-auto">
      <Image 
        src={src} 
        alt={alt} 
        width={1920} 
        height={600} 
        className="w-full object-cover" 
        priority
      />
    </div>
  );
};

export default Banner;
