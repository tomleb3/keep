export const utilService = {
   makeId,
   randomColor,
   makePrice
}

function makeId(length = 5) {
   var txt = '';
   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   for (var i = 0; i < length; i++)
      txt += possible.charAt(Math.floor(Math.random() * possible.length));

   return txt;
}

function randomColor() {
   const colors = ['#FFFFFF', '#F28B82', '#FBBC04', '#FFF475', '#CCFF90',
      '#A7FFEB', '#CBF0F8', '#AECBFA', '#D7AEFB', '#FDCFE8', '#E6C9A8', '#E8EAED']

   var rand = Math.floor(Math.random() * colors.length);
   return colors.splice(rand, 1);
}

function makePrice() {
   let price = randIntInclusive(0, 200)
   let currency;
   switch (randIntInclusive(0, 2)) {
       case 0:
           currency = '€'
           break
       case 1:
           currency = '$'
           break
       case 2:
           currency = '₪'
           break
   }
   return {
       price: price,
       currency: currency
   }
}

function randIntInclusive(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}