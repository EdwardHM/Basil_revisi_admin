$(document).ready(function(){
    console.log("Ajax Login ready");
    $("#sign-in").click(function(event){
        const nama = $('#username').val();
        const password = $('#password').val();
        console.log(nama);
        console.log(password);
        event.preventDefault();
        $.ajax({
            url: "http://192.168.5.53/API_Basil_Revisi/login.php",
            type: "POST",
            datatype:"json",
            crossDomain: true,
            data:JSON.stringify( { phone: $('#username').val(), password: $('#password').val() } ),
            cache:false,
            processData:false,


            success: function(result)
            {
                var error = result.error;
                if(error){
                    console.log("gagal login");
                    console.log(result.error_msg);
                    alert(result.error_msg);
                }
                else{
                    sessionStorage.setItem('username',result.user.nama);
                    sessionStorage.setItem('user_uuid', result.uid);
                    sessionStorage.setItem('phone', result.user.phone)
                    var admin = sessionStorage.getItem('username');
                        if(admin != "Admin"){
                            sessionStorage.clear();
                            alert('Maaf yang dapat mengakses hanyalah Admin');
                        } else{
                            // lanjut ke halaman berikutnya
                            window.location.href = "tables.html";
                        }
                }
            }
        });
        return false;
    });
});

