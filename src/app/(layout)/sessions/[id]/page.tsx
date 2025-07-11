import React, { FC } from "react";
import { Metadata } from "next";
import api from "@/assets/lib/api";
import { notFound } from "next/navigation";
import TrainerPageContent from "./pages/trainer";
import { cookies } from 'next/headers'

interface SessionPageProps {
    params: { id: string };
}

// Мета-данные
export async function generateMetadata(
    { params }: SessionPageProps
): Promise<Metadata> {
    const { id } = await params;

    const cookieStore = await cookies(); // это Map-like объект
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

    try {
        const { data } = await api.get(`/sessions/${id}`, {
            headers: {
                Cookie: cookieHeader,
            },
        });
        return {
            title: data.name || `Сессия ${id}`,
        };
    } catch (e) {
        console.error(e);
        return {
            title: `Сессия ${id}`,
        };
    }
}


const Page: FC<SessionPageProps> = async ({ params }) => {
    const { id } = await params;

    const cookieStore = await cookies(); // это Map-like объект
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

    try {
        const { data: session } = await api.get(`/sessions/${id}`, {
            headers: {
                Cookie: cookieHeader
            }
        });

        console.log(session);

        if (session.type == 'train') return <TrainerPageContent session={session} />

    } catch (e) {
        // console.error(e);
        notFound();
    }
};

export default Page;
