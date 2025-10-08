$(document).ready(function() {
    $('.hamburger-icon').click(function() {
        $('.nav-links').toggleClass('active'); 
    });

    // Logika untuk tombol About Us
    $('#about-btn').click(function() {
        const aboutSection = $('#about-section');
        const isVisible = aboutSection.is(':visible');
        
        if (isVisible) {
            aboutSection.slideUp(300);
            $(this).text('About Us');
        } else {
            aboutSection.slideDown(300);
            $(this).text('Sembunyikan Info');
        }
    });
    
    // --- KODE BARU UNTUK TOMBOL BERITA ---
    $('#berita-btn').click(function() {
        const beritaSection = $('#berita-section');
        const isVisible = beritaSection.is(':visible');
        
        if (isVisible) {
            beritaSection.slideUp(300);
            $(this).text('Tampilkan Berita Terkini');
        } else {
            beritaSection.slideDown(300);
            $(this).text('Sembunyikan Berita');
        }
    });
    // --- AKHIR DARI KODE BARU ---

    loadFavoritesHome(); 
    tampilkanRiwayatKuis();

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
    
    const commentForm = $(`
    <div style="margin-top:10px;">
    <h2>Komentar</h2>
      <input id="namaInput" type="text" placeholder="Nama"  
      style="width:100%;padding:8px;margin-bottom:10px;border-radius:8px;border:1px solid #ccc;">
      <textarea id="komentarInput" placeholder="komentar"  
      style="width:100%;padding:8px;border-radius:8px;border:1px solid #ccc;min-height:80px;"></textarea>
      <button id="submitKomentar" style="margin-top:10px;padding:8px 16px;color:black;border:none;border-radius:8px;cursor:pointer;">Kirim Komentar</button>
    </div>
  `);
  body.append(commentForm);

  const daftarKomentar = $(`<div id="daftarKomentar" style="margin-top:20px;"></div>`);
  body.append(daftarKomentar);

  const KataKunci = `komentar_${rumah.nama}`;

 function tampilkanKomentar() {
  daftarKomentar.empty();
  const komentarList = JSON.parse(localStorage.getItem(KataKunci) || "[]");

  if (komentarList.length === 0) {
    daftarKomentar.append(`<p>Belum ada komentar.</p>`);
  } else {
    komentarList.forEach((komentar, Nomor) => {
      daftarKomentar.append(`
        <div style="border:1px solid #ddd;border-radius:8px;padding:8px;margin-bottom:8px;">
          <b>${komentar.nama}</b>
          <button class="hapusKomen" data-nomor="${Nomor}" style="background:red;color:white;cursor:pointer;float:right; border:none; padding: 5px 8px; border-radius: 4px;">
            Hapus
          </button>
          <p style="margin-top:4px;clear:both;">${komentar.isi}</p>
        </div>
      `);
    });

    $(".hapusKomen").off("click").on("click", function () {
      const Nomor = $(this).data("nomor");
      const updateKomentar = JSON.parse(localStorage.getItem(KataKunci) || "[]");
      updateKomentar.splice(Nomor, 1);
      localStorage.setItem(KataKunci, JSON.stringify(updateKomentar));
      tampilkanKomentar();
    });
  }
}

  tampilkanKomentar();

  $("#submitKomentar").off("click").on("click", function () {
    const nama = $("#namaInput").val().trim();
    const isi = $("#komentarInput").val().trim();
    if (nama !== "" && isi !== "") {
      let komentarList = JSON.parse(localStorage.getItem(KataKunci)||"[]");
      komentarList.push({ nama, isi });
      localStorage.setItem(KataKunci, JSON.stringify(komentarList));
      $("#namaInput").val("");
      $("#komentarInput").val("");
      tampilkanKomentar();
    } else {
      alert("Nama dan komentar tidak boleh kosong!");
    }
  });

    popup.addClass("show");
    popup.find(".close").off("click").on("click", function() {
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

const Pertanyaan = [
    { question: "Apa nama rumah adat dari provinsi Aceh?", options: ["Rumah Gadang", "Rumah Krong Bade", "Rumah Joglo", "Rumah Betang"], answer: 1 },
    { question: "Rumah Gadang berasal dari provinsi mana?", options: ["Sumatera Barat", "Jawa Tengah", "Sulawesi Selatan", "Papua"], answer: 0 },
    { question: "Rumah adat Jawa Tengah adalah", options: ["Rumah Joglo", "Rumah Limas", "Rumah Betang", "Rumah Tongkonan"], answer: 0 },
    { question: "Rumah adat Minangkabau memiliki atap berbentuk?", options: ["Perahu", "Tanduk Kerbau", "Limas", "Segitiga"], answer: 1 },
    { question: "Rumah Limas merupakan rumah adat dari?", options: ["Sumatera Selatan", "Riau", "Jambi", "Kalimantan Tengah"], answer: 0 },
    { question: "Rumah Betang adalah rumah panjang yang dihuni oleh suku?", options: ["Dayak", "Toraja", "Bugis", "Osing"], answer: 0 },
    { question: "Rumah Tongkonan memiliki atap menyerupai?", options: ["Limas", "Perahu", "Tanduk", "Segitiga"], answer: 1 },
    { question: "Rumah Honai berasal dari daerah?", options: ["Papua", "Sulawesi Selatan", "Jawa Timur", "Bali"], answer: 0 },
    { question: "Rumah Lamin adalah rumah adat dari suku?", options: ["Dayak Kenyah", "Bugis", "Betawi", "Osing"], answer: 0 },
    { question: "Rumah Baileo digunakan sebagai?", options: ["Balai pertemuan adat", "Tempat tinggal", "Gudang", "Istana"], answer: 0 },
];

$("#Kerjakan").on("click", function () {
    const popup = $("#quizPopup");
    const body = $("#quizPopupBody");
    body.empty();
    tampilkanPertanyaan(body);
    popup.addClass("show");
    popup.find(".close").off("click").on("click", function() {
        popup.removeClass("show");
    });
});

function tampilkanPertanyaan(container) {
    container.append('<h2>Kuis Rumah Adat</h2>');
    const questionsContainer = $('<div id="questionsContainer"></div>');
    $.each(Pertanyaan, function (Nomor, q) {
      const isi = $(`
        <div style="margin-bottom:15px; text-align:left;">
          <p><b>${Nomor + 1}. ${q.question}</b></p>
          ${q.options.map((pilihan, Jawaban) => `
            <label style="display:block; margin-left:10px; font-weight:normal;">
              <input type="radio" name="q${Nomor}" value="${Jawaban}"> ${pilihan}
            </label>
          `).join("")}
        </div>
      `);
      questionsContainer.append(isi);
    });
    container.append(questionsContainer);
    const submitBtn = $('<button id="SubmitKuis" style="margin-top:15px; padding: 10px 20px;">Submit</button>');
    container.append(submitBtn);
    submitBtn.on("click", function () {
        let skor = 0;
        $.each(Pertanyaan, function (i, q) {
            const jawaban = $(`input[name="q${i}"]:checked`).val();
            if (jawaban == q.answer) {
                skor++;
            }
        });
        const nilai = (skor / Pertanyaan.length) * 100;
        let riwayatKuis = JSON.parse(localStorage.getItem("riwayatKuis")) || [];
        riwayatKuis.push({ tanggal: new Date().toLocaleString(), nilai: nilai.toFixed(0) });
        localStorage.setItem("riwayatKuis", JSON.stringify(riwayatKuis));
        container.empty();
        container.append(`
            <h2>Hasil Kuis</h2>
            <p>Nilai Anda: <b>${nilai.toFixed(0)}</b></p>
            <p>Riwayat pengerjaan sudah disimpan.</p>
        `);
        const ulangiBtn = $('<button id="UlangiKuis" style="margin-top:15px; padding: 10px 20px;">Kerjakan Ulang</button>');
        container.append(ulangiBtn);
        ulangiBtn.on("click", function() {
            container.empty();
            tampilkanPertanyaan(container);
        });
        tampilkanRiwayatKuis();
    });
}

function tampilkanRiwayatKuis() {
    const $isiRiwayat = $("#RiwayatKuis");
    $isiRiwayat.empty();
    $isiRiwayat.append('<h2 class="section-title">Riwayat Kuis</h2>');
    let riwayatKuis = JSON.parse(localStorage.getItem("riwayatKuis")) || [];
    if (riwayatKuis.length === 0) {
        $isiRiwayat.append("<p style='text-align:center;'>Belum ada riwayat pengerjaan kuis.</p>");
        return;
    }
    riwayatKuis.forEach((r, index) => {
        $isiRiwayat.append(`
            <div class="riwayat-item" style="background-color: #333; padding: 10px; margin: 5px auto; border-radius: 5px; max-width: 300px; text-align: center;">
                <b>${index + 1}. Nilai: ${r.nilai}</b> <br>
                <span style="font-size: 0.9em; color: #ccc;">${r.tanggal}</span>
            </div>
        `);
    });
     $isiRiwayat.append(`<button id="HapusSemuaRiwayat" style="display: block; margin: 20px auto; padding: 8px 15px;">Hapus Semua Riwayat</button>`)
    $("#HapusSemuaRiwayat").on("click", function () {
        localStorage.removeItem("riwayatKuis");
        tampilkanRiwayatKuis();
    });
}