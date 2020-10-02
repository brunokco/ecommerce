var productosInfo = {};
var comments = {};



function showProductosImages(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}





function seeComents(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let comments = array[i];
        htmlContentToAppend += `
            <br>
            <h3 class="text-align>Comentarios</h3>
            <div class="row text-center text-lg-left"></div>
            <div id="date" class="container">` + comments.dateTime + ` Clasificacion ` + comments.score + ` estrellas! </div>
            <div id="userComments"> Usuario:  ` + ` ` + comments.user + ` </div> 
            <br>
            <div id="desc"> ` + comments.description + `</div>
            <br>
            
            `
    }
    document.getElementById("container-comments").innerHTML = htmlContentToAppend;


}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            seeProductsInfo = resultObj.data;

            let categoryNameHTML = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCostHTML = document.getElementById("productCost");


            categoryNameHTML.innerHTML = seeProductsInfo.name;
            categoryDescriptionHTML.innerHTML = seeProductsInfo.description;
            productCountHTML.innerHTML = seeProductsInfo.soldCount;
            productCostHTML.innerHTML = seeProductsInfo.cost + ` ` + seeProductsInfo.currency;


            showProductosImages(seeProductsInfo.images);

        }

        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                seeProductsRelated = resultObj.data;

                let htmlContentToAppend = "";

                for (let i = 0; i < seeProductsInfo.relatedProducts.length; i++) {
                    let relatedProducts = seeProductsRelated[seeProductsInfo.relatedProducts[i]];
                    htmlContentToAppend += `
                    <div class="container">
                            <div class="img-style">   
                                    <img src="` + relatedProducts.imgSrc + `">
                                    <div>
                                    <h2>`+ relatedProducts.name + ` </h2>
                                    </div>       
                                    <p>`+ relatedProducts.cost + ` ` + "USD" + `</p>               
                    
                            </div>
                    </div>` 
                }
                document.getElementById("related-container").innerHTML = htmlContentToAppend;
            }

        });

    });




    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            seeComentsInfo = resultObj.data;

            seeComents(seeComentsInfo)

        }
    });
});
