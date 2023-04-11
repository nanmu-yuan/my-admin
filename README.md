babel-polyfill 的原理是当运行环境中并没有实现的一些方法，babel-polyfill会做兼容。
babel-runtime 它是将es6编译成es5去执行。我们使用es6的语法来编写，最终会通过babel-runtime编译成es5.也就是说，不管浏览器是否支持ES6，只要是ES6的语法，它都会进行转码成ES5.所以就有很多冗余的代码。

babel-polyfill 它是通过向全局对象和内置对象的prototype上添加方法来实现的。比如运行环境中不支持Array.prototype.find 方法，引入polyfill, 我们就可以使用es6方法来编写了，但是缺点就是会造成全局空间污染。

babel-runtime: 它不会污染全局对象和内置对象的原型，比如说我们需要Promise，我们只需要import Promise from 'babel-runtime/core-js/promise'即可，这样不仅避免污染全局对象，而且可以减少不必要的代码。

虽然 babel-runtime 可以解决 babel-polyfill中的避免污染全局对象，但是它自己也有缺点的，比如上，如果我现在有100个文件甚至更多的话，难道我们需要一个个文件加import Promise from 'babel-runtime/core-js/promise' 吗？那这样肯定是不行的，因此这个时候出来一个 叫 babel-plugin-transform-runtime，
它就可以帮助我们去避免手动引入 import的痛苦，并且它还做了公用方法的抽离。比如说我们有100个模块都使用promise，但是promise的polyfill仅仅存在1份。
这就是 babel-plugin-transform-runtime 插件的作用。




### 哈希值的区别：

hash：每次修改任何一个文件，所有文件名的hash至都将改变，所以一旦修改了任何一个文件，整个项目的文件缓存都将失效

chunkHash：根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值就一样，chunkHash不适用于同一chunk的文件，
如一个js文件导入了一个css文件，他们属于同一个chunk，因此若只修改了js，最终打包出来的文件cs和js都会变成一个新的hash

contenthash：根据文件内容生成hash值，不同文件的hash值一定不一样（只要文件内容不做修改，一定是同一个hash，有变动则会替换成另外的）
，这样就令浏览器只清楚掉变动文件的缓存（只有改动的文件重命名了）
 



 ### node --16.18.0