//(admin:saborvete) (senha: reinilton)
const mongodb = require('mongodb').MongoClient
const url = "mongodb+srv://saborvete:reinilton@cluster0.znnugwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongodb.connect(url, (erro, banco) => {
    if (erro) throw erro;
    const dbo = banco.db("Saborvete");
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

    // Insere os produtos no banco de dados
    dbo.collection("produtos").insertMany(obj, (erro, res) => {
        if (erro) throw erro;
        console.log("Produtos inseridos com sucesso!");
        banco.close();
    });
});