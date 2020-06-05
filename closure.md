#JavaScript的闭包#



##1.JavaScript的作用域##

作用域：其实作用域的本质是一套规则，它定义了变量的可访问范围，控制变量的可见性和生命周期

JavaScript 编译到执行的过程`var a = 2;`

编译过程：  
词法分析：解析成词法单元，var、a、=、2  
语法分析：将单词单元转换成抽象语法树  
代码生成：将抽象语法树转换成机器指令  
  
1.遇到 var a，编译器会询问作用域是否已经有一个该名称的变量存在于同一个作用域的集合中。如果是，编译器会忽略该声明，继续进行编译；否则它会要求作用域在当前作用域的集合中声明一个新的变量，并命名为 a。    
2. 接下来编译器会为引擎生成运行时所需的代码，这些代码被用来处理 a = 2 这个赋值操作。  
3. 引擎运行时会首先询问作用域，在当前的作用域集合中是否存在一个叫作 a 的 变量。如果是，引擎就会使用这个变量；如果否，引擎会一直往外层嵌套作用域找该变量。  
如果引擎最终找到了 a 变量，就会将 2 赋值给它。否则引擎就会抛出一个异常。

***变量提升：编译阶段时会把所有的声明操作提升，而赋值操作原地执行***


**作用域的嵌套以及引擎对作用域的查找**  
当一个块或函数嵌套在另一个块或函数中时，就发生了作用域的嵌套。   
查找时会从运行所在的作用域开始，逐级往上查找，直到遇见第一个标识符为止。 

```
var a=1; 
function foo() { 
    var a = 2;
    console.log(a);
    function bar() {
        var a = 3;
        console.log(a);
        console.log(window.a);  
    }
    bar();  
    }
    foo();
```

##2.什么是闭包##

***闭包是指有权访问另一个函数作用域中的变量的函数***

```
function outter() {
    var sky = "blue";
    function inner() {
        console.log(sky);
    }

    return inner;
}
var result = outter();
result();
```

***闭包的关键在于：外部函数调用之后其变量对象本应该被销毁，但闭包的存在使我们仍然可以访问外部函数的变量对象。***

在outter()执行完之后，通常outter()的整个内部作用域都会被销毁，因为引擎有垃圾回收器来释放不再使用的内存空间。但是闭包使得内部作用域依然存在,因此没有被回收。
inner()在使用这个内部作用域，inner()是能够覆盖outter()内部作用域的闭包，使得该作用域能够一直存活，inner()持有对该作用域的引用，而这个引用就叫作闭包

```
function wait(message){
    setTimeout(function timer(){
        console.log(message);
    },1000);
}
wait("Hello, closure!");
```
将一个内部函数（名为 timer）传递给 setTimeout(..)。timer 具有涵盖 wait(..) 作用域 的闭包，因此还保有对变量 message 的引用
wait(..) 执行 1000 毫秒后，它的内部作用域并不会消失，timer 函数依然保有 wait(..) 作用域的闭包

##3.闭包的用途##
**1.从外部读取函数内部的变量**  
同时闭包使用不当，优点就变成了缺点：   
缺点1：导致变量不会被垃圾回收机制回收，造成内存消耗   
缺点2：不恰当的使用闭包可能会造成内存泄漏的问题

JS规定在一个函数作用域内，程序执行完以后变量就会被销毁，这样可节省内存。   
使用闭包时，按照作用域链的特点，闭包（函数）外面的变量不会被销毁，因为函数会一直被调用，所以一直存在，如果闭包使用过多会造成内存销毁。

释放对闭包的引用
```
result = null
```

**2.将创建的变量的值始终保持在内存**

需求：实现变量的自增

1、通过全局变量，可以实现，但会污染其他程序  
  
``` 
var a = 10;
function Add(){
    a++;
    console.log(a);
}
Add();
Add();
Add();
```

2、定义一个局部变量，不污染全局，但是实现不了递增

```
function Add2() {
    var a = 10;
    a++;
    console.log(a);
}
Add2();
Add2();
Add2();
```
3、通过闭包

```
function Add3() {
    var a = 10;
    return function () {
        a++;
        return a;
    };
};
var cc = Add3();
console.log(cc());
console.log(cc());
console.log(cc());
```






