import Menu from "assets/js/menudata.js";
console.log(Menu);
let root = document.querySelector("#menu")
//stores the id of the items inserted in the cart
let cartarray =[]

//both close buttons for the modal body
let btnClose = document.querySelector(".modal-dialog button")
let btnClose2 = document.querySelector(".modal-footer button")

/*
The above statement imports an array of objects Menu from the menudata.js file.
You can treat Menu as any other object, except it is already populated for you.
You will be using fields in this object array to generate the menu items, as
shown in the assignment description
The main properties you will be looking at are 

idMeal - Every food item has an unique id

strMeal - The name of the item

strMealThumb - URL of food image

strIngredients1-20 : Some food objects do not have all 20 ingredients. For example, 
                     if an item has 12 ingredients, then strIngredients13-20 
                     will either be null or the empty string

price: The amount of the food item in dollars

*/

// Your code goes here, do not modify the above

/*
 I have added some template functions, that you should implement to structure your code.
 You are free to use add other utility functions as
 */

 //generate menu
 for(let item of Menu){
  root.innerHTML+= genMenuItem(item)
  
}

//Generating menu function
function genMenuItem(item) {
  
  //to store all of the ingredients in a string variable
  let ingredients= ""
  for(let i= 1; i<=20; i++){
    let str = "strIngredient"+i
    if(item[str]!= ""&&item[str]!=null)
      ingredients= ingredients+ item[str] + ", "
     
    
  }
  
  return `<div id="item-${item.idMeal}" class="col"> <div class="card h-100">
          <img src=${item.strMealThumb} 
           class="card-img-top"alt="..."/>
          <div class="card-body">
          <h5 class="card-title">${item.strMeal}</h5><p class="card-text">${ingredients} </p>
         </div><div class="card-footer"><p class="text-center">$${item.price}</p>
          <button
          id="item-${item.idMeal}-add"
           value=${item.idMeal}"
          class="btn btn-warning col-12"
         >
         Add to Cart
          </button>
         </div>
          </div>
           </div>
           </div>
           </div>
           </div>
          `
  
  /*
        This function should accept an item object from the Menu Array
        and return a card containing the HTML element for the item.
        The returned card can be added as a child of the div with id=menu (see HTML)
        Hint: When generating the Add to Card button in the card, associate the value to the 
        id of the item object. In the event-handler of the button link the addToCart method,
        and pass it the id of the object. 

        Alternatively use the event propagation/delegation methods covered in class
        to just  invoke the addToCart function and handle the logic of which item's 
        addToCart button was clicked inside. In this case you would have to change the signature
        of the addToCart function to something else.
    */

}
//global variable for cart and checkout button
let cart = document.getElementById("cart")
let btnCO=document.querySelector("#btnCheckout")
btnCO.disabled= true;


//adds element to cart 
function addToCart(itemID) {
  btnCO.disabled= false;
  let menuitem
  for(let item of Menu){
    if(itemID==item.idMeal)
      menuitem = item
  }
  
  //event listener for check out buttons
  btnCO.addEventListener("click", function(){
    showSummary()
   

  })

  //store the item id in array
  cartarray.push(itemID)
  console.log(cartarray)

  //remove the empty cart notice
  document.querySelector(".total").style.display = "none"

  let card = document.createElement('div')
  card.className = "card"
  card.id= itemID
  let row = document.createElement('div')
  row.classList.add("row", "g-0")
  let col1 = document.createElement('div')
  col1.className="col-md-4"
  col1.innerHTML = `<img src="${menuitem.strMealThumb}" alt="..." class="img-fluid"/>`
  row.appendChild(col1)

  let col2 = document.createElement('div')
  col2.className="col-md-8"

  let cardbody = document.createElement('div')
  cardbody.className="card-body"

  let cardtitle = document.createElement('h5')
  cardtitle.className="card-title"
  cardtitle.textContent= menuitem.strMeal
  cardbody.appendChild(cardtitle)

  let cardtext = document.createElement('p')
  cardtext.className="card-text"
  cardtext.innerHTML =`<small class="text-muted">$${menuitem.price}</small>`
  cardbody.appendChild(cardtext)

  let btn = document.createElement('button')
  btn.id= "cart-" + itemID+ "-del"
  btn.value="cart-" + itemID
  btn.classList.add("btn", "btn-danger")
  btn.innerText = "Remove"
  btn.addEventListener("click", function(){removeFromCart(itemID)})
  cardbody.appendChild(btn)
  col2.appendChild(cardbody)
  row.appendChild(col2)
  card.appendChild(row)
  cart.appendChild(card)

  console.log(menuitem)

  /*

        This function should accept an itemID corresponding to the id of a menu item and return 
        a card containing the HTML element for the item. You can easily retrieve the object from the Menu Array 
        using the itemID and be able to access the name and image properties.
        The returned card can be added as a child of the div with id=cart (see HTML). You also need 
        to add some logic to enable the checkout button since it is disabled when the cart is empty.

        Hint: When generating the Remove button in the card, associate the value to the 
        id of the item object. In the event-handler of the remove button link the removeFromCart method,
        and pass it the id of the object. 
        Also, when generating the card, give the div some id that is related to the itemID. For example,
        if the itemID is 5313, assign an id of cart-5313 to the div.

        Alternatively use the event propagation/delegation methods covered in class
        to just  invoke the removeCart function and handle the logic of which item's 
        removeCart button was clicked . In this case you would have to change the signature
        of the removeFromCart function to something else.
    */

}

for(let item of Menu){
  let btn = document.getElementById("item-"+item.idMeal+"-add")
  btn.addEventListener("click",function(){
    
    addToCart(item.idMeal)

  })
}

