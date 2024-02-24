//products//

let products = {
  WhiteCoffee: {
    stock: 2,
    price: 4,
  },

  Cappucciono: {
    stock: 4,
    price: 4.8,
  },

  FlatWhite: {
    stock: 3,
    price: 5.5,
  },

  Muffin: {
    stock: 1,
    price: 6.5,
  },
}

function displayProducts() {
  document.getElementById('WhiteCoffee').innerHTML =
    'White Coffee price: $' +
    products.WhiteCoffee.price +
    '     stock: ' +
    products.WhiteCoffee.stock

  document.getElementById('Cappucciono').innerHTML =
    'Cappucciono price: $' +
    products.Cappucciono.price +
    '     stock: ' +
    products.Cappucciono.stock

  document.getElementById('FlatWhite').innerHTML =
    'FlatWhite price: $' +
    products.FlatWhite.price +
    '     stock: ' +
    products.FlatWhite.stock
  document.getElementById('Muffin').innerHTML =
    'Muffin price: $' +
    products.Muffin.price +
    '     stock: ' +
    products.Muffin.stock
}

displayProducts()

//Customers//

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let cost = 0

function displayTotalCost() {
  document.getElementById('Amount').innerHTML = 'Total Cost: $' + cost
}

displayTotalCost()

let newOrder = []
let order = {}

function dispayNewOrder() {
  let stringOrder = JSON.stringify(order).slice(1, -1)
  stringOrder = stringOrder.replace(/:/g, ' x').replace(/"/g, '')

  document.getElementById('customerOrder').innerHTML =
    'Customer order: ' + stringOrder
}

dispayNewOrder()

let minOrderSize = 1
let maxOrderSize = 4

function generateCustomerOrder() {
  // get random size for order in a range: 1-5
  // majke a new array of the things they're ordering when click on button
  // assign the new order to the customer object
  //dispay the order by linking to HTML

  let ordersize = getRandomInt(minOrderSize, maxOrderSize)
  newOrder = []
  let totalCash = 0
  let productNames = Object.keys(products)
  let count = {}
  let totalCost = 0

  //console.log(ordersize)
  for (let i = 0; i < ordersize; i++) {
    let productIndex = getRandomInt(0, productNames.length - 1)
    let productName = productNames[productIndex]
    //console.log(productName)
    newOrder.push(productName)
  }

  for (let i = 0; i < newOrder.length; i++) {
    totalCash += products[newOrder[i]].price
  }

  totalCost = totalCash.toFixed(2)
  console.log('totalCost' + totalCost)

  for (const element of newOrder) {
    if (count[element]) {
      count[element] += 1
    } else {
      count[element] = 1
    }
  }

  console.log('count' + JSON.stringify(count), typeof count)

  order = count
  cost = totalCost
  dispayNewOrder()
  displayTotalCost()
  return totalCost
}

document.getElementById('customerButton').onclick = generateCustomerOrder

// Your OWN MONEY

let yourMoney = getRandomInt(0, 68)

function dispayYourMoney() {
  document.getElementById('YourMoney').innerHTML =
    'Customer Money on hand: $' + yourMoney
}
console.log('yourmoney', yourMoney)
dispayYourMoney()

// get the minimum cost of buying a coffee
function miniPrice() {
  let price = []
  for (let name in products) {
    let product = products[name]
    price.push(product.price)
  }

  let miniPrice = Math.min(...price)
  return miniPrice
}

miniprice = miniPrice()
console.log('mini ' + miniprice)

// fill out session

function fillOrder() {
  //when $money on hand < the cheapest price of produst in the listing, alert "please top up your money".
  //When $ customer order > $Money on hand, alert"Your dont have enough fund, please make another order"
  //when $customer order<$money on hand & we have products in stock, fill order button will keep track of the stock level and update the $ money on hand, when stock level=0, produst turn into red
  //when $customer order<$money on hand & we only have partial products in stock,
  //it will only keep track of the responding stock level substracting the amount of available products cost from $money on hand and alert the quantilities & name of the products in shortage for the current order.

  let actualCost = 0
  let QtyOfStock = []
  let count = {}
  cost = parseInt(cost)
  if (yourMoney < miniprice) {
    alert('Please top up your money to make order')
    return
  }

  console.log('checkTC' + cost, typeof cost)
  console.log('yourMoney in fillorder' + yourMoney, typeof yourMoney)

  if (yourMoney < cost) {
    alert(
      'Sorry, You dont have enough money, please click "Create order" to create another order'
    )
    return
  }

  for (i = 0; i < newOrder.length; i++) {
    let productName = newOrder[i]
    let outOfStockPrice = products[newOrder[i]].price

    if (products[newOrder[i]].stock > 0) {
      products[productName].stock--
      actualCost += products[productName].price
      console.log('stock' + products[productName].stock)
    } else {
      QtyOfStock.push(newOrder[i])
    }

    console.log('QTYOfStock' + QtyOfStock)

    // outOfStockPrice = 0
    // actualCost += outOfStockPrice
  }

  for (const element of QtyOfStock) {
    if (count[element]) {
      count[element] += 1
    } else {
      count[element] = 1
    }
  }

  let name = Object.keys(products)
  for (productStock of name) {
    if (products[productStock].stock === 0) {
      document.getElementById(productStock).style.color = 'red'
    }
  }

  if (yourMoney - cost >= 0) {
    yourMoney -= actualCost.toFixed(2)
  } else {
    alert('Sorry, Your dont have enough money')
    return
  }

  showingShortage()

  console.log('count' + JSON.stringify(count))

  function showingShortage() {
    if (Object.keys(count).length !== 0) {
      let stringCount = JSON.stringify(count)
      stringCount = stringCount.slice(1, -1)
      stringCount = stringCount.replace(/:/g, ' x').replace(/"/g, '')

      console.log('shortage Count' + stringCount)
      alert(
        'Sorry! We dont have enough stock.\nShortage Qty in this order: ' +
          stringCount
      )
    }
  }

  yourMoney = yourMoney.toFixed(2)
  console.log('TC' + actualCost)
  console.log('YM' + yourMoney)

  newOrder = order = []
  cost = totalCost = 0
  console.log(yourMoney)

  displayProducts()
  displayTotalCost()
  dispayNewOrder()
  dispayYourMoney()
}

document.getElementById('fillOrder').onclick = fillOrder
