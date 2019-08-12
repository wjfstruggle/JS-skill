/*
 * @Descripttion: 获取一个对象属性的函数
 */
export function getPro(object, prototypeName, defaultValue) {
    if (!(prototypeName in object)) {
        return defaultValue
    }
    return object[prototypeName]
}
let obj = {
    name: 'hero',
    isVillian: false
}
getPro(obj, "name", 'Unknow')

/** 判断对象的数据类型
 * 使用Object.prototype.toString配合闭包模式，通过传入不同的数据类型返回不同的判断函数（传入的参数类型要大写）
 * */ 
const isType = function(type) {
    return function(target) {
        return `[object ${type}]` === Object.prototype.toString.call(target);
    }
}
const isArray = isType('Array');
console.log(isArray([])) // true
const isType = type => target => `[Object] ${type}` === Object.prototype.toString.call(target) // 箭头函数一行搞定

/**
 * 循环实现map数组方法
 */
const selMap = function(fn, context) {
    let arr = Array.prototype.slice.call(this) // 声明数组是Array的原型
    let mapedArr = Array(arr.length - 1);
    for( let i = 0; i < arr.length; i++ ) {
        // 判断是否是稀有数组的情况
        if(!arr.hasOwnProperty(i)) {
            continue
        }
        mapedArr[i] = fn.call(context, arr[i], i, this)
    }
    return mapedArr
}
// 使用方法，将selMap 挂载到Array.prototype上
Array.prototype.selMap = selMap;
console.log([1,2,3].selMap(item => item * 2))

/**
 * 循环实现数组 filter 方法
 */
const selFilter = function(fn, context) {
    let arr = Array.prototype.slice.call(this) // 声明数组是Array的原型
    let filteredArr = Array(arr.length - 1);
    for( let i = 0; i < arr.length; i++ ) {
        // 判断是否是稀有数组的情况
        if(!arr.hasOwnProperty(i)) {
            continue
        }
        fn.call(context, arr[i], i, this) && filteredArr.push(arr[i])
    }
    return filteredArr
}