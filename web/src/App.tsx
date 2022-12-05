import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "./assets/logo-nlw-esports.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { GameBanner } from "./components/GameBanner";

import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "./styles/main.css";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center my-20 px-4">
      <img className="max-w-[200px] md:max-w-none" src={logoImg} alt="" />
      <h1 className="text-5xl md:text-6xl mt-10 md:mt-19 text-white font-black">
        Seu{" "}
        <span className="bg-nlw-gradient text-transparent bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <Swiper
        className="container mt-10 z-0"
        spaceBetween={15}
        slidesPerView={2}
        freeMode={true}
        modules={[FreeMode]}
        breakpoints={{
          570: {
            slidesPerView: 3,
          },
          770: {
            slidesPerView: 4,
          },
          960: {
            slidesPerView: 5,
          },
          1160: {
            slidesPerView: 6,
          },
        }}
      >
        {games.map((game) => {
          return (
            <SwiperSlide key={game.id}>
              <NavLink to={`game/${game.id}/${game.title}`}>
                <GameBanner
                  bannerUrl={game.bannerUrl}
                  title={game.title}
                  adsCount={game._count.ads}
                />
              </NavLink>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
