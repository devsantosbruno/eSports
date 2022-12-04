import { CaretLeft, GameController, Plus } from "phosphor-react";
import { NavLink, useParams } from "react-router-dom";

import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css";
import { CopyDiscordModal } from "../components/CopyDiscordModal";

type GameAds = {
  id: string;
  title: string;
  name: string;
  yearsPlaying: string;
  discord: string;
  hourStart: string;
  hourEnd: string;
  game: string;
  useVoiceChannel: any;
  weekDays: any;
};

export default function GameDetail() {
  const [open, setOpen] = useState(false);
  const [ads, setAds] = useState<GameAds[]>([]);

  // get id/title from URL
  const params = useParams<GameAds>();

  useEffect(() => {
    axios(
      `https://e-sports-server-devsantosbruno.vercel.app/games/${params.id}/ads`
    ).then((response) => {
      setAds(response.data);
    });
  }, []);

  if (ads.length > 0) {
    return (
      <div className="container mx-auto px-4 my-20">
        <NavLink to={`/`}>
          <button className="py-2 px-3 bg-violet-500 text-white rounded inline-flex items-center gap-3 whitespace-nowrap mt-3 sm:mt-0 hover:bg-violet-600 transition duration-300">
            <CaretLeft size={16} />
            Voltar
          </button>
        </NavLink>
        <div className="mt-28">
          <h1 className="text-5xl text-white font-bold">{params.title}</h1>
          <h2 className="text-zinc-400 text-xl">
            Conecte-se e comece a jogar!
          </h2>
        </div>
        <div>
          <Swiper
            className="container mt-4 z-0"
            spaceBetween={15}
            slidesPerView={1}
            freeMode={true}
            modules={[FreeMode]}
            breakpoints={{
              470: {
                slidesPerView: 2,
              },
              770: {
                slidesPerView: 3,
              },
              1025: {
                slidesPerView: 4,
              },
              1600: {
                slidesPerView: 6,
              },
            }}
          >
            {ads.map((ad) => {
              return (
                <SwiperSlide key={ad.id}>
                  <div className="rounded-lg overflow-hidden bg-[#2A2634] p-5 flex flex-col gap-3">
                    <div>
                      <p className="text-[#C4C4C6]">Nome</p>
                      <h4 className="text-white font-bold">{ad.name}</h4>
                    </div>
                    <div>
                      <p className="text-[#C4C4C6]">Tempo de jogo</p>
                      <h4 className="text-white font-bold">
                        {ad.yearsPlaying}
                      </h4>
                    </div>
                    <div>
                      <p className="text-[#C4C4C6]">Disponibilidade</p>
                      <h4 className="text-white font-bold">{`${ad.weekDays.length} dias \u2022 ${ad.hourStart} - ${ad.hourEnd}`}</h4>
                    </div>
                    <div>
                      <p className="text-[#C4C4C6]">Chamada de áudio?</p>
                      <h4
                        className={`font-bold ${
                          ad.useVoiceChannel === true
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {ad.useVoiceChannel === true ? "Sim" : "Não"}
                      </h4>
                    </div>

                    <Dialog.Root onOpenChange={setOpen}>
                      <Dialog.Trigger className="mt-5 py-2 px-3 flex items-center justify-center gap-3 whitespace-nowrap rounded bg-violet-500 text-white font-bold hover:bg-violet-600 transition duration-300">
                        <GameController size={16} />
                        Conectar
                      </Dialog.Trigger>

                      <CopyDiscordModal discord={ad.discord} openOrNot={open} />
                    </Dialog.Root>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto px-4 my-20">
        <NavLink to={`/`}>
          <button className="py-2 px-3 bg-violet-500 text-white rounded inline-flex items-center gap-3 whitespace-nowrap mt-3 sm:mt-0 hover:bg-violet-600 transition duration-300">
            <CaretLeft size={16} />
            Voltar
          </button>
        </NavLink>

        <div className="mt-28">
          <h1 className="text-5xl text-white font-bold">{params.title}</h1>
          <h2 className="text-zinc-400 text-xl">
            Conecte-se e comece a jogar!
          </h2>
        </div>

        <h2 className="text-white mt-10 mb-4">Não há anúncios no momento</h2>

        <NavLink to={`/`}>
          <button className="py-2 px-4 bg-violet-500 text-white rounded inline-flex items-center gap-3 whitespace-nowrap mt-3 sm:mt-0 hover:bg-violet-600 transition duration-300">
            <Plus size={16} />
            Seja o primeiro
          </button>
        </NavLink>
      </div>
    );
  }
}
