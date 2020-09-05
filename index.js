gd = document.querySelectorAll('.gd');
mapd = new Array(4);
mapt = new Array(); //创建剩余地图的数组
for (let i = 0; i < 4; i++) {
    mapt[i] = new Array();
}
for (i = 0; i <= 3; i++) {
    mapd[i] = new Array(4);
};
var a = -1;
for (let x = 0; x < mapd.length; x++) {
    for (let y = 0; y < mapd[x].length; y++) {
        a += 1;
        mapd[x][y] = { //包含各种信息 横坐标 纵坐标 是否有方块 第几个父元素
            prent: gd[a], //当前的节点
            left: x, //当前的横坐标
            top: y, //当前的纵坐标
            value: false, //是否有方块在里面
            key: a
        };
    }
}

function judgment() { //判断函数
    gd.forEach((ne1, ix1) => { //用于判断地图内是否有方块 有的话value值为true 否则false
        if (gd[ix1].querySelectorAll('div').length >= 1) {
            mapd.forEach((ne2, ix2) => {
                mapd[ix2].forEach((ne3, ix3) => {
                    if (mapd[ix2][ix3].prent == gd[ix1]) {
                        mapd[ix2][ix3].value = true;
                    };
                });
            });
        } else if (gd[ix1].querySelectorAll('div').length == 0) {
            mapd.forEach((ne2, ix2) => {
                mapd[ix2].forEach((ne3, ix3) => {
                    if (mapd[ix2][ix3].prent == gd[ix1]) {
                        mapd[ix2][ix3].value = false;
                    };
                });
            });
        };
    });
    mapd.forEach((nm1, ix1) => { //记录发生变化后的地图  必须以这个殿后来结束这个函数
        mapd[ix1].forEach((nm2, ix2) => {
            if (mapd[ix1][ix2].value == false) {
                mapt[ix1][ix2] = mapd[ix1][ix2].prent; //载入没有方块的地图
            } else {
                mapt[ix1][ix2] = undefined;
            };
        });
    });
};

function generate(num) { //生成方块函数
    function sc(mp, num) { //生成的函数需要传入一个父元素以在此之下创建子元素也就是方块 r
        //如果父元素为undefined的话则创建失败（已经有子元素的则为undefined）
        div = document.createElement('div');
        div.className = 'sbox';
        mp.appendChild(div);
        mp.querySelector('div').innerHTML = num;
    }
    sjobj = { //需要传入一个已经变化的地图以在空白的地方生成方块
        arr: mapt,
        x: undefined,
        y: undefined,
        sjxy: function () {
            this.x = Math.floor(Math.random() * this.arr.length);
            this.y = Math.floor(Math.random() * this.arr[this.x].length);
            if (mapt[this.x][this.y] == undefined) {
                this.sjxy(); //如果触发了👆则递归此函数 但有可能会进入死循环
            }
        },
        sj: function () {
            // if(this.arr[this.sjx()][this.sjy()]==undefined ){
            // }
            this.sjxy();
            return this.arr[this.x][this.y];
        }
    };
    var ssj = sjobj.sj();
    sc(ssj, num);
}

function newblock() { //生成随机数
    // sjnum = Math.round(Math.random() * 10);
    // if (sjnum <= 5) {
    //     sjnum = 2;
    // } else {
    //     sjnum = 4;
    // }
    judgment();
    generate(2); //这里应该是 generate(sjnum)  然后85-89的注释要取消
}

