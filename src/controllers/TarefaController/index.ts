import { doc, deleteDoc, query, where } from "firebase/firestore";
import { addDoc, collection, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import type { ITarefa } from "@/components/Tarefa";
import { firebase, FirebaseController } from "..";


export const getTarefa = async (id: string): Promise<ITarefa | null> => {

    const querySnapshot = await getDocs(collection(firebase, 'tarefas'), where('id', '==', true))

    if (querySnapshot) {
        const data = doc.data();
        return {
            id: querySnapshot.id,
            tarefa: data.tarefa,
            data: data.data.toDate(),
            concluida: data.concluida,
            dentroDoProjeto: data.dentroDoProjeto
        }
    }
    return null
}

export const getTarefas = async (userId: string): Promise<ITarefa[]> => {
    const querySnapshot = await getDocs(collection(firebase, `users/${userId}/tarefas`))
    const tarefas: ITarefa[] = []

    querySnapshot.forEach((doc) => {
        const db = doc.data()
        tarefas.push({
            id: doc.id,
            tarefa: db.tarefa,
            data: db.data.toDate(),
            concluida: db.concluida,
            dentroDoProjeto: db.dentroDoProjeto
        })
    })
    return tarefas
}

type TarefaUpdate = Partial<Omit<ITarefa, 'id'>> & { id: string }
export const updateTarefa = async (userId: string, tarefa: TarefaUpdate): Promise<void> => {
    try {
        const docRef = doc(firebase, `users/${userId}/tarefas`, tarefa.id);
        await updateDoc(docRef, {
            ...tarefa
        });
        console.log("Document updated with ID: ", tarefa.id);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

type TarefaCreate = Omit<ITarefa, 'id'>
export const createTarefa = async (userId: string, tarefa: TarefaCreate): Promise<ITarefa | void> => {
    try {
        const docRef = await addDoc(collection(firebase, `users/${userId}/tarefas`), {
            tarefa: tarefa.tarefa,
            data: tarefa.data,
            concluida: tarefa.concluida ?? false,
            dentroDoProjeto: tarefa.dentroDoProjeto ?? false
        });
        console.log("Document written with ID: ", docRef.id);
        return {
            id: docRef.id,
            tarefa: tarefa.tarefa,
            data: tarefa.data,
            concluida: tarefa.concluida ?? false,
            dentroDoProjeto: tarefa.dentroDoProjeto ?? false
        }
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export const deleteTarefa = async (userId: string, id: string): Promise<void> => {
    try {
        await deleteDoc(doc(firebase, `users/${userId}/tarefas`, id));
        console.log("Document deleted with ID: ", id);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}

