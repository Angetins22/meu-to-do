import { doc, deleteDoc, query, where } from "firebase/firestore";
import { addDoc, collection, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebase, FirebaseController } from "..";
import type { IProjeto } from "@/components/Projeto";


export const getProjetos = async (): Promise<IProjeto[]> => {

    const querySnapshot = await getDocs(collection(firebase, 'projetos'))
    const projetos: IProjeto[] = []

    querySnapshot.forEach((doc) => {
        const db = doc.data()
        projetos.push({
            id: doc.id,
            nome: db.nome,
            data: db.data?.toDate() ? db.data.toDate() : new Date(),
            concluidaP: db.concluida,
            cor: db.cor,
            expandido: db.expandido,
            tarefas: db.tarefas
        })
    })
    return projetos
}

type ProjetoCreate = Omit<IProjeto, 'id'>
export const createProjeto = async (projeto: ProjetoCreate): Promise<IProjeto | void> => {

    const docRef = await addDoc(collection(firebase, "projetos"), {
        nome: projeto.nome,
        data: projeto.data,
        concluida: projeto.concluidaP ?? false,
        cor: projeto.cor ?? 'white',
        expandido: projeto.expandido,
        tarefas: projeto.tarefas
    });
    console.log("Document written with ID: ", docRef.id);
    return {
        id: docRef.id,
        nome: projeto.nome,
        data: projeto.data,
        concluidaP: projeto.concluidaP ?? false,
        cor: projeto.cor ?? 'white',
        expandido: projeto.expandido,
        tarefas: projeto.tarefas
    }

}

export const deleteProjeto = async (id: string): Promise<void> => {
    await deleteDoc(doc(firebase, 'projetos', id))
    console.log('Document deleted with ID: ', id)
}