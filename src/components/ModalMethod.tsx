import { Modal, ModalOptions } from "./iv-ui";

export const actionConfirmTips = ({ text, onOk, onCancel, ...props }: ModalOptions) => {
  Modal.confirm({
    icon: "",
    title: '',
    width: 340,
    content: <div className="fs14 text-color pt20"> {text} </div>,
    closable: true,
    closeIcon: <i className="iconfont iconguanbi fs18 text-color" />,
    centered: true,
    autoFocusButton: 'cancel',
    // getContainer: document.getElementById('App'),
    ...props,
    onOk() {
      onOk && onOk()
    },
    onCancel() {
      onCancel && onCancel()
    },
  });
}

export const actionInfoTips = ({text, onOk, ...props}: ModalOptions) => {
  Modal.info({
    icon: "",
    title: '',
    width: 340,
    okText: '确定',
    content: <div className="fs14 text-color pt20"> {text} </div>,
    closable: true,
    closeIcon: <i className="iconfont iconguanbi fs18 text-color" />,
    centered: true,
    autoFocusButton: 'cancel',
    // getContainer: document.getElementById('App'),
    ...props,
    onOk() {
      onOk && onOk()
    },
  });
}
