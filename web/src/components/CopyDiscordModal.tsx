import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle } from "phosphor-react";
import { useEffect, useState } from "react";

export function CopyDiscordModal(props: any) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (props.openOrNot === false) {
      setCopied(false);
    }
  });

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed grid place-items-center">
        <Dialog.Content className="fixed overflow-y-auto max-h-[650px] grid place-content-center items-center bg-[#2A2634] py-12 sm:px-20 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg min-w-[300px] shadow-lg shadow-black/50 text-center">
          <CheckCircle size={80} className="text-emerald-400 mx-auto" />

          <Dialog.Title className="text-3xl font-black mt-8">
            Let’s play!
          </Dialog.Title>

          <p className="text-zinc-400">Agora é só começar a jogar!</p>

          <h2 className="font-semibold text-white mt-10">
            Adicione no Discord
          </h2>

          <button
            type="button"
            className="bg-zinc-900 mt-2 mb-1 py-3 px-2 sm:px-4 rounded text-sm placeholder:text-zinc-500"
            onClick={() => {
              navigator.clipboard.writeText(props.discord);
              setCopied(true);
            }}
          >
            {props.discord}
          </button>

          <small
            className={`${
              copied === true ? "text-emerald-400" : "text-zinc-400"
            }`}
          >
            {copied === true ? "Copiado" : "Clique para copiar"}
          </small>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
