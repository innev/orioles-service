-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "SkillsType" AS ENUM ('professional', 'language', 'technical', 'software', 'life', 'academic', 'social');

-- CreateEnum
CREATE TYPE "VideoSource" AS ENUM ('douyin', 'youtube', 'iqiyi', 'qq', 'youku', 'bilibili', 'sohu');

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "nickname" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "passwordSalt" TEXT,
    "avatar" TEXT,
    "bio" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBrand" (
    "icon" VARCHAR(500) NOT NULL,
    "url" VARCHAR(200) NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "UserBrand_pkey" PRIMARY KEY ("icon")
);

-- CreateTable
CREATE TABLE "App" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" VARCHAR(500) NOT NULL,
    "url" VARCHAR(200) NOT NULL,
    "group" VARCHAR(100),
    "hint" BIGINT DEFAULT 0,
    "visiable" BOOLEAN NOT NULL DEFAULT false,
    "requiresAuth" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "user" TEXT,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" VARCHAR(500) NOT NULL,
    "url" VARCHAR(200) NOT NULL,
    "visiable" BOOLEAN NOT NULL DEFAULT false,
    "type" "SkillsType" NOT NULL DEFAULT 'technical',
    "typeName" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Icon" (
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GitMojis" (
    "name" TEXT NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "emoji" VARCHAR(50) NOT NULL,
    "entity" VARCHAR(50) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "semver" TEXT,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GithubColor" (
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "source" "VideoSource" NOT NULL DEFAULT 'qq',
    "name" TEXT NOT NULL,
    "cover" VARCHAR(500) NOT NULL,
    "url" TEXT NOT NULL,
    "visiable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OneTimePassword" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "otp" VARCHAR(100) NOT NULL,
    "expires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OneTimePassword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceService" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL,
    "device" INTEGER NOT NULL,

    CONSTRAINT "DeviceService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_user_idx" ON "Session"("user");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "UserBrand_user_idx" ON "UserBrand"("user");

-- CreateIndex
CREATE UNIQUE INDEX "App_name_key" ON "App"("name");

-- CreateIndex
CREATE INDEX "App_user_idx" ON "App"("user");

-- CreateIndex
CREATE INDEX "App_group_visiable_idx" ON "App"("group", "visiable");

-- CreateIndex
CREATE UNIQUE INDEX "Skills_name_key" ON "Skills"("name");

-- CreateIndex
CREATE INDEX "Skills_user_idx" ON "Skills"("user");

-- CreateIndex
CREATE INDEX "Skills_type_idx" ON "Skills"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Icon_name_key" ON "Icon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GitMojis_name_key" ON "GitMojis"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GithubColor_name_key" ON "GithubColor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Video_name_key" ON "Video"("name");

-- CreateIndex
CREATE INDEX "OneTimePassword_email_idx" ON "OneTimePassword"("email");

-- CreateIndex
CREATE INDEX "DeviceService_device_idx" ON "DeviceService"("device");

-- CreateIndex
CREATE UNIQUE INDEX "Device_code_key" ON "Device"("code");

