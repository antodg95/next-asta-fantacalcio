"use client"

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { removePlayerFromTeam } from "~/app/actions";
import { PlayerFullInfo, TeamFullInfo } from "~/utils/types";

export default function TeamPageData({ players, team }: { players: PlayerFullInfo[], team: TeamFullInfo[] }) {


    const initialFormState = {
        formStatus: 0,
        message: "",
    }



    const [playerIdFantacalcio, setPlayerIdFantacalcio] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const [teamName, setTeamName] = useState(team.at(0)?.teamName ?? '');
    const [formState, removePlayerFromTeamForm] = useFormState(removePlayerFromTeam, initialFormState);

    const modalRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    function openModal(playerId: number, playerName: string) {
        setPlayerIdFantacalcio(playerId);
        setPlayerName(playerName);
        modalRef.current?.showModal();
    }

    function closeModal() {
        formState.formStatus = 0
        formState.message = "";
        setPlayerIdFantacalcio(0);
        setPlayerName('');
        formRef.current?.reset();
        modalRef.current?.close();
    }

    useEffect(() => {
        if (formState?.formStatus === 1) {

        } 
        else if (formState?.formStatus === 2) {
          modalRef.current?.close();
          window.location.reload()
        }
        else {
          formState.formStatus = 0;
          formState.message = "";
          modalRef.current?.close();
        }
      }, [formState])

    return (
        <div className="grid">
            <div className="flex flex-col items-center space-y-2.5 p-6 sticky top-0 bg-gray-100 z-10">
                <h3 className="whitespace-nowrap text-2xl font-bold text-center">{team.at(0)?.teamName}</h3>
                <div className="bg-[#4B5563] w-fit rounded-full px-3 py-1 text-white text-sm font-medium">
                    {team.at(0)?.creditsLeft} Crediti
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-[#4B5563]">{team.at(0)?.D}</div>
                        <div className="text-sm text-[#6B7280]">Difensori</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-[#4B5563]">{team.at(0)?.C}</div>
                        <div className="text-sm text-[#6B7280]">Centrocampisti</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-[#4B5563]">{team.at(0)?.A}</div>
                        <div className="text-sm text-[#6B7280]">Attaccanti</div>
                    </div>
                </div>
            </div>

            <div className="">
                <div className="pb-20 px-6 z-0">
                    <div className="w-full">
                        <table className="w-full caption-bottom table-auto" id="players-table">
                            <thead className="border-b">
                                <tr className="border-b">
                                    <th className="h-12 pl-4 text-left align-middle font-medium text-muted-foreground">
                                        Ruolo
                                    </th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                        Nome
                                    </th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                        Prezzo
                                    </th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {players.map((player) => {
                                    switch (player.role) {
                                        case "P":
                                            return (
                                                <tr className="border-b" id={player.idFantacalcio?.toString()} key={player.idFantacalcio}>
                                                    <td className="align-middle">
                                                        <div className="flex items-center pl-4">
                                                            <div className="rounded-full bg-warning px-2 py-1 text-primary-foreground">
                                                                P
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <p className="font-bold">{player.name}</p>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <p className="font-medium">{player.price}</p>
                                                    </td>
                                                    <td className="align-middle pr-4">
                                                        <button className="btn btn-error btn-sm" onClick={() => openModal(player.idFantacalcio, player.name)}>-</button>
                                                    </td>
                                                </tr>
                                            );
                                        case "D":
                                            return (
                                                <tr className="border-b" id={player.idFantacalcio?.toString()} key={player.idFantacalcio}>
                                                    <td className="align-middle">
                                                        <div className="flex items-center pl-4">
                                                            <div className="rounded-full bg-success px-2 py-1 text-primary-foreground">
                                                                D
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <p className="font-bold">{player.name}</p>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <p className="font-medium">{player.price}</p>
                                                    </td>
                                                    <td className="align-middle">
                                                        <button className="l-4 btn btn-error btn-sm" onClick={() => openModal(player.idFantacalcio, player.name)}>-</button>
                                                    </td>
                                                </tr>
                                            );
                                        case "C":
                                            return (
                                                <tr className="border-b" id={player.idFantacalcio?.toString()} key={player.idFantacalcio}>
                                                    <td className="align-middle">
                                                        <div className="flex items-center pl-4">
                                                            <div className="rounded-full bg-info px-2 py-1 text-primary-foreground">
                                                                C
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <p className="font-bold">{player.name}</p>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <p className="font-medium">{player.price}</p>
                                                    </td>
                                                    <td className="align-middle pr-4">
                                                        <button className="btn btn-error btn-sm" onClick={() => openModal(player.idFantacalcio, player.name)}>-</button>
                                                    </td>
                                                </tr>
                                            );
                                        case "A":
                                            return (
                                                <tr className="border-b" id={player.idFantacalcio?.toString()} key={player.idFantacalcio}>
                                                    <td className="align-middle">
                                                        <div className="flex items-center pl-4">
                                                            <div className="rounded-full bg-error px-2 py-1 text-primary-foreground">
                                                                A
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <p className="font-bold">{player.name}</p>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <p className="font-medium">{player.price}</p>
                                                    </td>
                                                    <td className="align-middle pr-4">
                                                        <button className="btn btn-error btn-sm" onClick={() => openModal(player.idFantacalcio, player.name)}>-</button>
                                                    </td>
                                                </tr>
                                            );
                                        default:
                                            return (
                                                <div className="rounded-full bg-gray-900 px-2 py-1 text-primary-foreground">
                                                    Z
                                                </div>
                                            );
                                    }
                                })}
                            </tbody>
                        </table>
                        <dialog id="removePlayerFromTeamForm" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                            <div className="modal-box" id="inner-modal-remove">
                                <form className="flex flex-col justify-center" action={removePlayerFromTeamForm} id="removePlayerFromTeamForm" ref={formRef}>
                                    <span className="text-center text-lg font-small italic">Rimuovere</span>
                                    <h1 className="text-center text-2xl font-bold mb-4"> {playerName}</h1>
                                    <span className="text-center text-lg font-small italic">da</span>
                                    <h1 className="text-center text-2xl font-bold mb-4">{teamName}</h1>
                                    <input type="hidden" name="idFantacalcioPlayer" value={playerIdFantacalcio}></input>
                                    <input className="btn btn-primary mt-4" type="submit" value="Rimuovi"></input>
                                </form>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn btn-error" onClick={closeModal}>Annulla</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>

                    </div>
                </div>
            </div>
        </div>
    )

}
