"use client"

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { addPlayerToTeam } from "~/app/actions";
import { CsvPlayer, Team } from "~/utils/types";

export default function HomePageData ({players, teams}: {players:CsvPlayer[], teams:Team[]}) {

  const [filteredPlayers, setFilteredPlayers] = useState(players)
  const [searchItem, setSearchItem] = useState('')
  const [showP, setShowP] = useState(false);
  const [showD, setShowD] = useState(true);
  const [showC, setShowC] = useState(true);
  const [showA, setShowA] = useState(true);
  const [playerIdFantacalcio, setPlayerIdFantacalcio] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const initialFormState = {
    formStatus: 0,
    message: "",
  }
  const [formState, addPlayerToTeamForm] = useFormState(addPlayerToTeam, initialFormState);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  function handleShowP(){
    setShowP(!showP)
  }
  function handleShowD(){
    setShowD(!showD)
  }
  function handleShowC(){
    setShowC(!showC)
  }
  function handleShowA(){
    setShowA(!showA)
  }

  function goTop() {
    window.scrollTo( { top: 0, behavior: "smooth"});
  }

  const handleInputChange = (e: any) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    // filter the items using the apiUsers state
    const filteredItems = players.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPlayers(filteredItems);
  }

  function clearInputSearch() {
    setSearchItem('');
    setFilteredPlayers(players);
  }

  function openModal(playerId: number, playerName: string){
    setPlayerIdFantacalcio(playerId);
    setPlayerName(playerName);
    window.my_modal_1.showModal();
  }

  function closeModal() {
    formState.formStatus = 0
    formState.message = ""
    setPlayerIdFantacalcio(0);
    setPlayerName('');
    window.addPlayerToTeamForm.reset();
    window.my_modal_1.close();
  }

  useEffect(() => {
    if (formState.formStatus === 1) {

    } 
    else if (formState.formStatus === 2) {
      setShowSuccessAlert(true)
      setPlayerIdFantacalcio(0);
      setPlayerName('');
      window.addPlayerToTeamForm.reset();
      window.my_modal_1.close();
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
      
    }
    else {
      formState.formStatus = 0
      formState.message = ""
      window.my_modal_1.close();
    }
  }, [formState])

  return (
    <div>
      <div className="grid">
        <div className="w-full">

          { showSuccessAlert && <div id="success-toast" className="toast toast-center z-20 mb-20">
            <div className="alert bg-[#4ade80]">
              <span>Giocatore aggiunto</span>
            </div>
          </div>
          }
          
          <div className="flex flex-col space-y-1.5 p-6 sticky top-0 bg-gray-100 z-10">
            <h3 className="whitespace-nowrap text-2xl font-bold text-center">Lista svincolati</h3>
            <div className="flex flex-row">
              <label className="grow input input-bordered flex items-center gap-2">
                <input id="input-players" type="text" className="grow" placeholder="Cerca giocatori ..." onChange={handleInputChange} value={searchItem} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <button className="flex-none btn btn-neutral ml-4" onClick={clearInputSearch}>X</button>
            </div>
            <div className="flex pt-2">
              <div className="flex-1 text-center">
                <input
                  id="toggle-p"
                  type="checkbox"
                  className="toggle toggle-warning"
                  checked={showP}
                  onChange={handleShowP}
                />
              </div>
              <div className="flex-1 text-center">
                <input
                  id="toggle-d"
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={showD}
                  onChange={handleShowD}
                />
              </div>
              <div className="flex-1 text-center">
                <input
                  id="toggle-c"
                  type="checkbox"
                  className="toggle toggle-info"
                  checked={showC}
                  onChange={handleShowC}
                />
              </div>
              <div className="flex-1 text-center">
                <input
                  id="toggle-a"
                  type="checkbox"
                  className="toggle toggle-error"
                  checked={showA}
                  onChange={handleShowA}
                />
              </div>
            </div>
          </div>
          <div className="pb-20 z-0">
            <div className="w-full">
              <table className="w-full caption-bottom table-auto" id="players-table">
                <thead className="border-b px-6">
                  <tr className="border-b" key="headersTableKey">
                    <th className="h-12 pl-4 text-left align-middle font-medium text-muted-foreground">
                      Ruolo
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Nome
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Squadra
                    </th>
                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.map((player) => {
                    switch (player.role) {
                      case "P":
                        return (
                          showP === true ? 
                          <tr className="border-b" id={player.idFantacalcio.toString()} key={player.idFantacalcio}>
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
                              <p className="font-medium">{player.team}</p>
                            </td>
                            <td className="align-middle pr-4">
                              <button className="btn btn-primary btn-sm" onClick={() => openModal(player.idFantacalcio, player.name)}>+</button>
                            </td>
                          </tr> : null
                        );
                      case "D":
                        return (
                          showD === true ?
                          <tr className="border-b" id={player.idFantacalcio.toString()} key={player.idFantacalcio}>
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
                              <p className="font-medium">{player.team}</p>
                            </td>
                            <td className="align-middle pr-4">
                              <button className="btn btn-primary btn-sm" onClick={() => openModal(player.idFantacalcio, player.name)}>+</button>
                            </td>
                          </tr> : null
                        );
                      case "C":
                        return (
                          showC === true ? 
                          <tr className="border-b" id={player.idFantacalcio.toString()} key={player.idFantacalcio}>
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
                              <p className="font-medium">{player.team}</p>
                            </td>
                            <td className="align-middle pr-4">
                              <button className="btn btn-primary btn-sm" onClick={() => openModal(player.idFantacalcio, player.name)}>+</button>
                            </td>
                          </tr> : null
                        );
                      case "A":
                        return (
                          showA === true ? 
                          <tr className="border-b" id={player.idFantacalcio.toString()} key={player.idFantacalcio}>
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
                              <p className="font-medium">{player.team}</p>
                            </td>
                            <td className="align-middle pr-4">
                              <button className="btn btn-primary btn-sm" onClick={() => openModal(player.idFantacalcio, player.name)}>+</button>
                            </td>
                          </tr> : null
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
              <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box" id="inner-modal">
                  <form className="flex flex-col justify-center" action={addPlayerToTeamForm} id="addPlayerToTeamForm">
                    <h1 className="text-center text-2xl font-bold mb-4">{playerName}</h1>
                    <input type="hidden" name="idFantacalcioPlayer" value={playerIdFantacalcio}></input>
                    <div>
                      <label htmlFor="idTeam"></label>
                      <select defaultValue="" required className="mb-4 text-center w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                      name="idTeam" id="idTeam" form="addPlayerToTeamForm">
                        <option value="" disabled hidden>Seleziona una squadra</option>
                        {teams.map(team => {
                          return (
                            <option value={team.id} key={team.id}>{team.name}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="price"></label>
                      <input placeholder="Aggiungi un prezzo" className="text-center w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary" type="number" defaultValue={1} min="0" id="price" name="price"></input>
                    </div>
                    <input className="btn btn-primary mt-4" type="submit" value="Salva"></input>
                  </form>
                  {formState.formStatus === 1 && <div role="alert" className="alert bg-red-300 mt-4">
                                                 <span className="">{formState.message}</span>
                                                 </div>}
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
      <div className="fixed bottom-20 right-4">
        <button
          id="topBtn"
          className="bg-red-400 hover:bg-red-600 py-2 px-4 rounded-full shadow-lg"
          onClick={goTop}
        >
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M12 4V20M12 4L8 8M12 4L16 8"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}