import { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';

interface IModalProps {
  title?: string,
  content?: string|ReactElement,
  open?: Boolean,
  onOk?: Function,
  onCancel?: Function
}

interface ButtonProps {
    size?: string,
    className?: string
}

export interface ModalSampleOptions {
    text?: string | ReactNode,
    title?: string,
    icon?: string,
    okText?: string,
    cancelText?: string,
    okButtonProps?: ButtonProps,
    cancelButtonProps?: ButtonProps,
    width?: Number,
    height?: Number,
    content?: string | ReactNode,
    closable?: Boolean,
    closeIcon?: ReactNode,
    centered?: Boolean,
    autoFocusButton?: string,
    getContainer?: HTMLElement,
    onOk?: Function,
    onCancel?: Function,
}

const Modal = ({ title, content, open = false, onOk, onCancel }: IModalProps) => {
  const [isOpen, setIsOpen] = useState<Boolean>(open);
  
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    onCancel && onCancel(false);
  };


  return useMemo(() => {
    if(!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-40">
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="bg-white p-6 rounded z-50">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p>{content}</p>
          <button onClick={closeModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">关闭</button>
        </div>
      </div>
    );
  }, [isOpen]);

  /*
  return (    
    <div>
      <button onClick={openModal} className="bg-blue-500 text-white py-2 px-4 rounded">打开模态框</button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <p>{content}</p>
            <button onClick={closeModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">关闭</button>
          </div>
        </div>
      )}
    </div>
  );
  */
};

Modal.confirm = ({ text }: ModalSampleOptions) => {
    confirm(text as string);
};
Modal.info = ({ text }: ModalSampleOptions) => {
    alert(text);
};

export default Modal;