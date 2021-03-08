import Image from "next/image";

const NotFound = () => {
  return (
    <div className="notFound">
      <Image src="/images/gifs/404.gif" alt="404" width={500} height={500} />
    </div>
  );
};

export default NotFound;
