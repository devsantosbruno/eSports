import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";
import { CaretDown, CaretUp, Check, GameController } from "phosphor-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const styles = {
  input:
    "bg-zinc-900 py-3 px-2 sm:px-4 rounded text-sm placeholder:text-zinc-500",
};

interface Game {
  id: string;
  title: string;
}

interface Inputs {
  name: string;
  yearsPlaying: string;
  discord: string;
  hourStart: string;
  hourEnd: string;
  game: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [game, setGame] = useState<string>();
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [gameChanged, setGameChanged] = useState(false);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  // react hook form
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.post(`http://localhost:3333/games/${game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      alert("anuncio criado com sucesso!");
    } catch (err) {
      console.log(err);
      alert("erro ao criar o anuncio!");
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed grid place-items-center">
        <Dialog.Content className="fixed overflow-y-auto h-full max-h-[650px] grid place-content-center bg-[#2A2634] py-8 px-5 sm:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg min-w-[300px] shadow-lg shadow-black/50">
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="game">Qual o game?</Label>

              <Select.Root
                name="game"
                value={game}
                onValueChange={() => {
                  setGame;
                  setGameChanged(true);
                }}
                required
              >
                <Select.Trigger
                  className={`inline-flex items-center justify-between rounded py-3 px-2 sm:px-4 text-sm gap-1 bg-zinc-900 ${
                    gameChanged === true ? "text-white" : "text-zinc-500"
                  }`}
                  aria-label="Game"
                  id="game"
                >
                  <Select.Value placeholder="Selecione o game que deseja jogar" />

                  <Select.Icon className="SelectIcon">
                    <CaretDown size={16} />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content className="SelectContent overflow-hidden bg-white rounded-md shadow-lg">
                    <Select.ScrollUpButton className="SelectScrollButton flex items-center justify-center h-6 bg-white text-violet-900 cursor-default">
                      <CaretUp size={16} />
                    </Select.ScrollUpButton>

                    <Select.Viewport className="SelectViewport p-1">
                      {games.map((game) => {
                        return (
                          <Select.SelectItem
                            className="text-sm leading-none text-violet-800 rounded flex items-center h-6 pr-9 pl-6 relative select-none data-[highlighted]:bg-violet-800 data-[highlighted]:text-white"
                            value={game.id}
                            key={game.id}
                          >
                            <Select.ItemText>{game.title}</Select.ItemText>

                            <Select.ItemIndicator className="SelectItemIndicator absolute left-0 w-6 inline-flex items-center justify-center">
                              <Check size={16} />
                            </Select.ItemIndicator>
                          </Select.SelectItem>
                        );
                      })}
                    </Select.Viewport>

                    <Select.ScrollDownButton className="SelectScrollButton flex items-center justify-center h-6 bg-white text-violet-900 cursor-default">
                      <CaretDown size={16} />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <input
                className={styles.input}
                type="text"
                id="name"
                placeholder="Como te chamam dentro do game?"
                {...register("name", { required: true })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <input
                  className={styles.input}
                  type="number"
                  id="yearsPlaying"
                  {...register("yearsPlaying", { required: true })}
                  placeholder="Tudo bem ser ZERO"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu discord?</label>
                <input
                  className={styles.input}
                  type="text"
                  id="discord"
                  {...register("discord", { required: true })}
                  placeholder="Usuario#0000"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Quando costuma jogar</label>

                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-7 sm:grid-cols-4 gap-2"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    title="Domingo"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    D
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    value="1"
                    title="Segunda"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    value="2"
                    title="Terça"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    T
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    value="3"
                    title="Quarta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    value="4"
                    title="Quinta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    value="5"
                    title="Sexta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    value="6"
                    title="Sábado"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    className={styles.input}
                    type="time"
                    id="hourStart"
                    {...register("hourStart", { required: true })}
                    placeholder="De"
                  />
                  <input
                    className={styles.input}
                    type="time"
                    id="hourEnd"
                    {...register("hourEnd", { required: true })}
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  checked === true
                    ? setUseVoiceChannel(true)
                    : setUseVoiceChannel(false);
                }}
                className="w-5 h-5 sm:w-6 sm:h-6 p-[2px] sm:p-1 rounded bg-zinc-900"
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
              >
                Cancelar
              </Dialog.Close>

              <button
                type="submit"
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                aria-label="Close"
              >
                <GameController className="w-6 h-6 hidden sm:flex" />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
