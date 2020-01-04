$(document).ready(function(){ 
displayAll()
});

function displayAll(){
    console.log("display all");
    $.ajax({
        url         : "http://192.168.1.6/API_Basil_Revisi/history.php",
        type        : "GET",
        dataType    : "json",
        crossDomain: true,
        cache:false,
        processData:false,
        success     : function(result){
            console.log(result);
            
            //menghitung jumlah data history
           const jmlData = result["num"];
           console.log(jmlData);

           if(jmlData > 0){
            for(var i = 0; i < jmlData; i++){
                var hasil = result["records"][i];
                var t = $('#hasil').DataTable();
                    t.row.add( [
                        hasil["keterangan"],
                        hasil["lokasi"],
                        hasil["is_in_office"],
                        hasil["created_at"]
                    ])
             } 
             t.order( [[ 3, 'desc' ]] ).draw( false );
           } else {
                document.getElementById('hasil').innerHTML = "Anda belum memiliki history presensi"; 
           }
           
            
        }         
    });
}
