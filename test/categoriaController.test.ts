import { describe, it, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import * as requisicaoTeste from 'supertest';
import aplicativo from '../app';
import EsquemaCategoria from '../src/schemas/categoria.schema';

describe('Verificação de funcionalidades de categorias', () => {

    afterAll(async () => {
        await mongoose.connection.close();
    });
    afterEach(async () => {
        const colecoes = Object.keys(mongoose.connection.collections);
        for (let colecaoNome of colecoes) {
            const colecao = mongoose.connection.collections[colecaoNome];
            await colecao.deleteMany({});
        }
    });
    
    it('Insere nova categoria no sistema', async () => {
        const dadosCategoria = {
            nome: 'Educação Superior',
            cor: 'Ciano'
        };

        const resultado = await requisicaoTeste.default(aplicativo).post('/api/categorias/').send(dadosCategoria);
        const categoriaBuscada = await EsquemaCategoria.findById(resultado.body._id);

        expect(resultado.status).toBe(201);
        expect(resultado.body._id).toBeDefined();
        expect(dadosCategoria.nome).toBe(categoriaBuscada?.nome);
        expect(dadosCategoria.cor).toBe(categoriaBuscada?.cor);
    });

    it('Lista categorias vinculadas ao perfil de usuário', async () => {
        const perfilUsuario = {
            nome: 'Carlos',
            email: 'carlos@exemplo.com',
            senha: 'senha#321',
            peso: 75.00,
        }
        const respostaPerfil = await requisicaoTeste.default(aplicativo).post('/api/usuarios/').send(perfilUsuario);

        const categoriaPerfil = {
            nome: 'Emprego',
            cor: 'Ouro',
            usuarioAssociado: respostaPerfil.body._id
        };
        const categoriaExtra = {
            nome: 'Hobbies',
            cor: 'Verde Musgo'
        };
        await requisicaoTeste.default(aplicativo).post('/api/categorias/').send(categoriaExtra);
        await requisicaoTeste.default(aplicativo).post('/api/categorias/').send(categoriaPerfil);
        const respostaCategorias = await requisicaoTeste.default(aplicativo).get(`/api/categorias/usuario/${respostaPerfil.body._id}`);

        expect(respostaCategorias.status).toBe(200);
        expect(respostaCategorias.body).toHaveLength(1);
        expect(respostaCategorias.body[0].nome).toBe('Emprego');
        expect(respostaCategorias.body[0].cor).toBe('Ouro');
    });

    it('Obtém detalhes de uma categoria específica', async () => {
        const dadosUsuario = {
            nome: 'Lucas',
            email: 'lucas@exemplo.com',
            senha: 'abc123',
            peso: 82.00,
        };
        const respostaUsuario = await requisicaoTeste.default(aplicativo).post('/api/usuarios/').send(dadosUsuario);

        const categoriaEspecifica = {
            nome: 'Profissional',
            cor: 'Marrom',
            usuarioAssociado: respostaUsuario.body._id
        };
        const categoriaInformal = {
            nome: 'Relaxamento',
            cor: 'Azul Petróleo'
        };
        const respostaCategoria = await requisicaoTeste.default(aplicativo).post('/api/categorias/').send(categoriaInformal);
        await requisicaoTeste.default(aplicativo).post('/api/categorias/').send(categoriaEspecifica);
        const detalhesCategoria = await requisicaoTeste.default(aplicativo).get(`/api/categorias/${respostaCategoria.body._id}`);

        expect(detalhesCategoria.status).toBe(200);
        expect(detalhesCategoria.body.nome).toBe('Relaxamento');
        expect(detalhesCategoria.body.cor).toBe('Azul Petróleo');
    });

    it('Atualiza dados de uma categoria previamente criada', async () => {
        const categoriaInicial = {
            nome: 'Descanso',
            cor: 'Lilás'
        };
        const postInicial = await requisicaoTeste.default(aplicativo).post('/api/categorias/').send(categoriaInicial);

        const dadosAtualizados = {
            nome: 'Atividade Física',
            cor: 'Carmesim'
        };

        const respostaAtualizacao = await requisicaoTeste.default(aplicativo).patch(`/api/categorias/${postInicial.body._id}`).send(dadosAtualizados);
        expect(respostaAtualizacao.status).toBe(200);
    });

});
