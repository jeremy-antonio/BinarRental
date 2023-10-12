function filterCarByAvailability(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  console.log(cars);

  // Tempat penampungan hasil
  const result = [];

  // Tulis code-mu disini
  for (const car of cars) {
    // Variabel boolean untuk menandai apakah mobil tersedia
    const isAvailable = car.available;

    // Cek ketersediaan mobil
    if (isAvailable) {
      // Jika tersedia, tambahkan ke hasil
      result.push(car);
    }
  }

  // Rubah code ini dengan array hasil filter berdasarkan availablity
  return result;
}

// for (const car of cars) {
//   if (car.available) {
//     result.push(car);
//     if (result.length >= 10) {
//       break;
//     }
//   }
// }
