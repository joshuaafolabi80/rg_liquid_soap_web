if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
        console.log('click')
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartButton = document.getElementsByClassName('shop-item-button')
    for(var i = 0; i < addToCartButton.length; i++ ){
        var button = addToCartButton[i]
        button.addEventListener('click', addToCartButtonClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseButtonClicked)
}

function purchaseButtonClicked(){
    alert('Thank you for your purchase')
    var cartItemsForPurchaseButton = document.getElementsByClassName('cart-items')[0]
    while(cartItemsForPurchaseButton.hasChildNodes()){
        cartItemsForPurchaseButton.removeChild(cartItemsForPurchaseButton.firstChild)
    }
    updateCartTotal()
}

function addToCartButtonClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var imagesrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    console.log(title, imagesrc, price)
    addItemToCart(title, imagesrc, price)
    updateCartTotal()
}

function addItemToCart(title, imagesrc, price){
    var cartRow = document.createElement('div')
    cartRow.innerText = title
    cartRow.innerText = imagesrc
    cartRow.innerText = price
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemTitle = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0; i < cartItemTitle.length; i++){
        var cartItemTitleMain = cartItemTitle[i]
        if (cartItemTitleMain.innerText == title){
            alert('This item is already added to the cart')
            return
        }
    }
    cartItems.append(cartRow)
    var cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imagesrc}" alt="" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" role="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContent
    cartRow.classList.add('cart-row')
    var cartRowRemoveButton = cartRow.getElementsByClassName('btn-danger')[0]
    cartRowRemoveButton.addEventListener('click', removeCartItem)
    var cartRowAddQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0]
    cartRowAddQuantity.addEventListener('change', quantityChanged)
}

function quantityChanged(event){
    var input =  event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}


function updateCartTotal() {
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemsContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        console.log(priceElement, quantityElement)
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        console.log(price)
        var quantity = quantityElement.value
        console.log(quantity)
        console.log(price*quantity)
        total = total + (price*quantity)
        console.log(total)
    }
    // total = math.round(total*100)/100
    var updatedTotal = document.getElementsByClassName('cart-total-price')[0]
    updatedTotal.innerText = '$' + total
}