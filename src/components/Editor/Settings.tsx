import { Dialog } from "@headlessui/react";
import Modal from "@components/Modal";
import Portal from "@components/Portal";
import { useBiscuitBox } from "@hooks/useBiscuitBox";
import { useEvent } from "@hooks/useEvent";
import { VscGear } from "react-icons/vsc";

export default function Settings() {
  const { isOpen, onOpen, onClose } = useBiscuitBox();
  return (
    <>
      <span
        className="text-2xl text-gray-500 font-roboto inline-block p-1 cursor-pointer"
        onClick={onOpen}
      >
        <VscGear />
      </span>

      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Your Settings
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                This feature will be implemented at some point of time in the near future.
              </p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={onClose}
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      {/* {isOpen && (
        <Modal onClose={onClose}>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Payment successful
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Your payment has been successfully submitted. We’ve sent you an
                email with all of the details of your order.
              </p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={onClose}
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </Modal>
      )} */}
    </>
  );
}
