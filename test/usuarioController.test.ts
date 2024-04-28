import { describe, it, afterAll } from '@jest/globals'
import mongoose from 'mongoose'
import * as request from 'supertest'
import app from '../app';
import UsuarioModel from '../src/schemas/usuario.schema'

describe('verificação de funcionalidades do endpoint de usuários', () => {

    afterAll(async () => {
        await mongoose.connection.close()
    });

    afterEach(async () => {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            await collection.deleteMany({});
        }
    })

    it('Registrar novo usuário no sistema', async () => {
        const dadosUsuario = {
            nome: 'Marcos',
            peso: 70.0,
            senha: 'senha@123',
            email: 'marcos@teste.com'
        };

        const resposta = await request.default(app).post('/api/usuario/').send(dadosUsuario);
        const usuarioEncontrado = await UsuarioModel.findById(resposta.body._id)

        expect(resposta.status).toEqual(201);
        expect(resposta.body._id).toBeDefined();
        expect(dadosUsuario.nome).toEqual(usuarioEncontrado?.nome);
        expect(dadosUsuario.email).toEqual(usuarioEncontrado?.email);
        expect(dadosUsuario.peso).toEqual(usuarioEncontrado?.peso);
        expect(dadosUsuario.senha).toEqual(usuarioEncontrado?.senha);
    })
});