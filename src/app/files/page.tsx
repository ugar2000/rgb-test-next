'use server'

import {fetchFiles} from "@/utils/api";
import {FileGetResponse} from "@/@types/global";
import {redirect} from "next/navigation";
import Files from "@/components/organisms/Files";

const userId = process.env.NEXT_PUBLIC_USER_ID || '';

async function getData(): Promise<FileGetResponse> {
    try {
        console.log('userId', userId)
        return await fetchFiles(userId, 10, 1)
    } catch (e) {
        console.log(e)
        redirect('/')
    }
}

export default async function FilesPage() {
    const data = await getData();

    return(
        <>
            <Files initFiles={data} userId={userId}></Files>
        </>
    )
}