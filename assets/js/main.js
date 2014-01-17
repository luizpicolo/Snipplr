$(document).ready(function(){
    
    $('.show-snipplr').click(function(){
        
        var title = $(this).children('h1').text();
        var description = $(this).children('p').text();
        var code = '&lt;table class="tabela"&gt;' +
                   '...' + 
                   '&lt;/table&gt;';
        
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
        
        
        
        $(".modal").html(modal).modal({
          keyboard: false
        });
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
                                  '<option>1</option>' +
                                  '<option>2</option>' +
                                  '<option>3</option>' +
                                  '<option>4</option>' +
                                  '<option>5</option>' +
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
        
        $(".modal").html(form).modal({
          keyboard: false
        });    
    })
        
    $("form").live("submit", function(e) {
        e.preventDefault();
        var array = $(this).serializeArray();
        var obj = {
            "titulo": array[0].value,
            "descricao": array[1].value,
            "categoria": array[2].value,
            "codigo": array[4].value
        };
        
        dados.push(localStorage.getItem('snipplr'));
        dados.push(obj);
        localStorage.setItem('snipplr', dados);
    });
    
//    var objs = localStorage.getItem('snipplr');
//    
//    console.log(objs);
//    
//    for (var i = 0; i < objs.length; i+=1){
//        html += '<div class="col-md-3 code-'+objs[i].nome+'">' +
//                    '<section class="show-snipplr">' +
//                        '<h1><i class="fa fa-code"></i> Código Java</h1>' +
//                        '<p>Descrição</p>' +
//                    '</section>' +
//                '</div>';    
//    }
//    
//    $('.row').html(html);
})







