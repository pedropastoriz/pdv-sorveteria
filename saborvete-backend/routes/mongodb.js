//(admin:saborvete) (senha: reinilton)
const { MongoClient } = require('mongodb'); 

const url = "mongodb+srv://saborvete:reinilton@cluster0.znnugwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function conectarBanco() {
    const cliente = new MongoClient(url);
    
    try {
        await cliente.connect();
        console.log("Ai que sucesso! Conectou ao Mongodb!!");

        const dbo = cliente.db("Saborvete");
        const obj = [
            { nome: "Picolé de Morango", preco: 8, quantidade: 20 },
            { nome: "Pote de Morango", preco: 20, quantidade: 20 },
            { nome: "Picolé de Chocolate", preco: 8, quantidade: 20 },
            { nome: "Pote de Chocolate", preco: 20, quantidade: 20 },
            { nome: "Picolé de Uva", preco: 8, quantidade: 20 },
            { nome: "Pote de Uva", preco: 20, quantidade: 20 },
            { nome: "Picolé de Coco", preco: 8, quantidade: 20 },
            { nome: "Pote de Coco", preco: 20, quantidade: 20 },
            { nome: "Picolé de Milho", preco: 8, quantidade: 20 },
            { nome: "Pote de Milho", preco: 20, quantidade: 20 }
        ];

        const resultado = await dbo.collection("sorvetes").insertMany(obj);
        console.log(`🎉 ${resultado.insertedCount} Tamo Inserindo Tamo Inserindo! Sorvetes iNSERIDOS`);
    
    } catch (erro) {
        console.error("Deu ruim ao conectar ou inserir os dados:", erro);
    
    } finally {
        await cliente.close();
        console.log("Conexão com MongoDB CLOOOOSED.");
    }
}
conectarBanco();
