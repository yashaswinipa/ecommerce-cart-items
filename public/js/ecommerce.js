function register(){
    let Username = document.getElementById("name").value;
    let Age = document.getElementById("age").value;
    let Phone = document.getElementById("no").value;
    let Email = document.getElementById("email").value;
    let Password = document.getElementById("password").value;
    let Gender = document.querySelector('input[type="radio"]:checked').value;

      if((Username == '')){
        alert('Enter your Name');
        document.getElementById('name').focus();
        return ;
      }

      if((Age == '')){
        alert('Enter your age');
        document.getElementById('age').focus();
        return ;
      }
      if((Phone == '')){
        alert('Enter your Number');
        document.getElementById('no').focus();
        return ;
      }
      if((Email == '')){
        alert('Enter your email');
        document.getElementById('email').focus();
        return ;
      }

      if((Password == '')){
        alert('Enter your password');
        document.getElementById('password-1').focus();
        return ;
      }
      

      let pastdata=JSON.parse(localStorage.getItem("customerdata") || '[]')

      var id=Math.random() *10

      var obj={"id":id,"name":Username, "age":Age, "phone":Phone, "email":Email, "password":Password, "gender":Gender};

      pastdata.push(obj);
      localStorage.setItem('customerdata',JSON.stringify(pastdata));
      console.log(obj)
      alert("registered")
}

function login(){
  let email = $('#email').val();
  let password = $('#password').val();
  console.log(email,password)
  
  let data =JSON.parse(localStorage.getItem("customerdata")) ;
    if(email !== undefined && email !== 'undefined' && email.length !== 0 && email !== ''&& password !== undefined && password !== 'undefined' && password.length !== 0 && password !== ''){
          for (let i = 0; i < data.length; i++) {
                if((email == data[i].email)&&(password == data[i].password)){
                  let sessData = [{"id":data[i].id,"name": data[i].name}]
                  localStorage.setItem("currentUser",JSON.stringify(sessData));
                  alert(`Successfully logged in`);
                  window.location = "/pages/landing.html"
                }
                else {
                  continue;
                }
              }
            }
        else{
         alert("Invalid Data")
        }
  }

  function landing(){
    let sess = JSON.parse(localStorage.getItem("currentUser"));
    if(sess.length == 1){
        let data = [{"iid":"1",
                    "img":"shirt.jfif",
                    "amount":"3000",
                    "name":"SHIRT",
                    "quantity":"1"},

                    {"iid":"2",
                    "img":"pant.jpeg",
                    "amount":"4000",
                    "name":"PANT",
                    "quantity":"1"},

                    {"iid":"3",
                    "img":"shoes.jpg",
                    "amount":"1500",
                    "name":"SHOES",
                    "quantity":"1"},

                    {"iid":"4",
                    "img":"watch.jfif",
                    "amount":"1000",
                    "name":"WATCH",
                    "quantity":"1"}];
                    
        localStorage.setItem("products",JSON.stringify(data));
        let cdata = JSON.parse(localStorage.getItem("products"));
        console.log(cdata)
        let pdata;
        for (let i = 0; i < cdata.length; i++) {

        pdata +='<div id="item" class="col-3"><img class="img1" src="/public/assets/images/products/'+cdata[i].img+'" alt=""><span><p class="name">'+cdata[i].name+'</p><p class="amount">'+cdata[i].amount+'</p></span><label id="lbl" for="number">Quantity :</label><input type="number" step="1"  max="10" value="'+cdata[i].quantity+'"  id="quantity'+cdata[i].iid+'" class="quantity-field border-0 text-center w-25"><br><button  id="cartBtn" onclick="addToCart('+cdata[i].iid+')" class="btn btn-primary float-end ">Add to Cart</button> </div>'
        
      }
      document.getElementById("land").innerHTML = pdata;
  }
}


function addToCart(iid){
  let data = JSON.parse(localStorage.getItem("products"));
  let sess = JSON.parse(localStorage.getItem("currentUser"));
  let userid = sess[0].id;
  let quantity = $("#quantity"+iid).val();
  
  let item;
  for (let i = 0; i < data.length; i++) {
      if(data[i].iid==iid){
            console.log(data[i]);

        item = data[i];
          item["username"] = userid;
          item["quantity"] = quantity;

          let pastitems = JSON.parse(localStorage.getItem("Cartitems") || '[]');
          pastitems.push(item);
          localStorage.setItem("Cartitems",JSON.stringify(pastitems));
          alert("Added to cart")
      }
  }
}


function Cart(){

      let cartData = JSON.parse(localStorage.getItem("Cartitems"));
      let pitem  = '';
      let total = 0;
      // console.log(cartData)
      for (let i = 0; i < cartData.length; i++) {
            pitem +='<div id="item" class="col-3"><img class="imgs" src="/public/assets/images/products/'+cartData[i].img+'" alt=""><span><p class="name">'+cartData[i].name+'</p><p class="amount" id="amount">'+cartData[i].amount+'</p></span><label id="lbl" for="number">Select Quantity :</label><input type="number" step="1"  max="10" value="'+cartData[i].quantity+'" name="quantity" id="quantity'+cartData[i].iid+'" class="quantity-field border-0 text-center w-25"></div>'
              if(parseInt(cartData[i].quantity)>1){
                  for (let j = 0; j < parseInt(cartData[i].quantity); j++) {
                      total += parseInt(cartData[i].amount);   
                  }
              }
              else{
                  total += parseInt(cartData[i].amount);
              }  
      }
      if(pitem.length == 0){
          document.getElementById("cardBox").innerHTML = 'Cart is Empty'
      }
      else{
          document.getElementById("cardBox").innerHTML = pitem;
          document.getElementById("total").value = total;
      }     
  }

