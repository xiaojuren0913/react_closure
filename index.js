
// 闭包
// function outter() {
//     var sky = "blue";
//     function inner() {
//         console.log(sky);
//     }

//     return inner;
// }
// var result = outter();
// result();



// 闭包无处不在
// function wait(message) {
//     setTimeout(function timer() {
//         console.log(message);
//     }, 1000);
// }
// wait("Hello, closure!");


// 经典闭包问题
// for (var i = 1; i <= 5; i++) {
//     setTimeout(function () {
//         console.log(i);
//     }, i * 1000);
// }


// for (var i = 1; i <= 5; i++) {
//     setTimeout((function (i) {
//         return function () {
//             console.log(i);
//         }
//     })(i), i * 1000);
// }

for (let i = 1; i <= 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, i * 1000);
}



//   闭包的用处   

// function Add3() {
//     var a = 10;
//     return function () {
//         a++;
//         return a;
//     };
// };
// var cc = Add3();
// var dd = Add3();
// console.log('dd', dd());
// console.log(cc());
// console.log(cc());
// console.log(cc());

