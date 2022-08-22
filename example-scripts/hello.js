let num = 0

let inter = setInterval(() => {
    console.log('hello -> -> ->');
    num += 1;
    if (num >= 10) {
        clearInterval(inter)
    }
}, 1000)


