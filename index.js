    gd = document.querySelectorAll('.gd');
    const mapd = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
    ];
    obj = {
    sj : function (){
            return suiji = Math.floor(Math.random()*gd.length); //随机生成的位置
        }};
    function sc(mp){            //生成位置?以及数量
        div = document.createElement('div');
        div.className = 'sbox';
        gd[mp].appendChild(div);
    }
    // for(var x = 0; x <mapd.length; x++){
    //     for(var y = 0; y <mapd[x].length; y++){
    //         console.log(mapd[x][y]);
    //         sc(mapd[x][y]);
    //     }
    // }