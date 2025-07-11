import React, { Suspense, FC } from "react";
import PageContent from "./PageContent";
import { Metadata } from "next";
import api from "@/assets/lib/api";

interface SessionPageProps {
    params: { id: string };
}

export async function generateMetadata(
    { params }: SessionPageProps
): Promise<Metadata> {
    const { id } = await params

    try {
        const { data } = await api.get(`http://localhost:4000/api/v1/sessions/${id}`);
        return {
            title: data.name || `Сессия ${id}`,
        };
    } catch (e) {
        return {
            title: `Сессия ${id} (название недоступно)`,
        };
    }
}

const TrainerPage: FC<SessionPageProps> = ({ params }) => {
    const { id } = params;
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <PageContent id={id} />
        </Suspense>
    );
};

export default TrainerPage;
