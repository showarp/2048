gd = document.querySelectorAll('.gd');
mapd = new Array(4);
mapt = new Array();         //创建剩余地图的数组
b = 0;
for(let i = 0 ;i<4;i++){
    mapt[i] = new Array();
}
for(i = 0; i <=3; i++){
    mapd[i] = new Array(4);
};
var a = -1;
for(let x = 0 ;x<mapd.length ;x++){
    for(let y = 0;y<mapd[x].length ;y++){
        a+=1; 
        mapd[x][y] = {              //包含各种信息 横坐标 纵坐标 是否有方块 第几个父元素
            prent : gd[a],          //当前的节点
            left : x,               //当前的横坐标
            top : y,                //当前的纵坐标
            value:false,            //是否有方块在里面
            key : a
        };
    }
}
function judgment(){                        //判断函数
    gd.forEach((ne1,ix1)=>{                //用于判断地图内是否有方块 有的话value值为true 否则false
        if(gd[ix1].querySelectorAll('div').length>=1){
        mapd.forEach((ne2,ix2)=>{
                mapd[ix2].forEach((ne3,ix3)=>{
                    if(mapd[ix2][ix3].prent==gd[ix1]){
                        mapd[ix2][ix3].value = true;
                    };
                });
            });
        }else if(gd[ix1].querySelectorAll('div').length==0){
            mapd.forEach((ne2,ix2)=>{
                mapd[ix2].forEach((ne3,ix3)=>{
                    if(mapd[ix2][ix3].prent==gd[ix1]){
                        mapd[ix2][ix3].value = false;
                    };
                });
            });
        };
    });
    mapd.forEach((nm1,ix1)=>{              //记录发生变化后的地图  必须以这个殿后来结束这个函数
        mapd[ix1].forEach((nm2,ix2)=>{
            if(mapd[ix1][ix2].value==false){
                mapt[ix1][ix2] = mapd[ix1][ix2].prent;      //载入没有方块的地图
            }else{
                // mapt[ix1].splice(ix2,1);
                mapt[ix1][ix2] = undefined;
            };
        });
    });
    // console.log(mapd)
};
function generate(){                      //生成方块函数
    function sc(mp){        //生成的函数需要传入一个父元素以在此之下创建子元素也就是方块
        div = document.createElement('div');
        div.className = 'sbox';
        mp.appendChild(div);
    }
    sjobj = {            //需要传入一个已经变化的地图以在空白的地方生成方块
        arr : mapt,
        sjx : function(){
            this.dz+=1;
             return this.x = Math.floor(Math.random()*this.arr.length);
        },
        sjy : function(){
            return this.y = Math.floor(Math.random()*this.arr[this.sjx()].length);
        },
        sj : function(){
            // if(this.arr[this.sjx()][this.sjy()]==undefined ){

            // }
            return this.arr[this.sjx()][this.sjy()];
        }
    };
    sc(sjobj.sj());
    b+=1;
    document.querySelector('.sbox').innerHTML=b;
    // console.log(mapt);
}
function fuckoff(){           //生成随机数
    judgment();        //mapd
    generate();        //mapt
    console.log(mapt);
}
fuckoff();
fuckoff();
fuckoff();
fuckoff();