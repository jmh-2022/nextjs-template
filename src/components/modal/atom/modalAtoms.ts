import { ReactNode } from 'react';
import { atom } from 'recoil';

export type ModalWrapperProps = (props: ModalProps) => React.ReactNode;

export type ModalProps = {
    onClose?: () => void;
    // onSubmit?: () => void;
    children: ReactNode;
    modalId?: string;
};

export type ModalWithOutChildrenProps = Omit<ModalProps, 'children'>;

export type ModalComponentProps<T = any> = {
    ModalWrapper: ModalWrapperProps; // 모달을 감쌀 객체를 정의
    // onSubmit?: (args: T) => void;
    children: ReactNode; // 모달 안에 들어갈 내용 정의
    modalId?: string;
};

// export type TModalId = { modalId: string };

type ModalComponentListProps = {
    modalList: ModalComponentProps[];
};

export const modalsAtom = atom<ModalComponentListProps>({
    key: 'modalsAtom',
    default: {
        modalList: [],
    },
});
