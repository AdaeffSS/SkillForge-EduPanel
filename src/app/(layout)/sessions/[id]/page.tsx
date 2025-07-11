import React, { Suspense, FC } from "react";
import PageContent from "./PageContent";

interface SessionPageProps {
    params: { id: string };
}

const TrainerPage: FC<SessionPageProps> = ({params}) => {
    const {id} = params
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <PageContent id={id} />
        </Suspense>
    );
};

export default TrainerPage;
