import { Router } from 'express';
import tarefaController from '../controladores/tarefa.controller';

const tarefaRoutes = Router();
tarefaRoutes.post('/', tarefaController.create);
tarefaRoutes.get('/usuario/:usuarioId', tarefaController.findAllByUsuario);
tarefaRoutes.get('/data', tarefaController.findAllByDataRange)
tarefaRoutes.get('/:id', tarefaController.findById);
tarefaRoutes.patch('/:id', tarefaController.updateTarefa);
tarefaRoutes.delete('/:id', tarefaController.deleteTarefa);
tarefaRoutes.get('/contagem/:usuarioId', tarefaController.countByUsuario);
tarefaRoutes.get('/categoria/:categoriaId', tarefaController.findAllByCategoria);
tarefaRoutes.get('/status/concluida', tarefaController.findAllConcluidas);
tarefaRoutes.get('/status/pendente', tarefaController.findAllPendentes);
tarefaRoutes.get('/recente/:usuarioId', tarefaController.recentTarefa);
tarefaRoutes.get('/media', tarefaController.calcularMediaDeTarefasConcluidas);
tarefaRoutes.get('/descricao/maior', tarefaController.getMaiorDescricao);
tarefaRoutes.get('/ultima/:usuarioId', tarefaController.latestTarefa);


export default tarefaRoutes;
