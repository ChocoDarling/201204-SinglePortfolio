import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register, login } from '../modules/auth';
import AuthForm from '../components/Auth/AuthForm';
import { check } from '../modules/user';

export const RegisterForm = ({ history }) => {
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const inputArr = [
    {
      autoComplete: 'username',
      name: 'username',
      nameKo: '아이디',
      type: 'text',
    },
    {
      autoComplete: 'password',
      name: 'password',
      nameKo: '비밀번호',
      type: 'password',
    },
    {
      name: 'passwordConfirm',
      nameKo: '비밀번호 확인',
      type: 'password',
    },
    {
      name: 'name',
      nameKo: '이름',
      type: 'text',
    },
    {
      name: 'phone',
      nameKo: '전화번호',
      type: 'text',
    },
    {
      name: 'email',
      nameKo: '이메일',
      type: 'email',
    },
  ];
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm, name, phone, email } = form;
    if (password !== passwordConfirm) {
      return;
    }
    dispatch(register({ username, password, name, phone, email }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      return;
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [user, history]);

  return (
    <AuthForm
      title="회원가입"
      inputArr={inputArr}
      other={{ title: '로그인', link: `login` }}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export const LoginForm = ({ history }) => {
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const inputArr = [
    {
      autoComplete: 'username',
      name: 'username',
      nameKo: '아이디',
      type: 'text',
    },
    {
      autoComplete: 'password',
      name: 'password',
      nameKo: '비밀번호',
      type: 'password',
    },
  ];

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      return;
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);

  return (
    <AuthForm
      title="로그인"
      inputArr={inputArr}
      other={{ title: '회원가입', link: `register` }}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};
