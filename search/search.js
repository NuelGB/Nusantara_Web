function tampilkanrumah_adat(rumah_adat) {
  $('#hasil').empty();
$('#judul').append('<h1> Daftar Rumah Adat di Indonesia</h1> ')
  rumah_adat.forEach((r) => {
 const row = $('<div class="item"></div>');

 const gambar = $(`<img src="${r.gambar}" alt="${r.nama}">`);
 row.append(gambar);

 const nama = $(`<b class ="namarumahadat">${r.nama}</b><br>`);
 row.append(nama);

 const provinsi = $(`<p class="provinsi">${r.provinsi}</p>`);
 row.append(provinsi);

 const Detail = $(`<button>Lihat Detail</button>`);
 row.append(Detail);

 const Favorit = $(`<button>Tambah Favorit</button>`);
 row.append(Favorit);

    $('#hasil').append(row);
  });
}

$(function () {
  tampilkanrumah_adat(rumah_adat);
});


$('#Submit').click((e) => {
  e.preventDefault(); 

  $('#error').text(""); 

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
    $('#judul').append('<h1> Daftar Rumah Adat di Indonesia</h1> ')
  }
  else{
    $('#judul').append('<h1> Hasil Pencarian</h1> ')
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
    row.append(Detail);

    const Favorit = $(`<button>Tambah Favorit</button>`);
    row.append(Favorit);

    $('#hasil').append(row);
    });
  }

  $('#Submit')
    .empty()
    .removeAttr('disabled')
    .append('Cari');
});

