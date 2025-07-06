import React, { Suspense } from "react";
import TrainerPageContent from "./components/TrainerPageContent";

const TrainerPage = () => {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <TrainerPageContent />
        </Suspense>
    );
};

export default TrainerPage;
