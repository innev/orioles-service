'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { TDockItem } from '@/model/Skills';
import CDN from '@/utils/cdn';
import IconButton from './IconButton';

export default ({ children = [] }: { children: Array<TDockItem>|undefined }) => {
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);
    return (
        <>
            <div className='flex flex-col gap-2 text-center cursor-pointer' onClick={openModal}>
                <div className='w-16 h-16 rounded-2xl bg-slate-100 p-1'>
                    {
                        children.length > 0 && <img src={CDN.icon(children[0]?.icon||'')} alt='' />
                    }
                </div>
                <span className='text-gray-800 text-xs'>{children[0]?.typeName}</span>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10"
                    onClose={closeModal}
                >
                    <div className="h-full w-full mx-auto text-center p-4 md:px-32 md:pt-20 md:pb-32">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-200" />
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className='w-full md:h-full transition-all transform'>
                                <p className='text-gray-500 text-lg mb-4 w-fit mx-auto'>{children[0]?.typeName}</p>
                                <div className='bg-white w-full h-full p-2 md:p-4 shadow-xl rounded-2xl overflow-y-scroll'>
                                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                                        {
                                            children.map((item: TDockItem, index: number) =>
                                                <div className='flex flex-row flex-wrap gap-1'>
                                                    <IconButton key={index} item={item} isCDN={true} />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
