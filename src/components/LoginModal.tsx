'use client'

import { ReactNode, useState } from "react";
import { signIn } from 'next-auth/react';
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/providers/AuthProvider';
import LoadingDots from "@/components/iv-ui/LoadingDots";
import { GithubIcon, GoogleIcon } from "@/components/Icons";
import { Modal } from "./iv-ui";
import Link from "next/link";

const SignInOAuth2Button = ({ label = 'Sign In', provider, icon }: { label: string, provider: string, icon?: ReactNode }) => {
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
    e.preventDefault();
    const result = await signIn('credentials', { email, password, redirect: false });

    if (result?.ok) {
      setShowLoginModal(false);
    } else {
      console.error('Login failed');
    }
  }

  if (!showLoginModal) return null;

  return (
    <Modal showModal={showLoginModal} setShowModal={setShowLoginModal}>
      <div className="bg-white w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-300">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center space-y-4 px-4 py-6 text-center md:px-12">
            <Link href="https://orioles.innev.cn">
              <Image src="/logo.svg" alt="Logo" className="h-10 w-10 rounded-full" width={20} height={20} />
            </Link>
            <h3 className="font-display text-2xl font-bold">{t('sign_in')}</h3>
            {/* <p className="text-sm text-gray-500">{t('sign_in_modal_title')}</p> */}
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="邮箱，手机或用户名"
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="密码"
              className="block w-full mb-4 p-2 border rounded"
            />
            <div className="flex w-full items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <span className="text-sm text-gray-600">记住我</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">忘记密码？</a>
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">登录</button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm uppercase">
            <span className="bg-white px-1 text-muted-foreground">或者</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4 px-4 py-6 md:px-16">
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

        <div className="text-center text-sm text-gray-600 mb-8">
          还没有账号？{" "}
          <a href="#" className="text-primary hover:underline">立即注册</a>
        </div>
      </div>
    </Modal>
  )
};