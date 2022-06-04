var database = require("../database/config");

function buscarUltimasMedidas(idAvaliacao, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        cidade as cidades, 
        COUNT(fkCidade) as avaliacoes,
                    from avaliacao
                    join cidades
                    on idCidades = ${idAvaliacao}
                    goup by cidade`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        cidade as cidades, 
        COUNT(fkCidade) as avaliacoes,
                    from avaliacao
                    join cidades
                    on idCidades = ${idAvaliacao}
                    goup by cidade
                    order by id desc limit ${limite_linhas}`;
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
        cidade as cidades, 
        COUNT(fkCidade) as avaliacoes,
                    from avaliacao
                    join cidades
                    on idCidades = ${idAvaliacao}
                    goup by cidade
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        cidade as cidades, 
        COUNT(fkCidade) as avaliacoes,
                    from avaliacao
                    join cidades
                    on idCidades = ${idAvaliacao}
                    goup by cidade 
                    order by id desc limit 1`;
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
