$(document).ready(function(){
    chartData();
});


    
    function chartData(){
        console.log("chart ready");
        $.ajax({
            url         : "http://192.168.1.6/API_Basil_Revisi/for_chart.php",
            type        : "GET",
            dataType    : "json",
            crossDomain: true,
            cache:false,
            processData:false,
    
            success: 
            function(result){
                console.log(result['total_keterangan']);
                var d = new Date();
                var n = d.getFullYear();
                var hasil = result['total_keterangan'];
                
                for (var x = 0; x < hasil.length; x++){
                    if(hasil[x]['when'] == "01-"+n){
                        var jan_pres = hasil[x]['jumlah_presensi'];
                        var jan_din = hasil[x]['jumlah_dinas'];
                        var jan_iz = hasil[x]['jumlah_izin'];
                    }
                    else if(hasil[x]['when'] == "02-"+n){
                        var feb_pres = hasil[x]['jumlah_presensi'];
                        var feb_din = hasil[x]['jumlah_dinas'];
                        var feb_iz = hasil[x]['jumlah_izin'];
                    }
                    else if(hasil[x]['when'] == "03-"+n){
                        var mar_pres = hasil[x]['jumlah_presensi'];
                        var mar_din = hasil[x]['jumlah_dinas'];
                        var mar_iz = hasil[x]['jumlah_izin'];
                    }
                    else if(hasil[x]['when'] == "04-"+n){
                        var apr_pres = hasil[x]['jumlah_presensi'];
                        var apr_din = hasil[x]['jumlah_dinas'];
                        var apr_iz = hasil[x]['jumlah_izin'];
                    }
                    else if(hasil[x]['when'] == "05-"+n){
                        var mei_pres = hasil[x]['jumlah_presensi'];
                        var mei_din = hasil[x]['jumlah_dinas'];
                        var mei_iz = hasil[x]['jumlah_izin'];
                    }
                    else if(hasil[x]['when'] == "06-"+n){
                        var jun_pres = hasil[x]['jumlah_presensi'];
                        var jun_din = hasil[x]['jumlah_dinas'];
                        var jun_iz = hasil[x]['jumlah_izin'];
                    }
                    else if(hasil[x]['when'] == "07-"+n){
                        var jul_pres = hasil[x]['jumlah_presensi'];
                        var jul_din = hasil[x]['jumlah_dinas'];
                        var jul_iz = hasil[x]['jumlah_izin'];
                    }
                    else if(hasil[x]['when'] == "08-"+n){
                        var aug_pres = hasil[x]['jumlah_presensi'];
                        var aug_din = hasil[x]['jumlah_dinas'];
                        var aug_iz = hasil[x]['jumlah_izin'];
                    }
                    else if(hasil[x]['when'] == "09-"+n){
                        var sep_pres = hasil[x]['jumlah_presensi'];
                        var sep_din = hasil[x]['jumlah_dinas'];
                        var sep_iz = hasil[x]['jumlah_izin'];
                    }
                    else if(hasil[x]['when'] == "10-"+n){
                        var okt_pres = hasil[x]['jumlah_presensi'];
                        var okt_din = hasil[x]['jumlah_dinas'];
                        var okt_iz = hasil[x]['jumlah_izin'];
                    }
                    else if(hasil[x]['when'] == "11-"+n){
                        var nov_pres = hasil[x]['jumlah_presensi'];
                        var nov_din = hasil[x]['jumlah_dinas'];
                        var nov_iz = hasil[x]['jumlah_izin'];
                    }
                    else if(hasil[x]['when'] == "12-"+n){
                        var des_pres = hasil[x]['jumlah_presensi'];
                        var des_din = hasil[x]['jumlah_dinas'];
                        var des_iz = hasil[x]['jumlah_izin'];
                    }

                }


                var ctx = document.getElementById('myChart');
                Chart.defaults.global.defaultFontFamily = "Lato";
                Chart.defaults.global.defaultFontSize = 22;
                var x= 10
                var dataFirst = {
                    label:"Presensi",
                    data:[jan_pres,feb_pres,mar_pres,apr_pres,mei_pres,jun_pres,jul_pres,aug_pres,sep_pres,okt_pres,nov_pres,des_pres],
                    lineTension:0,
                    fill:false,
                    borderColor:'blue',
                    pointRadius:8
                }

                var dataSecond = {
                    label:"Izin",
                    data:[jan_iz,feb_iz,mar_iz,apr_iz,mei_iz,jun_iz,jul_iz,aug_iz,sep_iz,okt_iz,nov_iz,des_iz],
                    lineTension:0,
                    fill:false,
                    borderColor:'red',
                    pointRadius:8
                }

                var dataThird = {
                    label:"Dinas",
                    data:[jan_din,feb_din,mar_din,apr_din,mei_din,jun_din,jul_din,aug_din,sep_din,okt_din,nov_din,des_din],
                    lineTension:0,
                    fill:false,
                    borderColor:'lime',
                    pointRadius:8
                }

                var bulan = {
                    labels:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets:[dataFirst,dataSecond,dataThird],
                    pointRadius:0
                    // pointBorderWidth:1
                }

                var chartOptions = {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
                    legend:{
                        display:true,
                        position: 'top',
                        labels:{
                            boxWidth:15,
                            fontColor:'black'
                        }
                    }
                };

                var lineChart = new Chart(ctx,{
                    type:'line',
                    data:bulan,
                    options:chartOptions
                })
            }         
        });
    }