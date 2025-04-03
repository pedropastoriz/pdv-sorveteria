const { MongoClient } = require('mongodb');

const url = "mongodb+srv://saborvete:reinilton@cluster0.znnugwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function atualizarProduto() {
    const cliente = new MongoClient(url);
    
    try {
        await cliente.connect();
        console.log("Ai que sucesso! Conectado ao MongoDB!");

        const dbo = cliente.db("Saborvete");

        // AINDA A SER INCREMENTADO - ATUALIZA PREÇO DE PRODUTO ESPECIFICO. TEM QUE PENSAR EM CONEXAO COM FRONT. 
        const filtro = { nome: "Picolé de Morango" };
        const novaInfo = { $set: { preco: 10 } };

        const resultado = await dbo.collection("sorvetes").updateOne(filtro, novaInfo);
        
        if (resultado.matchedCount > 0) {
            console.log(`Tamo atualizando, Tamo atualizando! (${resultado.modifiedCount} modificado)`);
        } else {
            console.log("Não encontrou nenhum produto com esse ID pra atualizar.");
        }
    
    } catch (erro) {
        console.error("Deu ruim: Erro ao Atualizar", erro);
    
    } finally {
        await cliente.close();
        console.log("Conexão com Mongodb Cloooooosed");
    }
}

atualizarProduto();