function removeFromCart(itemID) {
  clear()
  let citem = document.getElementById(itemID)
  //remove the cart item
  citem.remove()
  //remove item from array
  let i = cartarray.indexOf(itemID)
  console.log(i)
  cartarray.forEach(element => {
    if(itemID==element){
      cartarray.splice(i,1)
    }
    
  });
  console.log(cartarray)
  if(cartarray.length==0){
    //shows the empty cart div and disables button
    document.querySelector(".total").style.display = "unset"
    btnCO.disabled= true;
  }


  
     
  /*
        This function should accept an itemID corresponding to the id of a menu item 
        and remove the item from the cart. Since you know the itemID, you can locate
        the div containing the card (see Hint above). Once located you can use .remove() 
        to remove the div from the cart.

        You also need to add some logic to check if removing this item results in an empty
        cart, in which case the checkout button should be re-disabled.

    */
}

let summary= document.querySelector('#summary')

let total = 0;
function showSummary() {
  //clear the cart leaving only the empty cart notice
  btnCO.disabled=true
 cart.innerHTML = ` <h5 class="card-header">Your Cart</h5> 
 <div class="card total">
 <div id="empty-cart" class="card-body">
   <p>No items in cart</p>
   
 </div>
</div>`

  
 let ctr = 0
  //match the ids of the contents in the cart with the ones from the menu, to retrieve name and price
  for(let element of cartarray) {

    for(let item of Menu){
      if(item.idMeal == element){
        //add the prices of the cart contents
        total += parseFloat(item.price)
        
        let row = document.createElement('div')
        row.className = "row"
        let itemName = document.createElement('div')
        itemName.className= "col-8"
        let itemPrice = document.createElement('div')
        itemPrice.className= "col-4"
        itemName.textContent = item.strMeal
        itemPrice.textContent = '$' +item.price
        
        console.log(total)
        row.appendChild(itemName)
        row.appendChild(itemPrice)
        console.log(row)
        summary.appendChild(row)
        
        //remove each element after its added to the modal body
        regulateArray(element)

        if(cartarray.length==0){
          ctr = -1
        }
       

        
        
        
       
      }
      
    }


    
    
  }

  
  //this is so far just an attempt to clearing the modal body after it is closed
  // call()
 
  
  
 if(ctr == -1){
  console.log(ctr)
  console.log(cartarray.length)
  let divider = document.createElement('hr')
  summary.appendChild(divider)
  let row2 = document.createElement('div')
  row2.className = "row"
  let itemName = document.createElement('div')
  itemName.className= "col-8"
  let subtotal = document.createElement('div')
  subtotal.className= "col-4"
  itemName.textContent = 'Subtotal'
  subtotal.textContent = '$' + total.toFixed(2)

  row2.appendChild(itemName)
  row2.appendChild(subtotal)
  console.log(row2)
  summary.appendChild(row2)

  let row3 = document.createElement('div')
  row3.className = "row"
  let taxlabel = document.createElement('div')
  taxlabel.className= "col-8"
  let taxes = document.createElement('div')
  taxes.className= "col-4"
  taxlabel.textContent = 'Taxes and Fees (6.5%)'
  taxes.textContent = '$' + ((6.5*total)/100).toFixed(2)

  row3.appendChild(taxlabel)
  row3.appendChild(taxes)
  console.log(row3)
  summary.appendChild(row3)

  let row4 = document.createElement('div')
  row4.className = "row"
  let totallabel = document.createElement('div')
  totallabel.className= "col-8"
  let finaltotal = document.createElement('div')
  finaltotal.className= "col-4"
  totallabel.textContent = 'Grand Total'
  finaltotal.textContent = '$' + (((6.5*total)/100)+ (parseFloat)(total)).toFixed(2)

  row4.appendChild(totallabel)
  row4.appendChild(finaltotal)
  console.log(row4)
  summary.appendChild(row4)

  

 }

 btnClose.addEventListener("click", function(){
  clear()
  console.log(summary)
})

btnClose2.addEventListener("click", function(){
  clear()
  console.log(summary)
})
  

 
        
  




  /*
     This function should be invoked when the user clicks on checkout.
     In the HTML, the checkout button is already linked to the modal display,
     that will pop up. All you need to do is grab a reference to the model body (see id=summary)
     and start adding some rows with the item name and item price.

    


    Once all items in cart has been listed,  add another 3 rows with the subtotal
    taxes and fees, and grand total.

    Finally, make sure your cart is cleared, and the checkout button is disabled.

    Hint: THe cleanest way to do this is to define a cart array in the global scope.
    This array is a simple array of numbers and will just contain the item IDs of the items a
    dded to the cart. You can add some lines of code to the addToCart and removeFromCart method 
    to manage this array, so that it is in sync with your display. 
    THen in this function you can simply, go through the cart array, find the objects in your menu with 
    the correspondiung ids and access the price property. The rest is just summing them up.

     Modal Template : https://getbootstrap.com/docs/5.0/components/modal/
     
    */


    
}


//function to clear the modal body
function clear(){
  console.log(summary)
  total=0
  //while summary still has a first child element, remove it
  while(summary.firstChild){
    summary.removeChild(summary.firstChild)
  }
  console.log(summary)

 
}

//just a safety for removing the cart element thats already added to the summary
function regulateArray (element){
 let index = cartarray.indexOf(element)
 cartarray.splice(index, 1)
 console.log(cartarray)
}




/*
 Main Logic
    Define some variables that reference the #menu, #cart sections  and the checkout button in your html
    Next iterate over the Menu array, generate a card for each object and append then to your menu div.
    While adding them, also specify the event listeners for the Add to Cart button. The event listener for
    Remove should also be specified here.
    Finally link the showSummary to the btnCheckout button
*/



