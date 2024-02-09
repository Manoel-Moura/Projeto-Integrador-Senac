class Comentario {
    constructor() {}
  
    createComentario(){
        let comentario = document.createElement('div');
        comentario.setAttribute('id','comentario');

        // Foto do usuário
        let fotoUser = document.createElement('div');
        fotoUser.setAttribute('id','fotoUser');
        fotoUser.style.backgroundImage =  "url('../assets/media/uploads/dipper-1706911387656.jpg')";

        // Div com o comentário
        let divComentario = document.createElement('div');
        divComentario.setAttribute('id','div-comentario');

        //==========================================================================

        // 1- Div com os dados da pessoa que comentou
        let infoComentario = document.createElement('div');
        infoComentario.setAttribute('id','info-comentario');

        //==========================================================================
        // Nome do User na Div 1
        let userName = document.createElement('label');
        userName.setAttribute('id','user-name');
        userName.innerHTML = 'Manoel Moura';

        // Tempo de postagem do comentario 
        let dataPublicacao =  document.createElement('label');
        dataPublicacao.setAttribute('id','data-comentario');
        dataPublicacao.innerHTML = '2 dias';

        infoComentario.appendChild(userName)
        infoComentario.appendChild(dataPublicacao)
        //==========================================================================

        // 2- Div com o texto do comentário
        let textComentario = document.createElement('div');
        textComentario.setAttribute('id','text');
        // textComentario.innerHTML = 'Ao contrário do que se acredita, Lorem Ipsum não é simplesmente um texto randômico. Com mais de 2000 anos, suas raízes podem ser encontradas em uma obra de literatura latina clássica datada de 45 AC. Richard McClintock, um professor de latim do Hampden-Sydney College na Virginia, pesquisou uma das mais obscuras palavras em latim, consectetur, oriunda de uma passagem de Lorem Ipsum, e, procurando por entre citações da palavra na literatura clássica, descobriu a sua indubitável origem. Lorem Ipsum vem das seções 1.10.32 e 1.10.33 do "de Finibus Bonorum et Malorum" (Os Extremos do Bem e do Mal), de Cícero, escrito em 45 AC. Este livro é um tratado de teoria da ética muito popular na época da Renascença. A primeira linha de Lorem Ipsum, "Lorem Ipsum dolor sit amet..." vem de uma linha na seção 1.10.32.';
        textComentario.innerHTML = 'oi';
          //==========================================================================

        // 3- Div com os botões
        let botaoCurtida = document.createElement('div');
        botaoCurtida.setAttribute('id','botao-curtida')

        // 3- Botões de Like e Deslike
        let like = document.createElement('div');
        like.setAttribute('class','bnt-like-deslike')

        like.style.backgroundImage =  "url('../assets/media/icons/like.svg')";

        let desLike = document.createElement('div');
        desLike.setAttribute('class','bnt-like-deslike')

        desLike.style.backgroundImage =  "url('../assets/media/icons/deslike.svg')";

        botaoCurtida.appendChild(like)
        botaoCurtida.appendChild(desLike)
       
        //==========================================================================

        divComentario.appendChild(infoComentario);
        divComentario.appendChild(textComentario);
        divComentario.appendChild(botaoCurtida)

        comentario.appendChild(fotoUser);
        comentario.appendChild(divComentario);

        return comentario;
    }
    createSubComentario(){
        let comentario = document.createElement('div');
        comentario.setAttribute('id','sub-comentario');

        // Foto do usuário
        let fotoUser = document.createElement('div');
        fotoUser.setAttribute('id','fotoUser');
        fotoUser.style.backgroundImage =  "url('../assets/media/uploads/dipper-1706911387656.jpg')";

        // Div com o comentário
        let divComentario = document.createElement('div');
        divComentario.setAttribute('id','div-comentario');

        //==========================================================================

        // 1- Div com os dados da pessoa que comentou
        let infoComentario = document.createElement('div');
        infoComentario.setAttribute('id','info-comentario');

        //==========================================================================
        // Nome do User na Div 1
        let userName = document.createElement('label');
        userName.setAttribute('id','user-name');
        userName.innerHTML = 'Manoel Moura';

        // Tempo de postagem do comentario 
        let dataPublicacao =  document.createElement('label');
        dataPublicacao.setAttribute('id','data-comentario');
        dataPublicacao.innerHTML = '2 dias';

        infoComentario.appendChild(userName)
        infoComentario.appendChild(dataPublicacao)
        //==========================================================================

        // 2- Div com o texto do comentário
        let textComentario = document.createElement('div');
        textComentario.setAttribute('id','text');
        textComentario.innerHTML = 'Ao contrário do que se acredita, Lorem Ipsum não é simplesmente um texto randômico. Com mais de 2000 anos, suas raízes podem ser encontradas em uma obra de literatura latina clássica datada de 45 AC. Richard McClintock, um professor de latim do Hampden-Sydney College na Virginia, pesquisou uma das mais obscuras palavras em latim, consectetur, oriunda de uma passagem de Lorem Ipsum, e, procurando por entre citações da palavra na literatura clássica, descobriu a sua indubitável origem. Lorem Ipsum vem das seções 1.10.32 e 1.10.33 do "de Finibus Bonorum et Malorum" (Os Extremos do Bem e do Mal), de Cícero, escrito em 45 AC. Este livro é um tratado de teoria da ética muito popular na época da Renascença. A primeira linha de Lorem Ipsum, "Lorem Ipsum dolor sit amet..." vem de uma linha na seção 1.10.32.';

          //==========================================================================

        // 3- Div com os botões
        let botaoCurtida = document.createElement('div');
        botaoCurtida.setAttribute('id','botao-curtida')

        // 3- Botões de Like e Deslike
        let like = document.createElement('div');
        like.setAttribute('class','bnt-like-deslike')

        like.style.backgroundImage =  "url('../assets/media/icons/like.svg')";

        let desLike = document.createElement('div');
        desLike.setAttribute('class','bnt-like-deslike')

        desLike.style.backgroundImage =  "url('../assets/media/icons/deslike.svg')";

        botaoCurtida.appendChild(like)
        botaoCurtida.appendChild(desLike)
       
        //==========================================================================

        divComentario.appendChild(infoComentario);
        divComentario.appendChild(textComentario);
        divComentario.appendChild(botaoCurtida)

        comentario.appendChild(fotoUser);
        comentario.appendChild(divComentario);

        return comentario;
    }

}

let sessionComentarios = document.getElementById('div-all-comentarios');
let fragmentSessionComentarios = document.createDocumentFragment();
let comentario = new Comentario();

let comentarioElement = comentario.createComentario();
let comentarioElement5 = comentario.createComentario();
let comentarioElement6 = comentario.createComentario();

let comentarioElement2 = comentario.createSubComentario();
let comentarioElement3 = comentario.createSubComentario();
let comentarioElement4 = comentario.createSubComentario();

fragmentSessionComentarios.appendChild(comentarioElement);
fragmentSessionComentarios.appendChild(comentarioElement2);
fragmentSessionComentarios.appendChild(comentarioElement3);
fragmentSessionComentarios.appendChild(comentarioElement4);

fragmentSessionComentarios.appendChild(comentarioElement5);
fragmentSessionComentarios.appendChild(comentarioElement6);

sessionComentarios.appendChild(fragmentSessionComentarios);
