 const traditionalHouses = [
            {
                name: "Rumah Krong Bade",
                province: "Aceh",
                model3d: "https://sketchfab.com/3d-models/rumah-krong-bade-aceh-8d131cf689a64016aedf96875811c307",
                image: "https://th.bing.com/th/id/R.9f5e844400091a2c57777d0d36a4f712?rik=07g1LAFRXYfcxQ&riu=http%3a%2f%2fasset-a.grid.id%2fcrop%2f0x0%3a0x0%2f700x465%2fphoto%2fbobofoto%2foriginal%2f1535_rumah-adat-aceh-krong-bade-foto-klipingco.jpg&ehk=3W%2f3HlXRCxQ6DkNtTtQMJfYgEk%2b2zeX%2fIlbsEgL8xG8%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
            },
            {
                name: "Rumah Gadang",
                province: "Sumatera Barat",
                model3d: "https://sketchfab.com/3d-models/rumah-gadang-26f6966cbe2d494d9f72834d1ebb30dc",
                image: "https://indonesiaexpat.id/wp-content/uploads/2014/07/Nagari-1000-Rumah-Gadang.jpg"
            },
            {
                name: "Rumah Joglo",
                province: "Jawa Tengah",
                model3d: "https://sketchfab.com/3d-models/rumah-joglo-jawa-0714b6f2db464ed2ac1b1c844196352e",
                image: "https://ruangarsitek.com/wp-content/uploads/2020/10/Rumah-Adat-Joglo.jpg"
            },
            {
                name: "Rumah Limas",
                province: "Sumatera Selatan",
                model3d: "https://sketchfab.com/3d-models/malaysia-rumah-limas-potong-perak-6c6b3dff9c6145c6b0f67bd3e6d96095",
                image: "https://seringjalan.com/wp-content/uploads/2020/05/rumahlimaspesonatravel-1024x681.jpg"
            },
            {
                name: "Rumah Panggung Melayu",
                province: "Riau",
                model3d: "https://sketchfab.com/3d-models/rumah-adat-limas-potong-f94a8351b55b496f8e32e25d8f618e65",
                image: "https://tse1.mm.bing.net/th/id/OIP.3N5V7laLIzM-5B97qWaKLgHaFj?pid=Api&P=0&h=180"
            },
            {
                name: "Rumah Betang",
                province: "Kalimantan Tengah",
                model3d: "https://sketchfab.com/3d-models/betang-3961026e63a54053a343fde2a8c4f588",
                image: "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/07/11/Picsart_23-07-11_23-31-53-379-2853883078.jpg"
            },
            {
                name: "Rumah Tongkonan",
                province: "Sulawesi Selatan",
                model3d: "https://sketchfab.com/3d-models/tongkonan-toraja-house-d614270568e24b0284a98aa1998b122c",
                image: "https://i.pinimg.com/736x/80/9d/e8/809de85608fe6a132cda7f9c15c3fe5b.jpg"
            },
            {
                name: "Rumah Honai",
                province: "Papua",
                model3d: "https://sketchfab.com/3d-models/rumah-honai-papua-994c2ac920984f89b26ce1a4d766b5b9",
                image: "https://i.pinimg.com/736x/24/ce/f9/24cef917c641c06e61219d4278aab2ce.jpg"
            },
            {
                name: "Rumah Lamin",
                province: "Kalimantan Timur",
                model3d: "https://sketchfab.com/3d-models/rumah-adat-lamin-502d866136974a2286f91df8d6c89453",
                image: "https://asset.kompas.com/crops/49oDBs3LESEoVs8VaIEJtJQ3xtQ=/27x30:527x363/750x500/data/photo/2020/04/29/5ea8da52d1c7f.png"
            },
            {
                name: "Rumah Baileo",
                province: "Maluku",
                model3d: "https://sketchfab.com/3d-models/rumah-adat-baileo-maluku-indonesia-a8ff3e31964847b8abf1c2f11401e713",
                image: "https://www.garudacitizen.com/wp-content/uploads/2021/01/Rumah-Adat-Baileo-Nolloth-2.jpg"
            },
            {
                name: "Kajang Lako",
                province: "Jambi",
                model3d: "https://sketchfab.com/3d-models/rumah-adat-tradisional-jambi-kajang-lako-deb909440e9c4f1999a25d9e4434a424",
                image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Kajang_Leko_Rumah_adat_Jambi.jpg"
            },
            {
                name: "Rumah Dulohupa",
                province: "Gorontalo",
                model3d: "https://sketchfab.com/3d-models/rumah-adat-dulohupa-e350bcb9cbe24d7caa076994e98365a3",
                image: "https://www.selasar.com/wp-content/uploads/2020/08/rumah-adat-gorontalo.jpg"
            },
            {
                name: "Rumah Bola Soba",
                province: "Sulawesi Selatan",
                model3d: "https://sketchfab.com/3d-models/bugis-traditionals-house-d85593bc47784f899d461a92c33bfca4",
                image: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/249x140/photo/2024/11/09/3033392462.jpg"
            },
            {
                name: "Rumah Buton",
                province: "Sulawesi Tenggara",
                model3d: "https://sketchfab.com/3d-models/rumah-buton-indonesia-option-3-ca7e608b31fe44c8af22942f4f0b32b5",
                image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1557035955/seldra1dbyvao4vvoapt.jpg"
            },
            {
                name: "Rumah Osing",
                province: "Banyuwangi,Jawa Timur",
                model3d: "https://sketchfab.com/3d-models/rumah-adat-osing-5d19da76945f4447a747e315a5a6e66f",
                image: "https://beritajatim.com/wp-content/uploads/2024/06/Desa-Wisata-Osing-Kemiren.webp"
            },
            {
                name: "Rumah Sasadu",
                province: "Maluku Utara",
                model3d: "https://sketchfab.com/3d-models/rumah-adat-worat-worat-maluku-utara-indonesia-33f84af4d1f34de8844171653a7422cf",
                image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCiEgUfo0dIIBOZf51KWm5WyCLdHQR_x69_0PYuoeFiOsWus_bsbpQzFmvqvrBHFu5CQ51EDSRvgr2L_w_MpQ6DCPhzl1KizUcqVFDPrhgBTpgDhT_sONwfDVsseU-_fw5kOEi2ZoRPwU1/s1600/Rumah+Adat+Sasadu.jpg"
            },
            {
                name: "Rumah Bale Lumbung",
                province: "Nusa Tenggara Barat",
                model3d: "https://sketchfab.com/3d-models/rumah-adat-bale-lumbung-ntb-indonesia-a44942491a7c40aaba87abc775f96b5e",
                image: "https://image.idntimes.com/post/20190723/sade-00499abad3ffcce1a0ed53acd1e4269a.jpg"
            },
            {
                name: "Rumah Banjar",
                province: "Kalimantan Selatan",
                model3d: "https://sketchfab.com/3d-models/rumah-banjar-55f3578178354de999ff200eea3ad0e8",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Rumah_Bubungan_Tinggi_Anjungan_Kalsel_TMII_Jakarta.JPG/1200px-Rumah_Bubungan_Tinggi_Anjungan_Kalsel_TMII_Jakarta.JPG"
            },
            {
                name: "Rumah Kebaya",
                province: "Jakarta",
                model3d: "https://sketchfab.com/3d-models/rumah-kebaya-78aaf26028184721af0dc99b6cbb049e",
                image: "https://radarmukomuko.bacakoran.co/upload/81621e9d76fa6a9adb6d91d5444b8daa.jpg"
            },
            {
                name: "Rumah Bubungan Tinggi",
                province: "Kalimantan Selatan",
                model3d: "https://sketchfab.com/3d-models/bubungan-tinggi-rumah-adat-kalimantan-selatan-c9ede9be05f74d57b6170d212a5fada7",
                image: "https://1.bp.blogspot.com/-K8sOiiIqSHs/WAF_jfutqjI/AAAAAAAABvI/_uqDD3gIOFAzXClqsylXT2kKNrhx3HWnACLcB/s640/rumah%2Badat%2BKalimantan%2BSelatan%2B%2528Bubungan%2BTinggi%2529.JPG"
            }
];