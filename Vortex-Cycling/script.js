let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];



function adicionarProduto(nome, preco, imagem){


    let produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );


    if(produtoExistente){

        produtoExistente.quantidade++;

    } 
    else {


        carrinho.push({

            nome:nome,
            preco:preco,
            imagem:imagem,
            quantidade:1

        });


    }


    guardarCarrinho();

    atualizarCarrinho();


    alert(nome + " foi adicionado ao carrinho!");

}





function guardarCarrinho(){


    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );


}





function atualizarCarrinho(){


    let contador = document.getElementById("contador");


    if(contador){


        contador.innerHTML = carrinho.reduce(

            (total, produto)=> total + produto.quantidade,

            0

        );


    }



    let lista = document.getElementById("listaCarrinho");

    let totalElemento = document.getElementById("total");



    if(lista){


        lista.innerHTML = "";


        let total = 0;



        if(carrinho.length === 0){


            lista.innerHTML="O carrinho está vazio.";


        }


        else{


            carrinho.forEach((produto,index)=>{


                lista.innerHTML += `


                <div class="item-carrinho">


                <img src="${produto.imagem}">


                <div>


                <h3>${produto.nome}</h3>


                <p>

                ${produto.preco.toFixed(2)}€

                </p>


                <button onclick="diminuirQuantidade(${index})">
                -
                </button>


                ${produto.quantidade}


                <button onclick="aumentarQuantidade(${index})">
                +
                </button>


                <button onclick="removerProduto(${index})">

                Remover

                </button>


                </div>


                </div>


                `;



                total += produto.preco * produto.quantidade;


            });


        }



        if(totalElemento){

            totalElemento.innerHTML = total.toFixed(2)+"€";

        }


    }


    mostrarResumoCheckout();


}





function aumentarQuantidade(index){


    carrinho[index].quantidade++;


    guardarCarrinho();

    atualizarCarrinho();


}





function diminuirQuantidade(index){


    if(carrinho[index].quantidade > 1){

        carrinho[index].quantidade--;

    }


    guardarCarrinho();

    atualizarCarrinho();


}





function removerProduto(index){


    carrinho.splice(index,1);


    guardarCarrinho();

    atualizarCarrinho();


}





function mostrarResumoCheckout(){


    let resumo = document.getElementById("resumoCheckout");


    if(resumo){


        resumo.innerHTML="";


        let total = 0;



        if(carrinho.length === 0){


            resumo.innerHTML = "O carrinho está vazio.";


        }


        else{


            carrinho.forEach(produto=>{


                resumo.innerHTML += `


                <div class="linha-resumo">


                <img src="${produto.imagem}">


                <p>

                ${produto.nome}

                <br>

                ${produto.quantidade}x 
                ${produto.preco.toFixed(2)}€

                </p>


                </div>


                `;



                total += produto.preco * produto.quantidade;


            });



            resumo.innerHTML += `


            <hr>


            <h2>

            Total:
            ${total.toFixed(2)}€

            </h2>


            `;


        }


    }


}





function pesquisarProdutos(){


    let pesquisa = document
    .getElementById("pesquisaProduto")
    .value
    .toLowerCase();



    let produtos = document.querySelectorAll(".product-card");



    produtos.forEach(produto=>{


        if(produto.innerText.toLowerCase().includes(pesquisa)){


            produto.style.display="block";


        }

        else{


            produto.style.display="none";


        }


    });


}





function filtrarCategoria(categoria){


    let produtos = document.querySelectorAll(".product-card");


    produtos.forEach(produto=>{


        if(categoria==="todos" ||
        produto.classList.contains(categoria)){


            produto.style.display="block";


        }

        else{


            produto.style.display="none";


        }


    });


}





function confirmarCompra(){


    alert(
    "Compra realizada com sucesso! Obrigado por escolher a Vortex Cycling 🚴‍♂️"
    );


    localStorage.removeItem("carrinho");


    carrinho=[];


    window.location.href="obrigado.html";


}





window.onload=function(){


    atualizarCarrinho();


    mostrarResumoCheckout();


};
function rastrearEncomenda(){

    let numero = document.getElementById("numeroEncomenda").value;

    let resultado = document.getElementById("resultadoRastreio");


    if(numero === ""){

        resultado.innerHTML = "Introduz um número de encomenda.";

    }
    else{

        resultado.innerHTML = 
        "📦 Encomenda " + numero + "<br><br>🚚 Em preparação para envio.";

    }

}
if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker.register("service-worker.js");

});

}
function aceitarCookies(){

localStorage.setItem(
"cookiesAceites",
"true"
);


document.getElementById("cookies").style.display="none";


}



window.addEventListener("load",()=>{


if(!localStorage.getItem("cookiesAceites")){


let aviso = document.createElement("div");


aviso.id="cookies";


aviso.innerHTML=`

<p>
Usamos cookies para melhorar a tua experiência.
</p>

<a href="privacidade.html">
Saber mais
</a>

<button onclick="aceitarCookies()">
Aceitar
</button>

`;


document.body.appendChild(aviso);


}


});
