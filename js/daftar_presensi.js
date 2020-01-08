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
                if(hasil["status"] == "Belum Tervalidasi"){
                    var button = "<button type='button' id='askbutton' class='btn btn-block btn-primary' onclick='validasi()'>Approve</button>";
                }else{
                    var button = "<button type='button' id='askbutton' class='btn btn-block btn-danger' onclick='validasi()'>Not Approve</button>";
                }
                
                    t.row.add( [
                        hasil["Nama"],
                        hasil["lokasi"],
                        hasil["created_at"],
                        hasil["status"],
                        button
                    ])
             } 
             t.order( [[ 2, 'desc' ]] ).draw( false );
           } else {
                document.getElementById('hasil').innerHTML = "Anda belum memiliki history presensi"; 
           }
           
            
        }         
    });
}

function validasi(){
    var table = $('#hasil').DataTable();
 
    $('#hasil').on('click', 'tr', function () {
        var status = table.row( this ).data()[3];
        var nama = table.row( this ).data()[0];
        var waktu = table.row( this ).data()[2];
        console.log(status, nama, waktu);

        $.ajax({
            url: "http://192.168.1.6/API_Basil_Revisi/validasi.php",
            type: "POST",
            datatype:"json",
            crossDomain: true,
            data:JSON.stringify( { user_name:nama, time:waktu, valid:status } ),
            cache:false,
            processData:false,

            success: function(result)
            {
                var error = result.error;
                if(error){
                    console.log("gagal validasi");
                    console.log(result.error_msg);
                    alert(result.error_msg);
                }
                else{
                    console.log("Berhasil validasi");
                    alert("sini");
                    window.location.href = "tables.html";
                }
            }
        });
        return false;
    });
}
