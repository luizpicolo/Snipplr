// Função para receber um String, converte para JSON e incorpora na arvore DOM
var snipplr = function(string){
    if (string){
        var objs = JSON.parse("[" + string + "]");
        if (objs.length){
            var html = "";
            for (var i = 0; i < objs.length; i+=1){
                html += '<div class="col-md-3 code-'+objs[i].categoria+'">' +
                            '<section class="show-snipplr">' +
                                '<h1>'+objs[i].titulo+'</h1>' +
                                '<p>'+objs[i].descricao+'</p>' +
                                '<code>'+objs[i].codigo+'</code>' +
                            '</section>' +
                        '</div>';    
            }
            $('.row').html(html);
        } else {
            $('.row').html("Não há Snnipts cadastrados.");
        }
    } else {
        $('.row').html("Não há Snnipts cadastrados.");
    }
}

// Apresta mensagem para o usuario 
var alertMSG = function(string, type){
    
    // Tempo de fechamento da mensagem
    var timeClose = 4000;
    
    switch (type){
        case 1 :
            $('.alertMSG').html(
                '<div class="alert alert-success">'+string+'</div>'
            );
            setInterval(function(){
                $('.alert').fadeOut('slow');    
            },timeClose);
            break;
        case 2 :
            $('.alertMSG').html(
                '<div class="alert alert-info">'+string+'</div>'
            );
            setInterval(function(){
                $('.alert').fadeOut('slow');    
            }, timeClose);
            break;
        case 3 :
            $('.alertMSG').html(
                '<div class="alert alert-warning">'+string+'</div>'
            );
            setInterval(function(){
                $('.alert').fadeOut('slow');    
            }, timeClose);
            break;
        case 4 :
            $('.alertMSG').html(
                '<div class="alert alert-danger">'+string+'</div>'
            );
            setInterval(function(){
                $('.alert').fadeOut('slow');    
            }, timeClose);
        break;
    }    
}

$(document).ready(function(){
    
    // Adiciona elementos não pertecentes a semântica do código
    $("<div />").appendTo("body").addClass("modal");
    $("<div />").appendTo("body").addClass("alertMSG");
    
    // Carrega o conteúdo do localStorage
    snipplr(localStorage.getItem('snipplr'));
    
    // Retorna o conteudo dos Snipplrs cadastros do localStorage
    $('.show-snipplr').live("click", function(){
        
        // Coleta os dados das tags h1, p e CODE
        var title = $(this).children('h1').text();
        var description = $(this).children('p').text();
        var code = $(this).children('code').text();
                
        var view = '<div class="modal-dialog">'+
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                            '<h1 class="modal-title">'+title+'</h1>' +
                            '<p>'+description+'</p>' +
                        '</div>' +
                        '<div class="modal-body">' +
                            '<pre>'+code+'</pre>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>' +
                        '</div>' +
                    '</div>' +
                   '</div>';

        // Incorpora o html das visualizações do codigo no modal
        $(".modal").html(view).modal({keyboard: false});
    })
    
    // Carrega o formulário para novos cadastros
    $('#registering-snipplr').click(function(){
            
         var form = '<div class="modal-dialog">'+
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                            '<h1 class="modal-title">Cadastrar Snipplr</h1>' +
                        '</div>' +
                        '<div class="modal-body">' +
                            '<form method="post" id="code-snipplr" action="">' +
                              '<div class="form-group">' +
                                '<label for="titulo">Titulo</label>' +
                                '<input type="text" class="form-control" name="titulo" id="titulo" placeholder="Titulo" required>' +
                              '</div>' +
                              '<div class="form-group">' +
                                '<label for="descricao">Descrição</label>' +
                                '<input type="text" class="form-control" id="descricao" name="descricao" placeholder="Descrição">' +
                              '</div>' +
                              '<div class="form-group">' +
                                '<label for="categoria">Categoria</label>' +
                                '<select id="categoria" name="categoria" class="form-control">' +
                                  '<option value="1">PHP</option>' +
                                  '<option value="2">Java</option>' +
                                  '<option value="3">Ruby</option>' +
                                  '<option value="4">JavaScript</option>' +
                                '</select>' +
                              '</div>' +
                              '<div class="form-group">' +
                                '<label for="codigo">Código</label>' +
                                '<textarea class="form-control"  id="codigo" name="codigo" rows="3"></textarea>' +
                              '</div>' +
                              '<input type="submit" class="btn btn-primary" value="Cadastrar">' +
                            '</form>' +
                        '</div>' +
                    '</div>' +
                   '</div>';
        
        // Incorpora o form no modal
        $(".modal").html(form).modal({keyboard: false});    
    })
    
    $('#clear-snipplr').click(function(){
        
        // Verifica se há dados no localStorage a serem deletados
        // Se verdadeiro limpa, caso não, mostra um mensagem informativa
        if (localStorage.getItem('snipplr')){
            if (confirm("Deletar todos os Snipplrs?")){
                localStorage.clear();
                alertMSG('Snipplrs excluidos com sucesso', 1);
            }
        } else {
            alertMSG('Não há Snipplrs para serem deletados', 2);    
        }
        
        // Carrega os dados e monta a apresentação dos Snnipers
        snipplr(localStorage.getItem('snipplr'));
    })
      
    // Executa ao submiter o formulario
    $("form").live("submit", function(e) {
        e.preventDefault();  
        
        // Retorna os dadoso do formulário e cria o objeto JSOn
        var array = $(this).serializeArray();
        var dados = "";
        var obj = {
            "titulo": array[0].value,
            "descricao": array[1].value,
            "categoria": array[2].value,
            "codigo": array[3].value
        };
        
        // Verifica se o elemento inserido é o primeiro
        if (localStorage.getItem('snipplr')){
            dados = localStorage.getItem('snipplr') + ", " + JSON.stringify(obj);
        } else {
            dados = JSON.stringify(obj);
        }
        
        // Salva os dados no localStorage
        localStorage.setItem('snipplr', dados);
        
        // Retorna os dados salvos e atualiza as elementos
        snipplr(localStorage.getItem('snipplr'));
        
        // Mostra a mensagem de sucesso
        alertMSG('Snipplr cadastrado com sucesso', 1);
        
        // Remove a modal e acrescenta novamente o elemento div modal
        $('.in').fadeOut('5000');
        $("<div />").appendTo("body").addClass("modal");
    });
})