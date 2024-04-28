import TarefaModel from '../schemas/tarefa.schema'
import CategoriaModel from '../schemas/categoria.schema'
import { TarefaInterface } from '../schemas/interfaces/tarefa.interface';

export class TarefaService {

    async create(tarefa: TarefaInterface) {
        const createdTarefa = await TarefaModel.create(tarefa);

        return createdTarefa;
    }

    async findById(id: any) {
        const findedTarefa = await TarefaModel.findById(id);
        return findedTarefa;
    }

    async findAllByUsuario(usuarioId: any) {

        const tarefas = await TarefaModel.find();

        return tarefas.filter(tarefa => tarefa.usuarioAssociado?.toString() === usuarioId);
    }

    async findAllByCategoria(categoria: any) {

        const tarefas = await TarefaModel.find();

        return tarefas.filter(tarefa => tarefa.categoria?.toString() === categoria);

    }

    async findAllByStatus(status: string) {

        const tarefas = await TarefaModel.find();

        return tarefas.filter(tarefa => tarefa.status === status);
    }


    async findAllByDataRange(dataInicial: Date, dataFinal: Date) {

        const tarefas = await TarefaModel.find();
        return tarefas.filter(tarefa => tarefa.data_criacao! <= dataInicial && tarefa.data_conclusao! <= dataFinal);
    }

    async countByUsuario(usuarioId: any) {

        const tarefas = await TarefaModel.find();
        return tarefas.filter(tarefa => tarefa.usuarioAssociado?.toString() === usuarioId).length;
    }

    async recentTarefa(usuarioId: any) {

        const tarefas = await TarefaModel.find();

        tarefas.filter(tarefa => tarefa.usuarioAssociado === usuarioId)
            .sort((a, b) => new Date(b.data_criacao!).getTime() - new Date(a.data_criacao!).getTime());

        const tarefaMaisRecente = tarefas[0];
        return tarefaMaisRecente;
    }

    async calcularMediaDeTarefasConlcuidas() {

        const tarefas = await TarefaModel.find();
        const totalTarefas = tarefas.length;
        const tarefasConcluidas = tarefas.filter(tarefas => tarefas.status === 'concluída').length;

        return (tarefasConcluidas / totalTarefas) * 100;
    }

    async getMaiorDescricao() {

        const tarefas = await TarefaModel.find();
        return tarefas.map(tarefa => tarefa.descricao).sort((a, b) => b!.length - a!.length);
    }

    async latestTarefa(usuarioId: any) {

        const tarefas = await TarefaModel.find();

        return tarefas.filter(tarefa => tarefa.usuarioAssociado?.toString() === usuarioId)
            .sort((a, b) => new Date(a.data_criacao!).getTime() - new Date(b.data_criacao!).getTime());

    }

    async updateTarefa(tarefaId: any, updateTarefa: TarefaInterface) {

        const tarefa = await TarefaModel.updateOne(tarefaId, updateTarefa);

        return tarefa;
    }

    async deleteTarefa(tarefaId: any) {
        const tarefa = await TarefaModel.deleteOne(tarefaId);

        return tarefa;
    }
}