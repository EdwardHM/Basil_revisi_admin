$(document).ready(function(){ 
    displayAll()
    displayUser()
    // fungsi untuk bagian kolom form popup
    document.getElementById("namaCetak").style.visibility="hidden";
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
                    var button = "<button type='button' id='askbutton' class='btn btn-block btn-info' onclick='validasi()'>Approve</button>";
                }else{
                    var button = "<button type='button' id='askbutton' class='btn btn-block btn-danger' onclick='validasi()'>Not Approve</button>";
                }

                if(hasil["keterangan"] == "izin"){
                    var keterangan = hasil["keterangan"].fontcolor( "red" );
                } else if (hasil["keterangan"] == "dinas"){
                    var keterangan = hasil["keterangan"].fontcolor( "lime" );
                } else if (hasil["keterangan"] == "presensi"){
                    var keterangan = hasil["keterangan"].fontcolor( "blue" );
                } 

                var link = "http://192.168.1.6/API_Basil_Revisi/"+hasil["foto"];
                var link_foto = " <a href= '"+link+"'><i class='fa fa-image' style='font-size:24px'></i></a> "
                var tgl_db=hasil["created_at"];
                var date_arr = tgl_db.split(" ");
                var date_aar2 = date_arr[0].split("-");
                var new_date = date_aar2[2] + "-" + date_aar2[1] + "-" + date_aar2[0] + " " + date_arr[1];
                    t.row.add( [
                        hasil["Nama"],
                        hasil["lokasi"],
                        hasil["created_at"],
                        keterangan,
                        hasil["status"],
                        link_foto,
                        button,
                        new_date
                    ])
             } 
            //  t.row( $(this) ).draw();
            t.column( 7 ).visible( false );
             t.order( [[ 7, 'desc' ]] ).draw( false );
           } else {
                document.getElementById('hasil').innerHTML = "Anda belum memiliki history presensi"; 
           } 
        }         
    });
}

function validasi(){
    var table = $('#hasil').DataTable();
 
    $('#hasil').on('click', 'tr', function () {
        var status = table.row( this ).data()[4];
        var nama = table.row( this ).data()[0];
        var waktu = table.row( this ).data()[7];
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
                    console.log("Gagal Memperbarui Status");
                    console.log(result.error_msg);
                    alert(result.error_msg);
                }
                else{
                    console.log("Berhasil validasi");
                    alert("Berhasil Memperbarui Status");
                    window.location.href = "tables.html";
                }
            }
        });
        return false;
    });
}


// function popUp(){
    // js untuk bagian popup
    var popUp = document.getElementById("popUpBox");
    var button = document.getElementById("cetak");
    var close = document.getElementById("close");

    button.onclick = function(){
        popUp.style.display ="block";
    }

    close.onclick = function(){
        popUp.style.display = "none";
    }

    window.onclick = function(){
        if(event.target == this.popUp){
            popUp.style.display = "none";
        }
    }

// popup 2 password
    var popUp2 = document.getElementById("popUpBox2");
    var button2 = document.getElementById("ganti");
    var close2 = document.getElementById("close2");

    button2.onclick = function(){
        popUp2.style.display ="block";
    }

    close2.onclick = function(){
        popUp2.style.display = "none";
    }

    window.onclick = function(){
        if(event.target == this.popUp2){
            popUp2.style.display = "none";
        }
    }

    // popup 3 password
    var popUp3 = document.getElementById("popUpBox3");
    var button3 = document.getElementById("chart");
    var close3 = document.getElementById("close3");

    button3.onclick = function(){
        popUp3.style.display ="block";
    }

    close3.onclick = function(){
        popUp3.style.display = "none";
    }

    window.onclick = function(){
        if(event.target == this.popUp3){
            popUp3.style.display = "none";
        }
    }

    // end js untuk bagian popup
// }



//fungsi radiobutton
function visible(){
    var jCetak = document.querySelector('input[name="jenisCetak"]:checked').value;
    var kolomNama = document.getElementById("namaCetak");
    if(jCetak == "semua"){
        kolomNama.style.visibility = "hidden";
    } else if(jCetak == "sesuaiNama"){
        kolomNama.style.visibility = "visible"
    }
}



// Membuat PDF
function downloadPDF(){
    var jCetak = document.querySelector('input[name="jenisCetak"]:checked').value;
    var kolomNama = document.getElementById("namaCetak");
    var siapa = "admin";
    if(jCetak == "semua"){
        console.log("semua");
        // kirim ke API semua masuk ke pdf
        $.ajax({
            url: "http://192.168.1.6/MembuatPdf/index.php",
            type: "POST",
            datatype:"json",
            crossDomain: true,
            data:JSON.stringify( { jabatan:siapa, cari:null, user_id:null } ),
            cache:false,
            processData:false,

            success: function(result)
            {
                var error = result.error;
                if(error){
                    console.log("gagal");
                    console.log(result.error_msg);
                    alert(result.error_msg);
                }
                else{
                    console.log("terdownload");
                    window.location.href = "http://192.168.1.6/MembuatPdf/FPDF/DaftarSemua.pdf"; 
                }
            }
        });
        return false;

    } else if(jCetak == "sesuaiNama"){
        // kirim sesuai input nama
        var nama = kolomNama.value;
        console.log(nama);
        $.ajax({
            url: "http://192.168.1.6/MembuatPdf/index.php",
            type: "POST",
            datatype:"json",
            crossDomain: true,
            data:JSON.stringify( { jabatan:siapa, cari:nama, user_id:null } ),
            cache:false,
            processData:false,

            success: function(result)
            {
                var error = result.error;
                if(error){
                    console.log("gagal");
                    console.log(result.error_msg);
                    alert(result.error_msg);
                }
                else{
                    console.log("terdownload");
                    window.location.href = "http://192.168.1.6/MembuatPdf/FPDF/"+nama+".pdf"; 
                }
            }
        });
        return false;
    }
}
//End Membuat PDF


function displayUser(){
    console.log("display all");
    $.ajax({
        url         : "http://192.168.1.6/API_Basil_Revisi/user.php",
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
                var t = $('#hasil2').DataTable();

                    t.row.add( [
                        hasil["nama"],
                        hasil["phone"],
                        // "a test",
                        // "a test 2"
                    ])
             } 
             t.order( [[ 0, 'asc' ]] ).draw( false );
           } else {
                document.getElementById('hasil').innerHTML = "Anda belum memiliki history presensi"; 
           }
           
            
        }         
    });
}

// Update Password
function changePass(){
    var passBaru1 = document.getElementById("passwordBaru").value;
    var passBaru2 = document.getElementById("passwordBaru2").value;
    var user =     sessionStorage.getItem('user_uuid');
    console.log(passBaru2);
    if(passBaru1 != passBaru2){
        alert("Gagal Memperbarui Password!");
    }
    else{
        $.ajax({
            url: "http://192.168.1.6/API_Basil_Revisi/update_user.php",
            type: "POST",
            datatype:"json",
            crossDomain: true,
            data:JSON.stringify( { pass_Baru:passBaru2, user_id:user } ),
            cache:false,
            processData:false,

            success: function(result)
            {
                var error = result.error;
                if(error){
                    console.log("gagal");
                    console.log(result.error_msg);
                    alert(result.error_msg);
                }
                else{
                    alert("Berhasil Memperbarui Password!");
                }
            }
        });
        return false;
    }
}



// logout
function LogOut(){
    sessionStorage.clear();
    window.location.href = "login.html";
}