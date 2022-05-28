var database = require("../database/config");

function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT 
            a.idAvaliacao,
            a.fkCidade,
            a.comentario,
            a.fkUsuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM avaliacao a
            INNER JOIN usuario u
                ON a.fkUsuario = u.id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pesquisarDescricao(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucao = `
        SELECT 
            a.idAvaliacao,
            a.fkCidade,
            a.comentario,
            a.fkUsuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
    FROM avaliacao a
        INNER JOIN usuario u
            ON a.fkUsuario = u.id
        WHERE a.comentario LIKE '${texto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucao = `
        SELECT 
            a.idAvaliacao,
            a.fkCidade,
            a.comentario,
            a.fkUsuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM avaliacao a
            INNER JOIN usuario u
                ON a.fkUsuario = u.id
        WHERE u.id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function publicar(selectCidades, comentario, idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", selectCidades, comentario, idUsuario);
    var instrucao = `
        INSERT INTO cidades (cidade) VALUES ('${selectCidades}');
        INSERT INTO avaliacao (fkCidade, comentario, fkUsuario) VALUES ('1', '${comentario}', ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(novoComentario, idAvaliacao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novoComentario, idAvaliacao);
    var instrucao = `
        UPDATE avaliacao SET comentario = '${novoComentario}' WHERE idAvaliacao = ${idAvaliacao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idAvaliacao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAvaliacao);
    var instrucao = `
        DELETE FROM avaliacao WHERE idAvaliacao = ${idAvaliacao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar
}
