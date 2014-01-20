$(document).ready(function(){
    
    // Recebe um String, converte para JSON e incorpora na arvore DOM
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
            }
        }
    }

    // Mensagem 
    var alertMSG = function(string, type){
        switch (type){
            case 1 :
                $('#alertMSG').html(
                    '<div class="alert alert-success">'+string+'</div>'
                );
                setInterval(function(){
                    $('.alert').fadeOut('slow');    
                },3000);
                break;
            case 2 :
                $('#alertMSG').html(
                    '<div class="alert alert-info">'+string+'</div>'
                );
                setInterval(function(){
                    $('.alert').fadeOut('slow');    
                }, 3000);
                break;
            case 3 :
                $('#alertMSG').html(
                    '<div class="alert alert-warning">'+string+'</div>'
                );
                setInterval(function(){
                    $('.alert').fadeOut('slow');    
                }, 3000);
                break;
            case 4 :
                $('#alertMSG').html(
                    '<div class="alert alert-danger">'+string+'</div>'
                );
                setInterval(function(){
                    $('.alert').fadeOut('slow');    
                }, 3000);
            break;
        }    
    }
    
    // Carrega o conteúdo do localStorage
    snipplr(localStorage.getItem('snipplr'));
    
    $('.show-snipplr').live("click", function(){
        
        var title = $(this).children('h1').text();
        var description = $(this).children('p').text();
        var code = $(this).children('code').text();
        
        var modal = '<div class="modal-dialog">'+
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                            '<h1 class="modal-title">'+title+'</h1>' +
                            '<p>'+description+'</p>' +
                        '</div>' +
                        '<div class="modal-body">' +
                            '<pre class="prettyprint lang-scm">'+code+'</pre>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>' +
                        '</div>' +
                    '</div>' +
                   '</div>';
        
        
        
        $(".modal").html(modal).modal({keyboard: false});
    })
    
    $('#registering-snipplr').click(function(){
        
         var form = '<div class="modal-dialog">'+
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                            '<h1 class="modal-title">Cadastrar Snipplr</h1>' +
                            '<p>asdfas</p>' +
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
        
        $(".modal").html(form).modal({keyboard: false});    
    })
        
    $("form").live("submit", function(e) {
        e.preventDefault();  
        var array = $(this).serializeArray();
        var dados = "";
        var obj = {
            "titulo": array[0].value,
            "descricao": array[1].value,
            "categoria": array[2].value,
            "codigo": array[3].value
        };
        
        if (localStorage.getItem('snipplr')){
            dados = localStorage.getItem('snipplr') + ", " + JSON.stringify(obj);
        } else {
            dados = JSON.stringify(obj);
        }

        localStorage.setItem('snipplr', dados);
        snipplr(localStorage.getItem('snipplr'));
        alertMSG('Snipplr cadastrado com sucesso', 1);
        $(this).closest('form').find("input[type=text], textarea").val("");
    });
})







