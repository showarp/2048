    gd = document.querySelectorAll('.gd');
    mapd = new Array(4);
    for(i = 0; i <=3; i++){
        mapd[i] = new Array(4);
    };
    var a = -1;
    for(let x = 0 ;x<mapd.length ;x++){
        for(let y = 0;y<mapd[x].length ;y++){
            a+=1; 
            mapd[x][y] = {              //包含各种信息 横坐标 纵坐标 是否有方块 第几个父元素
                key : gd[a],
                left : x,
                top : y,
                value:false
            };
        };
    };
        function sc(mp){
            div = document.currentElement('div');
            div.className = 'sbox';
            gd[mp].appendChild(div);
        }
        sc(1);
    gd.forEach(function(nm,ix){
        if(gd[ix].querySelectorAll('div').length>1){
            console.log(gd[ix]);
        }
    })
