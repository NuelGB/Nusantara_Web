$(document).ready(function() {
    $('.hamburger-icon').click(function() {
        $('.nav-links').toggleClass('active'); 
    });

    $('#about-btn').click(function() {
        const aboutSection = $('#about-section');
        const isVisible = aboutSection.is(':visible');
        
        if (isVisible) {
            aboutSection.slideUp(300);
            $(this).text('About Us');
        } else {
            aboutSection.slideDown(300);
            $(this).text('Hide Info');
        }
    });
    
    loadFavoritesHome(); 

    $(document).on('click', '.unfavorit-btn', function() {
        const namaRumah = $(this).data('nama');
        removeFavorite(namaRumah);
    });

    $(document).on('click', '.detail-favorit-btn', function() {
        const namaRumah = $(this).data('nama');
        
        const rumah = rumah_adat.find(r => r.nama === namaRumah);
        
        if (rumah) {
            showDetailPopup(rumah); 
        } else {
            showCustomPopup("Detail rumah adat tidak ditemukan.", false);
        }
    });
});


function showDetailPopup(rumah) {
    const popup = $("#detail");
    const body = $("#popupBody");

    body.empty();

    if (!rumah || !rumah.nama) {
        body.append("<h2>Detail tidak ditemukan.</h2>");
        popup.addClass("show");
        return;
    }

    const nama = $(`<h2>🛖 ${rumah.nama}</h2>`);
    body.append(nama);

    const prov = $(`<p><strong>📍 Provinsi:</strong> ${rumah.provinsi}</p><br>`);
    body.append(prov);

    const gambar = $(`<img src="${rumah.gambar}" alt="${rumah.nama}" 
        style="width:100%;border-radius:10px;margin:10px;height:250px;object-fit:cover;">`);
    body.append(gambar);

    const arsitektur = $(`<p><strong>🧱 Ciri Arsitektur:</strong> ${rumah.ciriArsitektur}</p><br>`);
    body.append(arsitektur);

    const fungsi = $(`<p><strong>🛖 Fungsi Ruang:</strong> ${rumah.fungsiRuang}</p><br>`);
    body.append(fungsi);

    const filosofi = $(`<p><strong>🍂 Filosofi:</strong> ${rumah.filosofi}</p><br>`);
    body.append(filosofi);

    const penggunaan = $(`<p><strong>🛠️ Penggunaan:</strong> ${rumah.penggunaan}</p><br>`);
    body.append(penggunaan);

    const refTitle = $(`<p><strong>📚 Referensi:</strong></p><br>`);
    body.append(refTitle);

    const Refrensi = $(`<ul style="margin-left:20px;"></ul>`);
    if (Array.isArray(rumah.referensi)) {
        rumah.referensi.forEach(ref => {
            Refrensi.append(`<li>${ref}</li>`);
        });
    } else {
         Refrensi.append(`<li>Tidak ada referensi tersedia.</li>`);
    }
    

    body.append(Refrensi);

     if (rumah.model3d !== undefined && rumah.model3d !== null && rumah.model3d !== "") {
    const Model3d = $(`<iframe
    src="${rumah.model3d}/embed"
    frameborder="0"
    allow="autoplay; fullscreen; vr"
    allowfullscreen
    style="width:100%; height:480px; margin-top:20px; border-radius:12px;">
  </iframe>`);
    body.append(Model3d);
    }

    popup.addClass("show");

    $(".close").off("click").on("click", function() {
        popup.removeClass("show");
    });
}

function showCustomPopup(message, isSuccess) {
    const popup = $('#custom-popup');
    const icon = $('#custom-popup-icon');
    
    popup.removeClass('success error').css('border-color', '');
    icon.removeClass('fa-check-circle fa-exclamation-circle');

    if (isSuccess) {
        popup.addClass('success').css('border-color', 'green');
        icon.addClass('fa-check-circle');
    } else {
        popup.addClass('error').css('border-color', 'red');
        icon.addClass('fa-exclamation-circle');
    }

    $('#custom-popup-message').text(message);
    popup.addClass('show');

    setTimeout(() => {
        popup.removeClass('show');
    }, 3000);
}


function getFavorites() {
    const favorites = localStorage.getItem('rumahAdatFavorit');
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem('rumahAdatFavorit', JSON.stringify(favorites));
}

function removeFavorite(nama) {
    let favorites = getFavorites();
    const initialLength = favorites.length;
    
    favorites = favorites.filter(r => r.nama !== nama);
    
    if (favorites.length < initialLength) {
        saveFavorites(favorites);
        loadFavoritesHome(); 
        showCustomPopup(`"${nama}" berhasil dihapus dari Favorit!`, false);
    }
}

function loadFavoritesHome() {
    if (typeof rumah_adat === 'undefined') {
        console.error("Data rumah adat tidak ditemukan.");
        return;
    }
    
    const favorites = getFavorites();
    const listContainer = $('#favorit-list');
    const noMsg = $('#no-favorit-msg');
    
    listContainer.empty();
    
    if (favorites.length === 0) {
        noMsg.show();
        return;
    }
    
    noMsg.hide();

    favorites.forEach((r) => {
        const detailRumah = rumah_adat.find(data => data.nama === r.nama); 
        
        if (detailRumah) {
            const item = $(`
                <div class="favorit-item">
                    <img src="${detailRumah.gambar}" alt="${detailRumah.nama}">
                    <div class="item-info">
                        <b class="namarumahadat">${detailRumah.nama}</b>
                        <p class="provinsi">${detailRumah.provinsi}</p>
                        <button class="detail-favorit-btn" data-nama="${detailRumah.nama}">Lihat Detail</button>
                        <button class="unfavorit-btn" data-nama="${detailRumah.nama}">Hapus Favorit</button>
                    </div>
                </div>
            `);
            listContainer.append(item);
        }
    });
}