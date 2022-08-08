import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from "slices/user";
import { Explain, Search } from 'components/Main';

const Main = () => {
  const dispatch = useDispatch();
    const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(setUser(localStorage.getItem(user?.uid)));
    });
  });

  return (
    <>
      <Explain />
      <Search />
    </>
  );
};

export default Main;
