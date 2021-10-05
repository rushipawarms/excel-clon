
 const $ = require("jquery");
 let db;
 let lsc;

$(document).ready(function () {
   $(".cell").on("click",function(){
       
       let rowid=Number($(this).attr("rid"));
       let colid=Number($(this).attr("cid"));
       let celladd=String.fromCharCode(65+colid)+(rowid+1);
       $("#address").val(celladd);
       let cellobject=db[rowid][colid];
       $("#formula").val(cellobject.formula);
       

   })
    $("#formula").on("blur", function(){
        let formula=$(this).val();
        //getting value of formala;
        
      
      // db upadte
        let address=$("#address").val();
        let {rowid,colid}=getids(address);
        let cellobject=db[rowid][colid];
        if(cellobject.formula!=formula)
        {
            let value=solvef(formula);
            cellobject.value=value+"";
            cellobject.formula=formula;
            //UI update
            $(lsc).text(value);
        }
      
        })

        function solvef(formula)
        {
            let fcmps=formula.split(" ");
            for(let i=0;i<fcmps.length;i++)
            {
                let fcomp=fcmps[i];
                let cellname=fcomp[0];
                if(cellname>='A' && cellname<='Z')
                {
                    let {rowid, colid}=getids(fcomp);
                    
                    let cellobject=  db[rowid][colid];
                    let value=cellobject.value;
                    formula=formula.replace(fcomp, value);
                }
            }
            let value=eval(formula);
            return value;
        }
        // this function gives us rowid and colid
        function getids(fcomp)
        {
            let colid=fcomp.charCodeAt(0)-65;
            let rowid=Number(fcomp.substring(1))-1;
            return {rowid:rowid,colid:colid};
        }



//this will give update value at your databse
$(".cell").on("blur",function(){
    lsc=$(this);
    let val=$(this).text();
    let rowid=Number($(this).attr("rid"));
    let colid=Number($(this).attr("cid"));
    let cellobject=db[rowid][colid];
   if(cellobject.value!=val)
   {
    cellobject.value=val;
   }
})

   // this will create a DB for store cell data;
   function init()
   {
   db=[];
   for(let i=0;i<100;i++)
   {
       row=[];
       for(let j=0;j<26;j++)
       {
           let cellad=String.fromCharCode(65+j)+(i+1);
               cellobject={
                   name:cellad,
                   value:"",
                   formula:""
                       }
           row.push(cellobject);
       }
       db.push(row);
   }
   console.log(db);
   }
   init();
})