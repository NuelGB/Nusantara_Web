$(document).ready(function() {
    // 1. Logika Toggle Hamburger Menu
    $('.hamburger-icon').click(function() {
        $('.nav-links').toggleClass('active'); 
    });

    // 2. Logika Toggle Bagian About
    $('#about-btn').click(function() {
        const aboutSection = $('#about-section');
        const isVisible = aboutSection.is(':visible');
        
        if (isVisible) {
            aboutSection.slideUp(300);
            $(this).text('Tentang Kami');
        } else {
            aboutSection.slideDown(300);
            $(this).text('Sembunyikan Info');
        }
    });
    
    // 3. Logika Favorit di Home
    loadFavoritesHome();

    // Handler untuk tombol Unfavorit
    $(document).on('click', '.unfavorit-btn', function() {
        const namaRumah = $(this).data('nama');
        removeFavorite(namaRumah);
    });

});


// Fungsi untuk mengambil data favorit dari localStorage
function getFavorites() {
    const favorites = localStorage.getItem('rumahAdatFavorit');
    return favorites ? JSON.parse(favorites) : [];
}

// Fungsi untuk menyimpan data favorit ke localStorage
function saveFavorites(favorites) {
    localStorage.setItem('rumahAdatFavorit', JSON.stringify(favorites));
}

// Fungsi untuk memuat dan menampilkan daftar favorit di Home
function loadFavoritesHome() {
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
        const item = $(`
            <div class="favorit-item">
                <img src="${r.gambar}" alt="${r.nama}">
                <div class="item-info">
                    <b class="namarumahadat">${r.nama}</b>
                    <p class="provinsi">${r.provinsi}</p>
                    <button class="unfavorit-btn" data-nama="${r.nama}">Hapus Favorit</button>
                </div>
            </div>
        `);
        listContainer.append(item);
    });
}

function removeFavorite(nama) {
    let favorites = getFavorites();
    const initialLength = favorites.length;
    favorites = favorites.filter(r => r.nama !== nama);
    
    if (favorites.length < initialLength) {
        saveFavorites(favorites);
        loadFavoritesHome(); 
    }
}