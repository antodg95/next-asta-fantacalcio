"use client"

import { useFormState, useFormStatus } from "react-dom"
import { processCsv } from "../../app/actions";

const initialState = {
    message: "",
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 flex" type="submit" aria-disabled={pending}>
            Upload
        </button>
    );
}

export default function Settings(){
    const [state, formAction] = useFormState(processCsv, initialState);
    return (
        <form encType='multipart/form-data' action={formAction} className="flex-row">
            <input className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-500 file:text-white
          hover:file:bg-blue-600 flex" type="file" name="file" accept=".csv"/>
          <SubmitButton />
          <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
          </p>
        </form>
    )
}

