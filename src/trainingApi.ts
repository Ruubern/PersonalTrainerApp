import type { TrainingForm } from "./types";

export function getTrainings() {

    return fetch(import.meta.env.VITE_API_URL + '/trainings')
    .then(response => {
        if (!response.ok)
            throw new Error("Error when fetching customers: " + response.statusText)

        return response.json();
    })
}

export function deleteTraining(trainingUrl: string) {

    return fetch(trainingUrl, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error when deleting training: " + response.statusText)
        response.json();
    })
}

export function saveTraining(newTraining: TrainingForm) {

    return fetch(import.meta.env.VITE_API_URL + '/trainings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTraining)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error when adding training: " + response.statusText)
        return response.json();
    })
}