function game() {
    function start() {
        newblock();
        newblock();
    };

    function playgame() {
        function wsad(e) {
            function blockmobile(wsad) {
                switch (wsad) {
                    case 87: //w
                        mapd.forEach((nm1, ix1) => {
                            mapd[ix1].forEach((nm2, ix2) => {
                                if (mapd[ix1][ix2].value == true) {
                                    if (ix1 != 0) {
                                        for (let i = ix1 - 1; i >= 0; i--) {
                                            if (mapd[i][ix2].value == true) {
                                                if (mapd[ix1][ix2].prent.querySelector('div').innerHTML == mapd[i][ix2].prent.querySelector('div').innerHTML) {
                                                    
                                                    let div1 = mapd[ix1][ix2].prent;
                                                    let div2 = mapd[i][ix2].prent;
                                                    div2.querySelector('div').innerHTML = Number(div1.querySelector('div').innerHTML) + Number(div2.querySelector('div').innerHTML);
                                                    div1.removeChild(div1.querySelector('div'));
                                                    break;
                                                } else {
                                                    let div1 = mapd[ix1][ix2].prent;
                                                    let div2 = mapd[i + 1][ix2].prent;
                                                    div2.appendChild(div1.querySelector('div'));
                                                    judgment();
                                                    break;
                                                }
                                                break;
                                            } else if (i == 0) {
                                                let div1 = mapd[ix1][ix2].prent;
                                                let div2 = mapd[0][ix2].prent;
                                                div2.appendChild(div1.querySelector('div'));
                                                break;
                                            };
                                            
                                            judgment();
                                        };
                                    } else {
                                    };
                                    judgment();
                                };
                            });
                        });
                        judgment();
                        break;
                    case 83: //s
                    let newmapd = mapd.slice().reverse();
                    newmapd.forEach((nm1, ix1) => {
                        newmapd[ix1].forEach((nm2, ix2) => {
                            if (newmapd[ix1][ix2].value == true) {
                                if (ix1 != 0) {
                                    for (let i = ix1 - 1; i >= 0; i--) {
                                        if (newmapd[i][ix2].value == true) {
                                            if (newmapd[ix1][ix2].prent.querySelector('div').innerHTML == newmapd[i][ix2].prent.querySelector('div').innerHTML) {
                                                let div1 = newmapd[ix1][ix2].prent;
                                                let div2 = newmapd[i][ix2].prent;
                                                div2.querySelector('div').innerHTML = Number(div1.querySelector('div').innerHTML) + Number(div2.querySelector('div').innerHTML);
                                                div1.removeChild(div1.querySelector('div'));
                                                break;
                                            } else {
                                                let div1 = newmapd[ix1][ix2].prent;
                                                let div2 = newmapd[i + 1][ix2].prent;
                                                div2.appendChild(div1.querySelector('div'));
                                                judgment();
                                                break;
                                            }
                                            break;
                                        } else if (i == 0) {
                                            let div1 = newmapd[ix1][ix2].prent;
                                            let div2 = newmapd[0][ix2].prent;
                                            div2.appendChild(div1.querySelector('div'));
                                            break;
                                        };
                                        judgment();
                                    };
                                } else {
                                };
                                judgment();
                            };
                        });
                    });
                    judgment();
                        break;
                    case 65: //a
                    mapd.forEach((nm1, ix1) => {
                        mapd[ix1].forEach((nm2, ix2) => {
                            if (mapd[ix1][ix2].value == true) { 
                                if (ix2 != 0) { 
                                    for (let i = ix2 - 1; i >= 0; i--) { 
                                        if (mapd[ix1][i].value == true) { 
                                            if (mapd[ix1][ix2].prent.querySelector('div').innerHTML == mapd[ix1][i].prent.querySelector('div').innerHTML) {      
                                                let div1 = mapd[ix1][ix2].prent;
                                                let div2 = mapd[ix1][i].prent;
                                                div2.querySelector('div').innerHTML = Number(div1.querySelector('div').innerHTML) + Number(div2.querySelector('div').innerHTML);
                                                div1.removeChild(div1.querySelector('div'));
                                                break;
                                            } else {
                                                let div1 = mapd[ix1][ix2].prent;
                                                let div2 = mapd[ix1][i+1].prent;
                                                div2.appendChild(div1.querySelector('div'));
                                                judgment();
                                                break;
                                            }
                                            break;
                                        } else if (i == 0) {
                                            let div1 = mapd[ix1][ix2].prent;
                                            let div2 = mapd[ix1][0].prent;
                                            div2.appendChild(div1.querySelector('div'));
                                            break;
                                        };
                                        judgment();
                                    };
                                } else {
                                };
                                judgment();
                            };
                        });
                    });
                    judgment();
                        break;
                    case 68: //d
                    mapd.forEach((nm1, ix1) => {
                        mapd[ix1].forEach((nm2, ix2) => {
                            if (mapd[ix1][ix2].value == true) { 
                                if (ix2 != 0) { 
                                    for (let i = ix2 - 1; i >= 0; i--) { 
                                        if (mapd[ix1][i].value == true) { 
                                            if (mapd[ix1][ix2].prent.querySelector('div').innerHTML == mapd[ix1][i].prent.querySelector('div').innerHTML) {      
                                                let div1 = mapd[ix1][ix2].prent;
                                                let div2 = mapd[ix1][i].prent;
                                                div2.querySelector('div').innerHTML = Number(div1.querySelector('div').innerHTML) + Number(div2.querySelector('div').innerHTML);
                                                div1.removeChild(div1.querySelector('div'));
                                                break;
                                            } else {
                                                let div1 = mapd[ix1][ix2].prent;
                                                let div2 = mapd[ix1][i+1].prent;
                                                div2.appendChild(div1.querySelector('div'));
                                                judgment();
                                                break;
                                            }
                                            break;
                                        } else if (i == 0) {
                                            let div1 = mapd[ix1][ix2].prent;
                                            let div2 = mapd[ix1][0].prent;
                                            div2.appendChild(div1.querySelector('div'));
                                            break;
                                        };
                                        judgment();
                                    };
                                } else {
                                };
                                judgment();
                            };
                        });
                    });
                    judgment();
                        break;
                }
                judgment();
            };
            judgment();
            blockmobile(e.keyCode);
            newblock();
        };
        window.addEventListener('keydown', wsad);
    };
    start();
    playgame();
}
game();