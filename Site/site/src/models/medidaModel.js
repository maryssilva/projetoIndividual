var database = require("../database/config");

function buscarUltimasMedidas(idAvaliacao, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} cidade AS 'Cidade', COUNT(fkCidade) AS 'Avaliações' FROM avaliacao JOIN cidades ON idCidades = fkCidade GROUP BY cidade`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
                        cidade AS 'Cidade',
                        COUNT(fkCidade) AS 'Avaliações'
                        FROM avaliacao
                        JOIN cidades
                        ON idCidades = fkCidade
                        GROUP BY cidade
                        order by idCidades desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAvaliacao) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
                        cidade AS 'Cidade',
                        COUNT(fkCidade) AS 'Avaliações'
                        FROM avaliacao
                        JOIN cidades
                        ON idCidades = fkCidade
                        GROUP BY cidade
                        order by idCidades desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
                        cidade AS 'Cidade',
                        COUNT(fkCidade) AS 'Avaliações'
                        FROM avaliacao
                        JOIN cidades
                        ON idCidades = fkCidade
                        GROUP BY cidade 
                        order by idCidades desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}