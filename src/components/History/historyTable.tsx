"use client"

import { redirect, useRouter } from "next/navigation";
import { PlayerHistory } from "~/utils/types";

export default function HistoryTable({playerHistoryList}: {playerHistoryList:PlayerHistory[]}) {

    const router = useRouter()

    return (
        <table className="w-full caption-bottom table-fixed">
                        <thead className="border-b px-6">
                            <tr className="border-b">
                                <th className="w-12 h-12 pl-4 text-left align-middle font-medium text-muted-foreground">
                                    Ruolo
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Nome
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Squadra
                                </th>
                                <th className="w-16 h-12 text-left align-middle font-medium text-muted-foreground">
                                    Prezzo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerHistoryList.map((playerHistory) => {
                                let roleClass = "";
                                switch (playerHistory.role) {
                                    case "P":
                                        roleClass = "bg-warning";
                                        break;
                                    case "D":
                                        roleClass = "bg-success";
                                        break;
                                    case "C":
                                        roleClass = "bg-info";
                                        break;
                                    case "A":
                                        roleClass = "bg-error";
                                        break;
                                    default:
                                        break;
                                }

                                return (
                                    
                                    <tr
                                        className="border-b"
                                        onClick={() => router.push('/')}
                                        style={{ cursor: "pointer" }}
                                        key={playerHistory.idFantacalcio}
                                    >
                                        <td className="align-middle">
                                            <div className="flex items-center pl-4">
                                                <div className={`rounded-full ${roleClass} px-2 py-1 text-primary-foreground`}>{playerHistory.role}</div>
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <p className="font-bold text-wrap truncate">{playerHistory.name}</p>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <p className="font-medium truncate">{playerHistory.teamName}</p>
                                        </td>
                                        <td className="p-4 align-middle ">
                                            <p className="font-medium">{playerHistory.price}</p>
                                        </td>
                                    </tr>
                                    
                                );
                            })}
                        </tbody>
                    </table>
    )
}