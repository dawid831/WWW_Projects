document.addEventListener("DOMContentLoaded", () => {
    const images = [
      "img1.jpg",
      "img2.jpg",
      "img3.jpg"
    ];
  
    const galleryContainer = document.getElementById("gallery");
  
    // Tworzenie obietnicy dla kazdego obrazka z osobna
    function loadImage(image) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.alt = "Zdjęcie z galerii";
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Nie udało się załadować ${image}`);
      });
    }
  
    // Ladowanie wszystkich obrazow jednoczesnie przy pomocy obienic
    Promise.all(images.map(loadImage)).then(images => {
        images.forEach(img => {
            const wrapper = document.createElement("div");
            wrapper.className = "GridItem";
            wrapper.appendChild(img);
            galleryContainer.appendChild(wrapper);
        });
      })
      .catch(error => {
        console.error("Błąd ładowania galerii:", error);
        galleryContainer.innerHTML = "<p>Nie udało się załadować galerii.</p>";
      });
  });