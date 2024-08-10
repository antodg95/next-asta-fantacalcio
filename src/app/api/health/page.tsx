import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(req: NextApiRequest,res: NextApiResponse,) {
    return (
        <div>
            OK
        </div>
    )
}