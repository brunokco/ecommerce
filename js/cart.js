var cartBuy = {};
var sumatoria = 0;
        var sumatoria1 = 0;
function showProductosCart(array) {
    
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        
        let arrayCart = array[i];
        let sumatoria = arrayCart.unitCost * arrayCart.count; 
        if (arrayCart.currency === "USD"){ 
          sumatoria1 = arrayCart.cost * 40;}
          else {
          }
        htmlContentToAppend += `
        <div class="col"
            <div class="row">
                <div class="col">
                    <table class="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal Articulo<th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img id="icono"class="img-cart" src="` + arrayCart.src + `" alt="">
                                <td>` + arrayCart.name + ` </td>
                                <td>` + arrayCart.count + `</td>
                                <td>` + arrayCart.unitCost + arrayCart.currency + ` </td>
                                <td>` + sumatoria + arrayCart.currency + `</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
        </div>`
        ;   
    }
    document.getElementById("cart").innerHTML = htmlContentToAppend; 
    
}
    


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartBuy = resultObj.data.articles;
            showProductosCart(cartBuy);
            document.getElementById("subtotal").innerHTML = (sumatoria1 * 40) + sumatoria;
        }
    })
})