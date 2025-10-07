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

        const Detail = $(`<button class="DetailRumah">Lihat Detail</button>`);
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

            const Detail = $(`<button class="DetailRumah">Lihat Detail</button>`);
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

    // kosongkan isi sebelumnya dahulu
    body.empty();

    // judul
    const nama = $(`<h2>🛖 ${rumah.nama}</h2>`);
    body.append(nama);

    // provinsi
    const prov = $(`<p><strong>📍 Provinsi:</strong> ${rumah.provinsi}</p><br>`);
    body.append(prov);

    // gambar
    const gambar = $(`<img src="${rumah.gambar}" alt="${rumah.nama}" 
        style="width:100%;border-radius:10px;margin:10px;height:400px;object-fit:cover;">`);
    body.append(gambar);

    // ciri arsitektur
    const arsitektur = $(`<p><strong>🧱 Ciri Arsitektur:</strong> ${rumah.ciriArsitektur}</p><br>`);
    body.append(arsitektur);

    // fungsi ruang
    const fungsi = $(`<p><strong>🛖 Fungsi Ruang:</strong> ${rumah.fungsiRuang}</p><br>`);
    body.append(fungsi);

    // filosofi
    const filosofi = $(`<p><strong>🍂 Filosofi:</strong> ${rumah.filosofi}</p><br>`);
    body.append(filosofi);

    // penggunaan
    const penggunaan = $(`<p><strong>🛠️ Penggunaan:</strong> ${rumah.penggunaan}</p><br>`);
    body.append(penggunaan);

    // referensi
    const refTitle = $(`<p><strong>📚 Referensi:</strong></p><br>`);
    body.append(refTitle);

    const Refrensi = $(`<ul style="margin-left:20px;margin-bottom:20px;"></ul>`);
    rumah.referensi.forEach(ref => {
        Refrensi.append(`<li>${ref}</li>`);
    });
    body.append(Refrensi);

    //model 3d (jika ada)
    if (rumah.model3d !== undefined && rumah.model3d !== null && rumah.model3d !== "") {
    const Model3d = $(`<iframe
    src="${rumah.model3d}/embed"
    frameborder="0"
    allow="autoplay; fullscreen; vr"
    allowfullscreen
    style="width:100%; height:480px; border-radius:12px;">
    </iframe>`);
    body.append(Model3d);
    }

    const commentForm = $(`
    <div style="margin-top:10px;">
    <h2>Komentar</h2>
      <input id="namaInput" type="text" placeholder="Nama" style="width:100%;padding:8px;margin-bottom:10px;border-radius:8px;border:1px solid #ccc;">
      <textarea id="komentarInput" placeholder="komentar" style="width:100%;padding:8px;border-radius:8px;border:1px solid #ccc;min-height:80px;"></textarea>
      <button id="submitKomentar" style="margin-top:10px;padding:8px 16px;color:black;border:none;border-radius:8px;cursor:pointer;">Kirim Komentar</button>
    </div>
  `);
  body.append(commentForm);

  // Tempat daftar komentar
  const daftarKomentar = $(`<div id="daftarKomentar" style="margin-top:20px;"></div>`);
  body.append(daftarKomentar);

  const KataKunci = `komentar_${rumah.nama}`;
  const komentarList = JSON.parse(localStorage[KataKunci] || "[]");


 function tampilkanKomentar() {
  daftarKomentar.empty();

  const komentarList = JSON.parse(localStorage.getItem(KataKunci) || "[]");

  if (komentarList.length === 0) {
    daftarKomentar.append(`<p>Belum ada komentar.</p>`);
  } else {
    komentarList.forEach((komentar, Nomor) => {
      daftarKomentar.append(`
        <div style="border:1px solid #ddd;border-radius:8px;padding:8px;margin-bottom:8px;">
          nama : ${komentar.nama}
          <button class="hapusKomen" style="background:red;color:white;cursor:pointer;float:right;">
            Hapus
          </button>
          <p style="margin-top:4px;clear:both;">Komentar : ${komentar.isi}</p>
        </div>
      `);
    });

    // Event hapus komentar
    $(".hapusKomen").off("click").on("click", function () {
      const Nomor = $(this).data("Nomor");//mendapatkan Nomor ke berapa komentar mau dihapus
      const updateKomentar = JSON.parse(localStorage.getItem(KataKunci) || "[]");//ambil data komentar yg disimpen di localstorage berdasarkan katakunci
      updateKomentar.splice(Nomor, 1);//penghapusan komentar pada nomor tertentu
      localStorage.setItem(KataKunci, JSON.stringify(updateKomentar));//setelah di hapus isi daftar komentar di update 
      tampilkanKomentar();//tampilkan kembali
    });
  }
}

  tampilkanKomentar();

  // Event submit komentar
  $("#submitKomentar").off("click").on("click", function () {
    const nama = $("#namaInput").val().trim();
    const isi = $("#komentarInput").val().trim();
    if (nama!== null && isi!== null) {
      let komentarList = JSON.parse(localStorage.getItem(KataKunci)||"[]")//update data komentar terbaru sebelum ditambah
      komentarList.push({ nama, isi });
      localStorage.setItem(KataKunci, JSON.stringify(komentarList));
      $("#namaInput").val("");
      $("#komentarInput").val("");
      tampilkanKomentar();
    } else {
      alert("Nama dan komentar tidak boleh kosong!");
    }
  });

    // tampilkan konten
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