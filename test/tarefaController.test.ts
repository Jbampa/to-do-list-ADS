import { describe, it, afterAll } from '@jest/globals'
import mongoose from 'mongoose'
import * as request from 'supertest'
import app from '../app';
import TarefaModel from '../src/schemas/tarefa.schema'

describe('teste de endpoint para tarefas', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            await collection.deleteMany({});
        }
    })

    it('Criação de uma nova tarefa', async () => {

        const tarefaDados = {
            titulo: "Tarefa Um",
            descricao: "Descrição da Tarefa Um",
            dataCriacao: new Date(),
            tipo: "Categoria da Tarefa"
        };

        const resposta = await request.default(app).post('/api/tarefa/').send(tarefaDados);
        const tarefaEncontrada = await TarefaModel.findById(resposta.body._id)

        expect(resposta.body._id).toBeDefined();
        expect(tarefaDados.titulo).toEqual(tarefaEncontrada?.title);
        expect(tarefaDados.descricao).toEqual(tarefaEncontrada?.descricao);
        expect(tarefaDados.dataCriacao).toEqual(tarefaEncontrada?.data_criacao);
        expect(tarefaDados.tipo).toEqual(tarefaEncontrada?.tipo);

    });

    it('Listar tarefas por usuário', async () => {

        const usuarioDados = {
            nome: 'Juliano',
            peso: 66.0,
            senha: 'senha123',
            email: 'email@teste.com'
        };

        const resposta1 = await request.default(app).post('/api/usuario/').send(usuarioDados);

        const tarefaDados01 = {
            titulo: "Tarefa Um",
            descricao: "Descrição Tarefa Um",
            dataCriacao: new Date(),
            tipo: "Categoria Teste Um",
            usuarioAssociado: resposta1.body._id
        };

        const tarefaDados02 = {
            titulo: "Tarefa Dois",
            descricao: "Descrição Tarefa Dois",
            dataCriacao: new Date().toJSON(),
            tipo: "Categoria Teste Dois",
            usuarioAssociado: resposta1.body._id
        };

        const resposta2 = await request.default(app).post('/api/tarefa/').send(tarefaDados01);
        const resposta3 = await request.default(app).post('/api/tarefa/').send(tarefaDados02);

        const tarefas = await request.default(app).get(`/api/tarefa/usuario/${resposta1.body._id}`);
        expect(tarefas.body[0].titulo).toEqual(tarefaDados01.titulo);
        expect(tarefas.body[1].titulo).toEqual(tarefaDados02.titulo);
        expect(tarefas.body[0].descricao).toEqual(tarefaDados01.descricao);
        expect(tarefas.body[1].descricao).toEqual(tarefaDados02.descricao);
    });

})
