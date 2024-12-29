import React from "react";
import { FaCss3, FaReact, FaPhp } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiTypescript } from "react-icons/si";

export const iconsData = [
  { name: "html", icon: React.createElement(FaHtml5), color: "#E44D26" },
  { name: "css", icon: React.createElement(FaCss3), color: "#1572B6" },
  { name: "js", icon: React.createElement(IoLogoJavascript), color: "#F0DB4F" },
  { name: "ts", icon: React.createElement(SiTypescript), color: "#3178C6" },
  { name: "jsx", icon: React.createElement(FaReact), color: "#61DAFB" },
  { name: "php", icon: React.createElement(FaPhp), color: "#8892BF" },
];
