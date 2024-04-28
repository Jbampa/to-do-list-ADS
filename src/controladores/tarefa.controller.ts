import { Request, Response } from 'express'
import { TarefaService } from '../service/tarefa.service'

export class TarefaController {

    async create(req: Request, res: Response) {

        const tarefa = await new TarefaService().create(req.body);
        return res.json(tarefa);
    }

    async findById(req: Request, res: Response) {

        const tarefa = await new TarefaService().findById(req.params.id);
        return res.json(tarefa);
    }

    async findAllByUsuario(req: Request, res: Response) {

        const tarefas = await new TarefaService().findAllByUsuario(req.params.usuarioId);
        return res.json(tarefas);
    }


    async findAllByCategoria(req: Request, res: Response) {

        const tarefas = await new TarefaService().findAllByCategoria(req.params.categoriaId);
        return res.json(tarefas);

    }

    async findAllConcluidas(req: Request, res: Response) {

        const tarefas = await new TarefaService().findAllByStatus('concluída');
        return res.json(tarefas);
    }

    async findAllPendentes(req: Request, res: Response) {

        const tarefas = await new TarefaService().findAllByStatus('pendente');
        return res.json(tarefas);
    }

    async findAllByDataRange(req: Request, res: Response) {

        const dataFinal = req.query.dataFinal as string;

        const dataInicial = req.query.dataInicial as string;

        const tarefas = await new TarefaService().findAllByDataRange(new Date(dataInicial), new Date(dataFinal));

        return res.json(tarefas);
    }

    async countByUsuario(req: Request, res: Response) {
        const count = await new TarefaService().countByUsuario(req.params.usuarioId);
        return res.json({ count });
    }

    async recentTarefa(req: Request, res: Response){
      const tarefas = await new TarefaService().countByUsuario(req.params.usuarioId);      
      return res.json(tarefas);  
    }

    async calcularMediaDeTarefasConcluidas(res:Response){
        
        const tarefas = await new TarefaService().calcularMediaDeTarefasConlcuidas();
        return res.json(tarefas);

    }

    async getMaiorDescricao(res:Response){
        
        const tarefas = await new TarefaService().getMaiorDescricao();
        return res.json(tarefas);
    }


    async latestTarefa(req:Request,res:Response){
        
        const tarefas = await new TarefaService().latestTarefa(req.params.usuarioId); 
        return res.json(tarefas);
    }

    async updateTarefa(req: Request, res: Response) {

        const tarefa = await new TarefaService().updateTarefa(req.params.id, req.body);
        return res.json(tarefa);
    }


    async deleteTarefa(req: Request, res: Response) {

        const tarefa = await new TarefaService().deleteTarefa(req.params.id);
        return res.json(tarefa);
    }

}

export default new TarefaController()