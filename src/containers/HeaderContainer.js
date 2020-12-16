import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import { logout } from '../modules/user';

function HeaderContainer({ movieNm }) {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return <Header movieNm={movieNm} user={user} onLogout={onLogout} />;
}

export default HeaderContainer;
