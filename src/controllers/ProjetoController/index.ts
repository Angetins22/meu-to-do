import { doc, deleteDoc, getDoc, CollectionReference, Timestamp } from "firebase/firestore";
import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { firebase } from "..";
import type { IProjeto } from "@/components/Projeto";
import type { ITarefa } from "@/components/Tarefa";
import { v4 } from 'uuid';
type SetProp<T, K extends keyof T, V> = {
    [P in keyof T]: P extends K ? V : T[P]
}
type IProjetoFirebase = SetProp<SetProp<IProjeto, 'tarefas', SetProp<ITarefa, 'data', Timestamp>[]>, 'data', Timestamp>

export const getProjetos = async (userId: string): Promise<IProjeto[]> => {

    const projetosRef = collection(firebase, `users/${userId}/projetos`) as CollectionReference<IProjetoFirebase>
    const querySnapshot = await getDocs(projetosRef)
    const projetos: IProjeto[] = []

    querySnapshot.forEach((doc) => {
        const db = doc.data()
        projetos.push({
            id: doc.id,
            nome: db.nome,
            data: db.data.toDate(),
            concluidaP: db.concluidaP,
            cor: db.cor,
            expandido: db.expandido,
            tarefas: db.tarefas.map(tarefa => ({ ...tarefa, data: tarefa.data.toDate() }))
        })
    })
    return projetos
}

type ProjetoCreate = Omit<IProjeto, 'id'>
export const createProjeto = async (userId: string, projeto: ProjetoCreate): Promise<IProjeto | void> => {

    const docRef = await addDoc(collection(firebase, `users/${userId}/projetos`), {
        nome: projeto.nome,
        data: projeto.data,
        concluidaP: projeto.concluidaP ?? false,
        cor: projeto.cor ?? 'white',
        expandido: projeto.expandido,
        tarefas: projeto.tarefas
    });
    console.log("Document written with ID: ", docRef.id);
    console.log('id do usuario: ', userId)
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

export const deleteProjeto = async (userId: string, id: string): Promise<void> => {
    await deleteDoc(doc(firebase, `users/${userId}/projetos`, id))
    console.log('Document deleted with ID: ', id)
}

type ProjetoUpdate = Partial<Omit<IProjeto, 'id'>> & { id: string }
export const updateProjeto = async (userId: string, projeto: ProjetoUpdate): Promise<void> => {
    const docRef = doc(firebase, `users/${userId}/projetos`, projeto.id)
    await updateDoc(docRef, {
        ...projeto
    })
    console.log('Document updated with ID: ', projeto.id)
}

type TarefaCreate = Omit<ITarefa, 'id'>
export const createTarefaP = async (userId: string, projetoId: string, tarefa: TarefaCreate): Promise<ITarefa | void> => {

    const projetoDocRef = doc(firebase, `users/${userId}/projetos`, projetoId);
    const projetoSnap = await getDoc(projetoDocRef);

    if (!projetoSnap.exists()) return

    const projetoData = projetoSnap.data()
    const tarefasAtuais = projetoData.tarefas || []

    const novaTarefa: ITarefa = {
        id: v4(),
        tarefa: tarefa.tarefa,
        data: tarefa.data,
        concluida: tarefa.concluida,
        dentroDoProjeto: true
    }

    await updateDoc(projetoDocRef, {
        tarefas: [...tarefasAtuais, novaTarefa]
    })

    console.log('tarefa adicionada com id: ', novaTarefa.id)

    return novaTarefa
}

export const deleteTarefaP = async (userId: string, projetoId: string, tarefaId: string): Promise<void> => {

    const projetoDocRef = doc(firebase, `users/${userId}/projetos`, projetoId)
    const projetoSnap = await getDoc(projetoDocRef)

    if (!projetoSnap.exists()) return

    const projetoData = projetoSnap.data()
    const tarefasAtuais = projetoData.tarefas || []

    const tarefasAtualizadas = tarefasAtuais.filter((tarefa: ITarefa) => tarefa.id !== tarefaId);

    await updateDoc(projetoDocRef, {
        tarefas: tarefasAtualizadas
    })

    console.log('tarefa removida do projeto : ', projetoId)
}

type TarefaUpdateP = Partial<Omit<ITarefa, 'id'>>
export const updateTarefaP = async (userId: string, projetoId: string, tarefaId: string, tarefa: TarefaUpdateP): Promise<void> => {

    const projetoDocRef = doc(firebase, `users/${userId}/projetos`, projetoId)
    const projetoSnap = await getDoc(projetoDocRef)

    if (!projetoSnap.exists()) return

    const projetoData = projetoSnap.data()
    const tarefasAtuais = projetoData.tarefas || []

    const tarefasAtualizadas = tarefasAtuais.map((t: ITarefa) =>
        t.id === tarefaId ? { ...t, ...tarefa } : t
    );

    await updateDoc(projetoDocRef, {
        tarefas: tarefasAtualizadas
    });

    console.log('tarefa com id: ', tarefaId + 'atualizada do projeto: ' + projetoId)
}