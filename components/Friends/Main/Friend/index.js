import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import FriendCard from './FriendCard';


const index = ({ friend, id }) => {

  const [show, setShow] = useState(true);



  return (
    <div key={id} className={`${show ? "block" : "hidden"}`}>
      <FriendCard
        friend={friend}
        show={show}
        setShow={setShow} />
    </div>
  );
};

index.propTypes = {
  friend: PropTypes.object,
  id: PropTypes.string,
}


export default index;