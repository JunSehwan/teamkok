
const Skeleton = ({ className, ...others }) => {
  return (
    <div className={`animate-pulse bg-gray-300 ${className}`} {...others}></div>
  );
};

export default Skeleton;