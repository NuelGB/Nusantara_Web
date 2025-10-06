function tampilkanrumah_adat(rumah_adat) {
    $('#hasil').empty();
    $('#judul').append('<h1> Daftar Rumah Adat di Indonesia</h1> ');
    rumah_adat.forEach((r) => {
        const row = $('<div class="item"></div>');

        const gambar = $(`<img src="${r.gambar}" alt="${r.nama}">`);
        row.append(gambar);

        const nama = $(`<b class ="namarumahadat">${r.nama}</b><br>`);
        row.append(nama);

        const provinsi = $(`<p class="provinsi">${r.provinsi}</p>`);
        row.append(provinsi);

        const Detail = $(`<button>Lihat Detail</button>`);
        Detail.click(() => {
            if (typeof showDetailPopup === 'function') {
                showDetailPopup(r);
            } else {
                DetailRumahAdat(r); 
            }
        });
        row.append(Detail);
        const Favorit = $(`<button class="tambah-favorit" data-nama="${r.nama}">Tambah Favorit</button>`);
        row.append(Favorit);

        $('#hasil').append(row);
    });
}

$(function () {
    tampilkanrumah_adat(rumah_adat);
    
    $(document).on('click', '.tambah-favorit', function() {
        const namaRumah = $(this).data('nama');
        const rumah = rumah_adat.find(r => r.nama === namaRumah);
        
        if (rumah) {
            tambahFavorit(rumah);
        }
    });
});

$('#Submit').click((e) => {
    e.preventDefault(); 

    $('#Submit')
        .empty()
        .attr('disabled', 'disabled')
        .append(' Loading...');

    $('#hasil').empty();
    $('#judul').empty();

    const kata =  $('#input').val().toLowerCase();
    const provinsi =  $('#province-filter').val().toLowerCase();

    const results = rumah_adat.filter(r => 
        r.nama.toLowerCase().includes(kata) &&
        r.provinsi.toLowerCase().includes(provinsi)
    );

    if(kata === "" && provinsi === ""){
        $('#judul').append('<h1> Daftar Rumah Adat di Indonesia</h1> ');
    }
    else{
        $('#judul').append('<h1> Hasil Pencarian</h1> ');
    }

    if (results.length === 0) {
        $('#hasil').append("<p>Tidak ditemukan hasil.</p>");
    } else {
        results.forEach(r => {
            const row = $('<div class="item"></div>');

            const gambar = $(`<img src="${r.gambar}" alt="${r.nama}">`);
            row.append(gambar);

            const nama = $(`<b class ="namarumahadat">${r.nama}</b><br>`);
            row.append(nama);

            const provinsi = $(`<p class="provinsi">${r.provinsi}</p>`);
            row.append(provinsi);

            const Detail = $(`<button>Lihat Detail</button>`);
            Detail.click(() => {
                 if (typeof showDetailPopup === 'function') {
                    showDetailPopup(r);
                } else {
                    DetailRumahAdat(r); 
                }
            });
            row.append(Detail);
            const Favorit = $(`<button class="tambah-favorit" data-nama="${r.nama}">Tambah Favorit</button>`);
            row.append(Favorit);

            $('#hasil').append(row);
        });
    }

    $('#Submit')
        .empty()
        .removeAttr('disabled')
        .append('Cari');
});

function DetailRumahAdat(rumah) {
    const popup = $("#detail");
    const body = $("#popupBody");

    popup.addClass("show");
    $(".close").off("click").on("click", function() {
        popup.removeClass("show");
    });
}
function getFavorites() {
    const favorites = localStorage.getItem('rumahAdatFavorit');
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem('rumahAdatFavorit', JSON.stringify(favorites));
}

function tambahFavorit(rumah) {
    let favorites = getFavorites();
    
    if (favorites.some(r => r.nama === rumah.nama)) {
        if (typeof showCustomPopup === 'function') {
             showCustomPopup(`"${rumah.nama}" sudah ada di Favorit Anda!`, false);
        }
        return;
    }

    favorites.push(rumah);
    saveFavorites(favorites);
    if (typeof showCustomPopup === 'function') {
        showCustomPopup(`"${rumah.nama}" berhasil ditambahkan ke Favorit!`, true);
    }
}


function showCustomPopup(message, isSuccess) {
    const popup = $('#custom-popup');
    const messageElement = $('#custom-popup-message');
    const iconElement = $('#custom-popup-icon');
    messageElement.text(message);
    if (isSuccess) {
        iconElement.removeClass('fa-exclamation-circle').addClass('fa-check-circle');
        popup.css('border-color', 'green');
    } else {
        iconElement.removeClass('fa-check-circle').addClass('fa-exclamation-circle');
        popup.css('border-color', 'red');
    }

    popup.addClass('show');

    setTimeout(() => {
        popup.removeClass('show');
    }, 30000);
}