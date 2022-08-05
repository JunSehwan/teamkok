import Image from 'next/image';
import Skeleton from "components/Common/Skeleton";
import useUsersInfo  from "hooks/useUsersInfo";
import PropTypes from 'prop-types';
import profilePic from 'public/image/icon/happiness.png';


const AvatarFromId = ({ uid, size = 30 }) => {
  const { data, loading, error } = useUsersInfo([uid]);
  if (loading)
    return (
      <Skeleton
        className="rounded-full"
        style={{ width: size, height: size }}
      ></Skeleton>
    );

  if (error)
    return (
      <Image
        width={30}
        height={30}
        alt="avatar"
        src={profilePic}
        className="rounded-full"
        // style={{ width: size, height: size }}
      />
    );

  return (
    <Image
      width={30}
      height={30}
      alt="avatar"
      title={data?.[0].data()?.username}
      style={{ width: size, height: size }}
      className="rounded-full object-cover"
      src={data?.[0].data()?.avatar || profilePic}
    ></Image>
  );
};

AvatarFromId.propTypes = {
  uid: PropTypes.string,
  size: PropTypes.number,
};

export default AvatarFromId;