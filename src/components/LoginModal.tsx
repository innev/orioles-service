'use client'

import { Dispatch, ReactNode, SetStateAction, useCallback, useMemo, useState } from "react";
import { signIn } from 'next-auth/react';
// import { signIn } from '@/lib/auth';
import Image from "next/image";
// import { useTranslation } from "next-i18next";
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/providers/AuthProvider';
import LoadingDots from "@/components/iv-ui/LoadingDots";
import { GithubIcon, GoogleIcon } from "@/components/Icons";

const SignInOAuth2Button = ({ label = 'Sign In', provider = 'google', icon }: { label: string, provider: string, icon?: ReactNode }) => {
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <button
      disabled={signInClicked}
      className={`${signInClicked
        ? "cursor-not-allowed border-gray-200 bg-gray-100"
        : "border border-gray-200 bg-white text-black hover:bg-gray-50"
        } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
      onClick={() => {
        setSignInClicked(true);
        signIn(provider);
      }}
    >
      {signInClicked ? <LoadingDots color="#808080" /> : (
        <>
          {icon}
          <p>{label}</p>
        </>
      )}
    </button>
  );
};

export default () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { showLoginModal, setShowLoginModal } = useAuth();
  const { t } = useTranslation('common');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })
    if (result?.ok) {
      setShowLoginModal(false)
    } else {
      // Handle error
      console.error('Login failed')
    }
  }

  if (!showLoginModal) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200 z-50">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <a href="https://orioles.innev.cn">
              <Image
                src="/logo.svg"
                alt="Logo"
                className="h-10 w-10 rounded-full"
                width={20}
                height={20}
              />
            </a>
            <h3 className="font-display text-2xl font-bold">{t('sign_in')}</h3>
            <p className="text-sm text-gray-500">{t('sign_in_modal_title')}</p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="邮箱"
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密码"
              className="block w-full mb-4 p-2 border rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">登录</button>
            <button onClick={() => setShowLoginModal(false)} className="mt-4 w-full bg-gray-300 text-gray-800 p-2 rounded">关闭</button>
          </div>
        </form>

        {/* <h2 className="text-2xl mb-4">Or</h2> */}
        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          <SignInOAuth2Button
            icon={<GoogleIcon className="h-5 w-5" />}
            label={t("sign_in_with_google")}
            provider="google"
          />

          <SignInOAuth2Button
            icon={<GithubIcon className="h-5 w-5" />}
            label={t("sign_in_with_github")}
            provider="github"
          />
        </div>
      </div>
    </div>
  )
};